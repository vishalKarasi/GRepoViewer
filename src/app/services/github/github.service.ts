import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.service';
import { Observable, of, tap } from 'rxjs';
import { Pagination } from '../../components/pagination/pagination.types';
import { Profile } from '../../components/profile/profile.types';
import { Repo } from '../../components/repo/repo.types';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private apiService: ApiService, private cacheService: CacheService) {}

  getUserProfile(username: string): Observable<Profile> {
    const url = `${this.apiUrl}/users/${username}`;
    const cachedProfile = this.cacheService.get(url);

    if (cachedProfile) {
      return of(cachedProfile as Profile);
    }

    return this.apiService.get<Profile>(url, { responseType: 'json' }).pipe(
      tap((profile) => this.cacheService.set(url, profile))
    );
  }

  getUserRepos(username: string, params?: Pagination): Observable<Repo[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    const cacheKey = `${url}-${JSON.stringify(params)}`;
    const cachedRepos = this.cacheService.get(cacheKey);

    if (cachedRepos) {
      return of(cachedRepos as Repo[]);
    }

    return this.apiService.get<Repo[]>(url, { params, responseType: 'json' }).pipe(
      tap((repos) => this.cacheService.set(cacheKey, repos))
    );
  }
}
