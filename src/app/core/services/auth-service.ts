import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import { Router } from '@angular/router';
import { AuthResponse, User } from '../models/auth-response';
import { Observable, tap } from 'rxjs';
import { LoginPayload } from '../models/login-payload';
import { RegisterPayload } from '../models/register-payload';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // DI -----------------------------------

  private readonly api = inject(ApiService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  private readonly currentUser = signal<User | null>(null);

  // ── public methods ───────────────────────────────────────────────────

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/users/signup', payload).pipe(
      tap(res => {
        if (res.success === true) {
          // store token and user info if needed (e.g., in TokenService or a state management store)
          this.tokenService.set(res.data.token);
          // update current user signal
          this.currentUser.set(res.data.user);
          // navigate to login Form
          this.router.navigate(['/feed']); // main page after registration
        } else {
          // handle registration error (e.g., show message)

        }
      })
    )
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/users/signin', payload).pipe(
      tap(res => {
        if (res.success === true) {
          // navigate to login Form
          this.router.navigate(['/login']);
        }
        else {
          // handle login error (e.g., show message)

        }
      })
    );
  }

  logout(): void {
    this.tokenService.remove();
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }




}
