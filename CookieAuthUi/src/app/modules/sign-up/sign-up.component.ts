import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServerService } from '../../services/serverservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequestDto } from '../../models/auth.model';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent  {
  signupModel = new RegisterRequestDto();

  private readonly _serverService = inject(ServerService);
  private readonly _formBuilder = inject(FormBuilder);
  isSubmitting = false;
  signUpForm = this._formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

     
  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const payload: RegisterRequestDto = {
      Email: this.signUpForm.controls.email.value,
      Password: this.signUpForm.controls.password.value,
      FullName: this.signUpForm.controls.firstName.value + this.signUpForm.controls.lastName.value,
    };
    this.isSubmitting = true;
    this._serverService.post('api/Auth/register', payload).subscribe({
      next: (response) => {
        console.log(response);
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
