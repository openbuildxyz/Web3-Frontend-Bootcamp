import { NextRequest, NextResponse } from 'next/server';

const cache: { [key: string]: any } = {};

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

  if (!searchParams.has('url')) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  const url = searchParams.get('url') as string;
  const cacheKey = encodeURIComponent(url);

  let data: any;

  if (cache[cacheKey]) {
    data = cache[cacheKey];
  } else {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      cache[cacheKey] = json;
      data = json;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return NextResponse.json({ error: 'Fetching data error' }, { status: 500 });
    }
  }

  return NextResponse.json(data);
}
