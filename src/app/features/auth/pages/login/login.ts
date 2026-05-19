import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { Spinner } from '../../../../shared/components/spinner/spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const LABELS: Record<string, string> = {
  email: 'Email',
  password: 'Password',
};

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, Spinner],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  loginForm!: FormGroup;
  isLoading = signal(false);
  apiError = signal('');
  showPassword = signal(false);

  ngOnInit(): void {
    this.loginFormInitialization();
  }

  // ── form initialization ───────────────────────────────────────────────
  loginFormInitialization() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ── error helpers ────────────────────────────────────────────────
  fieldError(field: string): string | null {
    const ctrl = this.loginForm.get(field);
    if (!ctrl?.touched || !ctrl.errors) return null;
    const e = ctrl.errors;
    if (e['required']) return `${LABELS[field]} is required`;
    if (e['email']) return 'Email is invalid';
    if (e['minlength']) return `${LABELS[field]} must be at least ${e['minlength'].requiredLength} characters`;
    return null;
  }

  get isValid(): boolean {
    return this.loginForm.valid;
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (!this.isValid) return;

    this.isLoading.set(true);
    this.authService.login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.apiError.set(err.error?.message || 'Login failed. Please check your credentials and try again.');
        }
      });
  }
}
