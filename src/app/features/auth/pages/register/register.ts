import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { RegisterPayload } from './../../../../core/models/register-payload';
import { Spinner } from '../../../../shared/components/spinner/spinner';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

const MIN_AGE = 5;
const MAX_AGE = 120;

// ── helpers ──────────────────────────────────────────────────────────
function calcAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const month = today.getMonth() - dateOfBirth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) age--;
  return age;
}

// ── custom validators ────────────────────────────────────────────────
function dateFormatValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = ctrl.value;
  if (!v) return null;
  return isNaN(new Date(v).getTime()) ? { invalidDate: true } : null;
}

function futureDateValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = ctrl.value;
  if (!v) return null;
  const d = new Date(v);
  if (isNaN(d.getTime())) return null;
  return d > new Date() ? { futureDate: true } : null;
}

function minAgeValidator(min: number) {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const v = ctrl.value;
    if (!v) return null;
    const dob = new Date(v);
    if (isNaN(dob.getTime())) return null;
    return calcAge(dob) < min ? { minAge: min } : null;
  };
}

function maxAgeValidator(max: number) {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const v = ctrl.value;
    if (!v) return null;
    const dob = new Date(v);
    if (isNaN(dob.getTime())) return null;
    return calcAge(dob) > max ? { maxAge: max } : null;
  };
}

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const pw = form.get('password')?.value;
  const rpw = form.get('rePassword')?.value;
  if (!rpw) return null;
  return pw !== rpw ? { passwordMismatch: true } : null;
}

// ── field labels for error messages ──────────────────────────────────
const LABELS: Record<string, string> = {
  name: 'Full name',
  username: 'Username',
  email: 'Email',
  gender: 'Gender',
  dateOfBirth: 'Birth date',
  password: 'Password',
  rePassword: 'Confirm password',
};

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, Spinner],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm!: FormGroup;
  isLoading = signal(false);
  apiError = signal('');
  showPassword = signal(false);
  showRePassword = signal(false);

  ngOnInit(): void {
    this.registerFormInitialization();
  }


  // ── form initialization ───────────────────────────────────────────────
  registerFormInitialization() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-z0-9_]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: [
          '',
          [
            Validators.required,
            dateFormatValidator,
            futureDateValidator,
            minAgeValidator(MIN_AGE),
            maxAgeValidator(MAX_AGE),
          ],
        ],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );
  }

  // ── error helpers ────────────────────────────────────────────────
  fieldError(field: string): string | null {
    const ctrl = this.registerForm.get(field);
    if (!ctrl?.touched || !ctrl.errors) return null;
    const e = ctrl.errors;
    if (e['required']) return `${LABELS[field]} is required`;
    if (e['minlength']) return `${LABELS[field]} must be at least ${e['minlength'].requiredLength} characters`;
    if (e['maxlength']) return `${LABELS[field]} must be at most ${e['maxlength'].requiredLength} characters`;
    if (e['pattern']) return 'Username may only contain lowercase letters, numbers, and underscores';
    if (e['email']) return 'Email is invalid';
    if (e['invalidDate']) return 'Invalid date format';
    if (e['futureDate']) return 'Birth date cannot be in the future';
    if (e['minAge']) return `You must be at least ${e['minAge']} years old`;
    if (e['maxAge']) return `Age cannot exceed ${e['maxAge']} years`;
    return null;
  }

  get rePasswordError(): string | null {
    const control = this.registerForm.get('rePassword');
    if (!control?.touched) return null;
    if (control.errors?.['required']) return 'Confirm password is required';
    if (this.registerForm.errors?.['passwordMismatch']) return 'Passwords do not match';
    return null;
  }

  get isValid(): boolean {
    return this.registerForm.valid;
  }


  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (!this.isValid) return;


    this.isLoading.set(true);
    this.authService.register(this.registerForm.value).subscribe({
      next: (_) => {
        this.isLoading.set(false);
        // this.router.navigate(['/login']);
        this.registerForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.apiError.set(err.error?.message || 'Registration failed. Please try again.');
      }
    })
  }


}
