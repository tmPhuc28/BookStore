import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from "../../../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AppUtil from "../../../../utilities/app-util";
import AppConstant from "../../../../utilities/app-constant";
import {ShowMessageService} from "../../../../services/show-message.service";
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  id: any;
  formCategory: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private categoryService: CategoriesService,
              private showMessageService: ShowMessageService,
              private confirmationService: ConfirmationService
  ) {
    this
      .formCategory = this.fb.group({
      categoryName: ['', Validators.required],
      status: [false]
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    if (this.id
    ) {
      this.categoryService.getCategory(this.id).subscribe(
        res => {
          if (res.status === 200) {
            this.formCategory.setValue({
              categoryName: res.data.categoryName,
              status: (res.data.status === "ACTIVE") ? true : false
            })
          }
        }
      )
    }
  }

  initForm() {
    this.formCategory.setValue({
      categoryName: this.formCategory.value.categoryName,
      status: this.formCategory.value.status
    })
  }

  onSubmitCategoryForm() {
    const params = {
      authToken: localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION),
      categoryName: this.formCategory.value.categoryName,
      status: this.formCategory.value.status ? 'ACTIVE' : 'IN_ACTIVE',
    }

    if (this.id) {
      this.categoryService.updateCategory(this.id, AppUtil.toSnakeCaseKey(params)).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessageService.showMessage('success', "message.update_category_success")
            this.router.navigate(['/admin/category/']).then(r => {
            });
          } else {
            this.showMessageService.showMessage('error', "message.update_category_error")
            this.router.navigate(['/admin/category/']).then(r => {
            });
          }
        }
      )
    } else {
      this.categoryService.createCategory(AppUtil.toSnakeCaseKey(params)).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessageService.showMessage("success", "message.add_category_success")
            this.router.navigate(["/admin/category/"]).then(r => {
            });
          } else {
            this.showMessageService.showMessage('error', "message.add_category_error")
            this.router.navigate(['/admin/category/']).then(r => {
            });
          }
        }
      )
    }
  }

  onDelete() {
    if (this.id) {
      this.confirmationService.confirm({
        message: AppUtil.translate(
          this.translate,
          'message.delete_category'
        )
      })
      this.categoryService.deleteCategory(this.id).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessageService.showMessage('success', "message.delete_category_success")
            this.router.navigate(['/admin/category/']).then(r => {
            });
          }
        }
      )
    } else {
      this.showMessageService.showMessage('error', "message.delete_category_error")
      this.router.navigate(['/admin/category/']).then(r => {
      });
    }
  }
}
