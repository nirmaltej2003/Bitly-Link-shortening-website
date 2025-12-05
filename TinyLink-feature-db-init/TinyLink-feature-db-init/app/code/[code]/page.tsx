import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import StatsPage from '@/components/StatsPage';

export default async function CodeStatsPage({ params }: { params: { code: string } }) {
  const result = await db.query('SELECT * FROM links WHERE code = $1', [params.code]);

  if (result.rows.length === 0) {
    notFound();
  }

  return <StatsPage link={result.rows[0]} />;
}