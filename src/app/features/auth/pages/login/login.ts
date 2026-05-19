import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Spinner } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Spinner],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);

  email = signal('');
  password = signal('');
  emailTouched = signal(false);
  passwordTouched = signal(false);
  errorMessage  = signal('');
  showPassword  = signal(false);
  isLoading = signal(false);

  emailError = computed(() => {
    const email = this.email();
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return null as string | null;
  });

  passwordError = computed(() => {
    const password = this.password();
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null as string | null;
  });

  isValid = computed(() => !this.emailError() && !this.passwordError());

  onSubmit() {
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    if (!this.isValid()) return;
    // call AuthService to login then navigate
  }
}
