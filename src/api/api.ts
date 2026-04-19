async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token: string | null = null,
): Promise<T | null> {
  const url = import.meta.env.VITE_API_BASE_URL + endpoint;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  headers["X-Noroff-API-Key"] = import.meta.env.VITE_API_KEY;

  const response = await fetch(url, { ...options, headers });

  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function get<T>(
  endpoint: string,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(endpoint, {}, token);
}

export async function post<T>(
  endpoint: string,
  body: object,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    token,
  );
}

export async function put<T>(
  endpoint: string,
  body?: object,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(
    endpoint,
    {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    },
    token,
  );
}

export async function del<T>(
  endpoint: string,
  token: string | null = null,
): Promise<T | null> {
  return apiFetch<T>(
    endpoint,
    {
      method: "DELETE",
    },
    token,
  );
}
