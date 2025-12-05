// app/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    // Get link
    const result = await db.query(
      'SELECT target_url FROM links WHERE code = $1',
      [params.code]
    );
    
    if (result.rows.length === 0) {
      return new NextResponse('Link not found', { status: 404 });
    }
    
    const targetUrl = result.rows[0].target_url;
    
    // Increment clicks
    await db.query(
      'UPDATE links SET clicks = clicks + 1, last_clicked = CURRENT_TIMESTAMP WHERE code = $1',
      [params.code]
    );
    
    // Redirect
    return NextResponse.redirect(targetUrl, 302);
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}