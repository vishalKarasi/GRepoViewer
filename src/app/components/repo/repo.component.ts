import { Component, Input, SimpleChanges } from '@angular/core';
import { Repo } from './repo.types';
import { GithubService } from '../../services/github/github.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Pagination } from '../pagination/pagination.types';

@Component({
  selector: 'app-repo',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './repo.component.html',
})
export class RepoComponent {
  @Input() username: string = '';
  repos: Repo[] = [];
  @Input() pagination: Pagination = { page: 1, per_page: 10 };
  loading: boolean = false;
  error: string = '';

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.fetchUserRepos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['username'] && changes['username'].currentValue) ||
      (changes['pagination'] && changes['pagination'].currentValue)
    ) {
      this.error = "";
      this.fetchUserRepos();
    }
  }

  fetchUserRepos() {
    this.loading = true;
    this.githubService.getUserRepos(this.username, this.pagination).subscribe({
      next: (repos) => {
        this.repos = repos.map(
          ({
            id,
            name,
            description,
            created_at,
            watchers_count,
            forks_count,
            language,
            html_url
          }) => ({
            id,
            name,
            description,
            created_at,
            watchers_count,
            forks_count,
            language,
            html_url
          })
        );
      },
      error: (error) => (this.error = error.message),
      complete: () => (this.loading = false),
    });
  }
}
