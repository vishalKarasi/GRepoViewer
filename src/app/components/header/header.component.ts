import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();
  username: string = '';

  searchUser() {
    this.search.emit(this.username);
  }
}
