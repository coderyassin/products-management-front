import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly isLocalStorageAvailable: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isLocalStorageAvailable = isPlatformBrowser(platformId);
  }

  get(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error getting data from localStorage', error);
        return null;
      }
    }
    return null;
  }

  set(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    }
  }

  remove(key: string): void {
    if (this.isLocalStorageAvailable) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage', error);
      }
    }
  }

  clear(): void {
    if (this.isLocalStorageAvailable) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage', error);
      }
    }
  }
}

