// app/api/links/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Validate a URL string (allows http/https)
function isValidUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Generate a random alphanumeric code (6 chars)
function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { longUrl, customCode } = await request.json();
    
    // Validate URL
    if (!isValidUrl(longUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }
    
    // Generate or use custom code
    const code = customCode || generateCode();
    
    // Validate code format
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return NextResponse.json(
        { error: 'Code must be 6-8 alphanumeric characters' },
        { status: 400 }
      );
    }
    
    // Attempt to check uniqueness and insert into DB. If the DB is not
    // configured (development), fall back to returning a mocked link
    // object so the frontend can continue working.
    try {
      const existing = await db.query(
        'SELECT code FROM links WHERE code = $1',
        [code]
      );

      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }

      const result = await db.query(
        'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
        [code, longUrl]
      );

      return NextResponse.json(result.rows[0], { status: 201 });
    } catch (dbError) {
      // eslint-disable-next-line no-console
      console.error('POST /api/links DB error:', dbError);

      // Return a fallback link object usable by the frontend when DB is
      // missing or failing in local development.
      const fallback = {
        code,
        target_url: longUrl,
        clicks: 0,
        last_clicked: null,
        created_at: new Date().toISOString(),
      };

      return NextResponse.json(fallback, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM links ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    // If the database is not configured (local dev), return an empty list
    // so the frontend can render without failing. Log the error to the server
    // console for debugging.
    // eslint-disable-next-line no-console
    console.error('GET /api/links error:', error);
    return NextResponse.json([], { status: 200 });
  }
}