// app/api/search/route.ts
import { fetchContentful } from '@/lib/contentful';
import { SEARCH_CONTENT_QUERY } from '@/lib/queries';
import { NextRequest, NextResponse } from 'next/server';
import { apiRequestDuration } from '@/lib/metrics';

export async function GET(req: NextRequest) {
  const endTimer = apiRequestDuration.startTimer({
    route: '/api/search',
    method: 'GET'
  });

  try {
    const keyword = req.nextUrl.searchParams.get('q') || '';
    const data = await fetchContentful(SEARCH_CONTENT_QUERY, { keyword });

    const designData = data.design.items.map((item: any) => ({
      ...item,
      type: 'design',
      url: '/design/' + item.slug,
    }));

    const projectData = data.projects.items.map((item: any) => ({
      ...item,
      type: 'projects',
      url: '/projects?slug=' + item.slug,
    }));

    const webData = data.web.items.map((item: any) => ({
      ...item,
      type: 'web',
      url: '/web/' + item.slug,
    }));

    const combinedResults = [...webData, ...designData, ...projectData];

    endTimer({ status_code: 200 });

    return NextResponse.json({ results: combinedResults });
  } catch (error) {
    endTimer({ status_code: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
