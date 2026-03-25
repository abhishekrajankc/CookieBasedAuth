import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ServerService } from '../../services/serverservice';
import { AuthStateService } from '../../services/auth-state.service';
import { filter } from 'rxjs/operators';

type SessionResponse = {
  success?: boolean;
  data?: {
    isAuthenticated?: boolean;
    email?: string;
    fullName?: string;
  };
};

@Component({
  selector: 'app-common-toolbar',
  imports: [MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './common-toolbar.component.html',
  styleUrl: './common-toolbar.component.scss'
})
export class CommonToolbarComponent implements OnInit {
  private readonly serverService = inject(ServerService);
  private readonly authStateService = inject(AuthStateService);
  private readonly router = inject(Router);

  email = '';
  fullName = '';
  isAuthenticated = false;
  isLoggingOut = false;

  ngOnInit(): void {
    this.loadSession();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.loadSession());
  }

  private loadSession(): void {
    this.serverService.get<SessionResponse>('api/Auth/getSession').subscribe({
      next: (response) => {
        this.isAuthenticated = !!response?.data?.isAuthenticated;
        this.email = response?.data?.email ?? '';
        this.fullName = response?.data?.fullName ?? '';
      },
      error: () => {
        this.isAuthenticated = false;
        this.email = '';
        this.fullName = '';
      }
    });
  }

  get displayName(): string {
    if (this.fullName?.trim()) return this.fullName.trim();
    if (this.email?.trim()) return this.email.split('@')[0];
    return 'Guest User';
  }

  get initials(): string {
    const parts = this.displayName.split(' ').filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return this.displayName.slice(0, 2).toUpperCase();
  }

  logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;
    this.serverService.post('api/Auth/logout', {}).subscribe({
      next: () => {
        this.authStateService.clear();
        this.isAuthenticated = false;
        this.fullName = '';
        this.email = '';
        this.router.navigateByUrl('/sign-in');
      },
      error: () => {
        this.isLoggingOut = false;
      },
      complete: () => {
        this.isLoggingOut = false;
      }
    });
  }
}
