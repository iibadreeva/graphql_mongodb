import {
  // useState,
  useEffect,
  useReducer,
  useCallback
} from 'react';

import { server } from '@/lib/api';

type State<TData> = {
  data: TData | null;
  loading: boolean;
  error: boolean;
};

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };

const reducer =
  <TData>() =>
  (stata: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case 'FETCH':
        return { ...stata, loading: true };
      case 'FETCH_SUCCESS':
        return { data: action.payload, loading: false, error: false };
      case 'FETCH_ERROR':
        return { ...stata, loading: false, error: true };
      default:
        throw new Error();
    }
  };

export const useQuery = <TData = unknown>(
  query: string
): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  // const [state, setState] = useState<State<TData>>({
  //   data: null,
  //   loading: false,
  //   error: false
  // });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        // setState({ data: null, loading: true, error: false });
        dispatch({ type: 'FETCH' });

        const { data, errors } = await server.fetch<TData>({ query });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        // setState({ data, loading: false, error: false });
      } catch (err) {
        // setState({ data: null, loading: false, error: true });
        dispatch({ type: 'FETCH_ERROR' });
        throw console.error(err);
      }
    };

    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...state,
    refetch: fetch
  };
};
