type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

interface RequestConfig extends RequestInit {
  form?: boolean;
  token?: string;
}

interface IApiError<T = unknown> {
  message: string;
  status: number;
  data?: T;
}

import { notFound } from 'next/navigation';
import { getCookie } from './cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError<T = unknown> extends Error implements IApiError<T> {
  constructor(
    public message: string,
    public status: number,
    public data?: T,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ExtendedResponse<T = unknown> {
  readonly status: number;
  readonly ok: boolean;
  readonly headers: Headers;
  readonly data: T;

  constructor(response: Response, data: T) {
    this.status = response.status;
    this.ok = response.ok;
    this.headers = response.headers;
    this.data = data;
  }
}

async function handleResponse<T, E = unknown>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');

  let data;
  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else if (contentType?.includes('text/plain')) {
    data = await response.text();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new ApiError<E>(
      `API request failed: ${response.url} ${response.statusText}`,
      response.status,
      data,
    );
  }

  return data;
}

async function request<T, E = unknown>({
  method,
  url,
  config = {},
  form = false,
}: {
  method: RequestMethod;
  url: string;
  config?: RequestConfig;
  form?: boolean;
}): Promise<ExtendedResponse<T>> {
  try {
    const cookie = await getCookie('accessToken');
    const accessToken = config.token || cookie?.value;
    const bearerToken = accessToken ? `Bearer ${accessToken}` : undefined;

    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    const headers = new Headers(config.headers);
    if (!form) {
      headers.set('Content-Type', 'application/json');
    }
    if (bearerToken) {
      headers.set('Authorization', bearerToken);
    }

    const response = await fetch(fullUrl, {
      method,
      ...config,
      headers,
      credentials: 'include',
    });

    if (typeof window === 'undefined') {
      if (response.status === 404 || response.status === 403) {
        notFound();
      }
    }

    const data = await handleResponse<T, E>(response);
    return new ExtendedResponse<T>(response, data);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError<E>(`Request failed: ${(error as Error).message}`, 500);
  }
}

const api = {
  async get<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'GET', url, config });
  },

  async post<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'POST', url, config });
  },

  async put<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'PUT', url, config });
  },

  async patch<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'PATCH', url, config });
  },

  async delete<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'DELETE', url, config });
  },

  async postForm<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'POST', url, config, form: true });
  },

  async putForm<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'PUT', url, config, form: true });
  },

  async patchForm<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'PATCH', url, config, form: true });
  },

  async deleteForm<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'DELETE', url, config, form: true });
  },

  async head<T, E = unknown>(url: string, config?: RequestConfig) {
    return request<T, E>({ method: 'HEAD', url, config });
  },
};

export default api;
