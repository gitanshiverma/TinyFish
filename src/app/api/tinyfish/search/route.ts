import { NextRequest, NextResponse } from 'next/server';
import { TinyFishClient } from '@/lib/tinyfish';

export async function POST(req: NextRequest) {
  try {
    const { query, apiKey } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const client = new TinyFishClient(apiKey);
    const result = await client.search(query);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
