import { Component, input, output } from '@angular/core';

@Component({
  selector: 'paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
  page = input<number>(1);
  isLastPage = input<boolean>(false);
  pageChange = output<number>();

  next() {
    if (!this.isLastPage()) this.pageChange.emit(this.page() + 1);
  }
  prev() {
    if (this.page() > 1) this.pageChange.emit(this.page() - 1);
  }
}
