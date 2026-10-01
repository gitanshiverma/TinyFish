import { NextRequest, NextResponse } from 'next/server';
import { TinyFishClient } from '@/lib/tinyfish';

export async function POST(req: NextRequest) {
  try {
    const { url, apiKey } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const client = new TinyFishClient(apiKey);
    const result = await client.fetchPageContent(url);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
