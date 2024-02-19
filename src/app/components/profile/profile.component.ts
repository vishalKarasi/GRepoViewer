import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { Error, Profile } from './profile.types';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  @Input() username: string = '';
  profile: Profile = {
    name: '',
    avatar_url: '',
    email: '',
    bio: '',
    html_url: '',
    public_repos: 0,
    location: '',
    followers: 0,
    following: 0,
    created_at: new Date(),
  };

  loading: boolean = false;

  error: Error = null;

  totalRecords: number = 0;
  @Output() totalRecordsChange = new EventEmitter<number>();

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  ngOnChanges(changes: any) {
    if (changes['username'] && changes['username'].currentValue) {
      this.error = null;
      this.fetchUserProfile();
    }
  }

  fetchUserProfile() {
    this.loading = true;
    this.githubService.getUserProfile(this.username).subscribe({
      next: ({
        name,
        avatar_url,
        email,
        bio,
        html_url,
        public_repos,
        location,
        followers,
        following,
        created_at,
      }) => {
        this.profile = {
          name,
          avatar_url,
          email,
          bio,
          html_url,
          public_repos,
          location,
          followers,
          following,
          created_at,
        };
        this.totalRecords = public_repos;
        this.totalRecordsChange.emit(this.totalRecords);
      },
      error: ({name, status, message}) => this.error = {
        name,
        status,
        message
      },
      complete: () => this.loading = false,
    });
  }
}
