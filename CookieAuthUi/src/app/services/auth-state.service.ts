import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerService } from './serverservice';
import { shareReplay, tap } from 'rxjs/operators';

type SessionResponse = {
  success?: boolean;
  data?: {
    isAuthenticated?: boolean;
  };
};

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private authState$?: Observable<boolean>;

  constructor(private readonly serverService: ServerService) {}

  isAuthenticated(forceRefresh = false): Observable<boolean> {
    if (!forceRefresh && this.authState$) return this.authState$;

    this.authState$ = this.serverService.get<SessionResponse>('api/Auth/getSession').pipe(
      map((response) => !!response?.data?.isAuthenticated),
      catchError(() => of(false)),
      tap((isAuthenticated) => {
        this.authState$ = of(isAuthenticated);
      }),
      shareReplay(1)
    );

    return this.authState$;
  }

  setAuthenticated(value = true): void {
    this.authState$ = of(value);
  }

  clear(): void {
    this.authState$ = of(false);
  }
}
