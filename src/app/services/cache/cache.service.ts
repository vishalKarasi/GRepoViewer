import { Injectable } from '@angular/core';
import { Profile } from '../../components/profile/profile.types';
import { Repo } from '../../components/repo/repo.types';

// In-memory storage

// @Injectable({
//   providedIn: 'root',
// })
// export class CacheService {
//   private cache: { [key: string]: any } = {};

//   set(key: string, data: Profile | Repo[]): void {
//     this.cache[key] = data;
//   }

//   get(key: string): any {
//     return this.cache[key];
//   }

//   clear(): void {
//     this.cache = {};
//   }
// }

// Localstorage caching

// @Injectable({
//   providedIn: 'root',
// })
// export class CacheService {
//   set(key: string, data: Profile | Repo[]): void {
//     const serializedData = JSON.stringify(data);
//     localStorage.setItem(key, serializedData);
//   }

//   get(key: string): any {
//     const serializedData = localStorage.getItem(key);
//     return serializedData ? JSON.parse(serializedData) : null;
//   }

//   clear(): void {
//     localStorage.clear();
//   }
// }


// Session storage caching
@Injectable({
  providedIn: 'root',
})

export class CacheService {
  set(key: string, data: Profile | Repo[]): void {
    const serializedData = JSON.stringify(data);
    sessionStorage.setItem(key, serializedData);
  }

  get(key: string): Profile | Repo[] {
    const serializedData = sessionStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  }

  clear(): void {
    sessionStorage.clear();
  }
}
