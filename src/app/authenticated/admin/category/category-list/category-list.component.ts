import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from "../../../../services/categories.service";
import AppUtil from "../../../../utilities/app-util";
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categoryList: any[] = [];
  totalPage: number = 0;
  totalElement: number = 0;
  loading: boolean = true;
  first: number = 0;
  getParams = {
    pageNumber: 1,
    pageSize: 10
  }
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  loadCategories(event: any) {
    this.loading = true;
    if (event) {
      this.first = event.first / event.rows;
      this.getParams.pageSize = event.rows;
    }
    this.getParams.pageNumber = this.first + 1;
    this.categoryService
      .getCategories(AppUtil.toSnakeCaseKey(this.getParams))
      .subscribe((res) => {
        if (res.status === 200) {
          this.categoryList = res.data.content;
          this.totalElement = res.data.totalElements;
          this.totalPage = res.data.totalPages;
        } else {
          this.categoryList = [];
          this.totalElement = 0;
          this.totalPage = 0;
        }
        this.loading = false;
      });
  }

  getCategories(){
    this.categoryService.getCategories(AppUtil.toSnakeCaseKey(this.getParams)).subscribe(
      res => {
        if(res.status === 200){
          this.categoryList = res.data.content;
          this.totalPage = res.data.totalPage;
          this.totalElement = res.data.totalElement;
        }
      }
    )
  }

  parseStatus(status: string){
    return `STATUS.${status}`;
  }
}
