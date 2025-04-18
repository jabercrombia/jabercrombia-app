// app/api/search/route.ts
import { fetchContentful } from '@/lib/contentful';
import { SEARCH_CONTENT_QUERY } from '@/lib/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('q') || '';
  const data = await fetchContentful(SEARCH_CONTENT_QUERY, { keyword });


    type DataItem = {
        sys: { id: string };
        title: string;
        slug: string;
        description: string;
        images: {
            items: {
            url: string;
            }[];
        };
    };
    const designData = data.design.items.map((item: DataItem) => ({
        ...item,
        type: 'design',
        url: '/design/' + item.slug,
    }));

    type ProjectItem = {
        sys: { id: string };
        title: string;
        slug: string;
        description: string;
        images: {
            items: {
            url: string;
            }[];
        };
    };

  const projectData = data.projects.items.map((item: ProjectItem) => ({
    ...item,
    type: 'projects',
    url: '/projects?slug=' + item.slug,
  }));

  type WebItem = {
    sys: { id: string };
    title: string;
    slug: string;
    description: string;
    images: {
        items: {
        url: string;
        }[];
    };
};

  const webData = data.web.items.map((item: WebItem) => ({
    ...item,
    type: 'web',
    url: '/web/' + item.slug,
  }));

  const combinedResults = [
    ...webData,
    ...designData,
    ...projectData
  ]

  console.log(combinedResults)
  return NextResponse.json({ results: combinedResults });
}
