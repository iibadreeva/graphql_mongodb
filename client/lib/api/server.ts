type Props<TVariables> = {
  query: string;
  variables?: TVariables;
};

type Error = {
  message: string;
};

const apiUrl = 'http://localhost:9000';

export const server = {
  fetch: async <TData, TVariables = unknown>(
    body: Props<TVariables>
  ): Promise<{ data: TData; errors: Error[] }> => {
    const res = await fetch(`${apiUrl}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error('failed to fetch from server');
    }

    return res.json();
  }
};
