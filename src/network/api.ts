

import axios, { AxiosInstance } from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export class BaseApiService<Query, Response> {
  private api: AxiosInstance;
  private endpoint: string;

  constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    });
    this.endpoint = endpoint;
  }

  getFullUrl(query?: Query): string {
    let url = this.endpoint;
    if (query) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
      });
      url += `?${params.toString()}`;
    }
    return url;
  }

  async get(query?: Query): Promise<Response> {
    const url = this.getFullUrl(query);
    const response = await this.api.get<Response>(url);
    return response.data;
  }
}