import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};