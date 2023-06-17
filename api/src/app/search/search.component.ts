import { Component } from '@angular/core';
import { SearchService } from "../search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult: any[] = [];
  paginatedResult: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private service: SearchService) {}

  getResult(searchInput: string) {
    this.service.getResult(searchInput).subscribe(
      data => {
        this.searchResult = data.entries;
        this.totalPages = Math.ceil(this.searchResult.length / this.pageSize);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.changePage(1); // Display first page by default
        if(this.searchResult.length === 0){
          alert('Search not found');
        }
        console.log(data);
        
      },
      
      error => {
        console.log(error);
      }
      
    );
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
      
    }

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedResult = this.searchResult.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  previousPage() {
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }
}
