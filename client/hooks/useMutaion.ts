import {
  // useState,
  useReducer
} from 'react';
import { server } from '@/lib/api';

type State<TData> = {
  data: TData | null;
  loading: boolean;
  error: boolean;
};

type MutaionTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

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

export const useMutation = <TData, TVariables = unknown>(
  query: string
): MutaionTuple<TData, TVariables> => {
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

  const fetch = async (variables?: TVariables) => {
    try {
      // setState({ data: null, loading: true, error: false });
      dispatch({ type: 'FETCH' });

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      // setState({ data, loading: false, error: false });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR' });
      // setState({ data: null, loading: false, error: true });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
