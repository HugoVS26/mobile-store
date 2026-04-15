import { http, HttpResponse } from 'msw';
import { mockedMobiles, mockedMobileDetail } from './mobiles';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL as string}/mobiles`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';

    const results = search
      ? mockedMobiles.filter(
          (p) => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search),
        )
      : mockedMobiles;

    return HttpResponse.json(results);
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL as string}/mobiles/:id`, ({ params }) => {
    if (params.id === mockedMobileDetail.id) {
      return HttpResponse.json(mockedMobileDetail);
    }
    return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
  }),
];
