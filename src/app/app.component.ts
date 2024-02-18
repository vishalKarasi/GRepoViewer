import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepoComponent } from './components/repo/repo.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Pagination } from './components/pagination/pagination.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, ProfileComponent, RepoComponent, PaginationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'GRepoViewer';
  username: string = '';
  totalRecords: number = 0;
  pagination: Pagination = {
    page: 1,
    per_page: 10,
  }

  setUsername(username: string) {
    this.username = username;
  }

  setPagination(pagination: Pagination) {
  this.pagination = { ...pagination };
}


  updateTotalRecords(totalRecords: number) {
    this.totalRecords = totalRecords;
  }
}
