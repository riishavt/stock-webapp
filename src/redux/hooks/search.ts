
import { useQuery, UseQueryResult } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { apiClientStock } from '../services/searchApi';


export type Stock = {
    StockName: string;
    LastPrice: number;
    TurnOver: number;
    Change: number;
    High: number;
    Low: number;
    Open: number;
    ShareTraded: number;
};

export type ProductRespone = {
  stock: Stock[];
};

// export type ProductSort = 'name' | 'priceAsc' | 'priceDesc';

export function useItems(): UseQueryResult<ProductRespone> {
  const [search] = useSearchParams({
    sort: 'StockName',
  });

  return useQuery(
    ['items', search.toString()],
    () =>
      apiClientStock
        .get('items', {
          params: search,
        })
        .then((res) => res.data),
    {
      staleTime: 3000,
    },
  );
}