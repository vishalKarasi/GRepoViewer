import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from './pagination.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule, CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() totalRecords: number = 0;
  @Output() pageChange = new EventEmitter<Pagination>();
  pagination: Pagination = {
    page: 1,
    per_page: 10,
  }

  constructor() { }

  onPageChange(event: any) {
    this.pagination.page = event.page + 1;
    this.pagination.per_page = event.rows;
    this.pageChange.emit(this.pagination);
  }
}
