import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage-service';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly storage = inject(StorageService);

  get(): string | null {
    // return localStorage.getItem(TOKEN_KEY);
    return this.storage.get<string>(TOKEN_KEY);
  }

  set(token: string): void {
    this.storage.set(TOKEN_KEY, token);
  }

  remove(): void {
    this.storage.remove(TOKEN_KEY);
  }

  isValid(): boolean {
    const token = this.get();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
