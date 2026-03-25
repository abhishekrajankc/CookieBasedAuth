import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServerService { 
  apiBaseUrl = "";
  constructor(
    private readonly http: HttpClient
  ) {}

  setApiBaseUrl(value: string | null | undefined) {
    const trimmed = (value ?? '').trim();
    if (trimmed) this.apiBaseUrl = trimmed;
  }

  get<T>(
    path: string,
    options?: {
      params?: Record<string, string | number | boolean | null | undefined>;
    }
  ) {
    return this.http.get<T>(this.url(path), {
      withCredentials: true,
      params: options?.params ? this.toHttpParams(options.params) : undefined,
    });
  }

  post<T>(
    path: string,
    body: unknown,
    options?: {
      params?: Record<string, string | number | boolean | null | undefined>;
    }
  ) {
    return this.http.post<T>(this.url(path), body, {
      withCredentials: true,
      params: options?.params ? this.toHttpParams(options.params) : undefined,
    });
  }

  // Keep FormData separate so we never accidentally set a JSON content-type.
  postForm<T>(
    path: string,
    formData: FormData,
    options?: {
      params?: Record<string, string | number | boolean | null | undefined>;
    }
  ) {
    return this.http.post<T>(this.url(path), formData, {
      withCredentials: true,
      params: options?.params ? this.toHttpParams(options.params) : undefined,
    });
  }

  private url(path: string): string {
    const base = this.apiBaseUrl.replace(/\/+$/, '');
    const suffix = path.startsWith('/') ? path : `/${path}`;
    return `${base}${suffix}`;
  }

  private toHttpParams(params: Record<string, string | number | boolean | null | undefined>) {
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) continue;
      httpParams = httpParams.set(key, String(value));
    }
    return httpParams;
  }
}
