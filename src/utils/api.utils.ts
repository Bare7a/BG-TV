export const fetchJson = async <T extends object>(url: string, token?: string): Promise<T> => {
  const headers = new Headers({
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "X-Flipps-Version": "2023-02-03",
    "X-Flipps-User-Agent": "Flipps/75/10.7",
  });

  const res = await fetch(url, { headers });
  const data: T = await res.json();

  return data;
};

export const fetchHtml = async (url: string, token?: string): Promise<string> => {
  const headers = new Headers({
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "X-Flipps-Version": "2023-02-03",
    "X-Flipps-User-Agent": "Flipps/75/10.7",
  });

  const res = await fetch(url, { headers });
  const data = await res.text();

  return data;
};
