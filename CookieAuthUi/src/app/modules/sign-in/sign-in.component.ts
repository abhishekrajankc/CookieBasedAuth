import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { ServerService } from '../../services/serverservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDto } from '../../models/auth.model';
import { AuthStateService } from '../../services/auth-state.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly serverService = inject(ServerService);
  private readonly router = inject(Router);
  private readonly authStateService = inject(AuthStateService);
  isSubmitting = false;

  signInForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequestDto = {
      Email: this.signInForm.controls.email.value,
      Password: this.signInForm.controls.password.value,
    };

    this.isSubmitting = true;
    this.serverService.post('api/Auth/login', payload).subscribe({
      next: (response) => {
        console.log(response);
        this.authStateService.isAuthenticated(true).pipe(take(1)).subscribe({
          next: () => {
            this.router.navigateByUrl('/dashboard');
          },
          error: () => {
            this.router.navigateByUrl('/dashboard');
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
