import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../../services/products.service";
import {CategoriesService} from "../../../../services/categories.service";
import AppUtil from "../../../../utilities/app-util";
import AppConstant from "../../../../utilities/app-constant";
import {ConfirmationService, MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {ShowMessageService} from "../../../../services/show-message.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  id: any;
  categoryList: any[] = [];
  formProduct: FormGroup = new FormGroup({});

  productImage: any;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private showMessageService: ShowMessageService,
              private translateService: TranslateService,
              private productService: ProductsService,
              private categoryService: CategoriesService,
              private confirmService: ConfirmationService) {
    this.formProduct = this.fb.group({
      productName: ['', Validators.required],
      quantity: [0, Validators.required],
      manufacture: ['', Validators.required],
      author: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: [0, Validators.required],
      productImage: [''],
      status: [false],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategories({}).subscribe(
      res => {
        if (res.status === 200) {
          let temp = res.data.content;
          this.categoryList = temp.filter((i : any) => i.status === "ACTIVE");
        }
      }
    )

    if (this.id) {
      this.productService.getProduct(this.id).subscribe(
        res => {
          if (res.status === 200) {
            this.formProduct.setValue({
              productName: res.data.productName,
              quantity: res.data.quantity,
              manufacture: res.data.manufacture,
              author: res.data.author,
              categoryId: res.data.categoryId,
              price: res.data.price,
              status: !(res.data.status === 'IN_ACTIVE') ? true : false,
              productImage: res.data.productImage,
              description: res.data.description,
            })
          }
        }
      )
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.formProduct.setValue({
      productName: this.formProduct.value.productName,
      quantity: this.formProduct.value.quantity,
      manufacture: this.formProduct.value.manufacture,
      author: this.formProduct.value.author,
      categoryId: this.formProduct.value.categoryId,
      price: this.formProduct.value.price,
      status: this.formProduct.value.status ? 'ACTIVE' : 'IN_ACTIVE',
      productImage: this.formProduct.value.productImage,
      description: this.formProduct.value.description
    })
  }

  onSubmitFormProduct() {
    let fileName;
    let fullPath = this.formProduct.value.productImage;
    if (fullPath) {
      let start = (fullPath.indexOf("\\") >= 0 ? fullPath.lastIndexOf("\\") : fullPath.lastIndexOf("/"));
      fileName = fullPath.substring(start);
      if (fileName.indexOf('\\') === 0 || fileName.indexOf("/") === 0) {
        fileName = fileName.substring(1);
      }
    }

    let params = {
      authToken: localStorage.getItem(AppConstant.STORAGE_KEYS.SESSION),
      productName: this.formProduct.value.productName,
      quantity: this.formProduct.value.quantity,
      manufacture: this.formProduct.value.manufacture,
      author: this.formProduct.value.author,
      categoryId: this.formProduct.value.categoryId,
      status: this.formProduct.value.status ? 'ACTIVE' : 'IN_ACTIVE',
      description: this.formProduct.value.description,
      productImage: fileName,
      price: this.formProduct.value.price
    }

    if (!this.id) {
      this.productService.createProduct(AppUtil.toSnakeCaseKey(params)).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessageService.showMessage('success', 'message.add_product_success')
            this.router.navigate(['/admin/']).then(r => {})
          } else {
            this.showMessageService.showMessage('error', 'message.add_product_error')
            this.router.navigate(['/admin/']).then(r => {})
          }
        }
      )
      this.router.navigate(['/admin/']).then(r => {
      })
    } else {
      this.productService.updateProduct(this.id, AppUtil.toSnakeCaseKey(params)).subscribe(
        res => {
          if (res.status === 200) {
            this.showMessageService.showMessage('', 'message.update_product_success')
            this.router.navigate(["/admin/"]).then(r => {
            });
          } else {
            this.showMessageService.showMessage('', 'message.update_product_error')
            this.router.navigate(["/admin/"]).then(r => {
            });
          }
        }
      )
    }
  }

  onDelete() {
    if (this.id) {
      this.confirmService.confirm({
        message: AppUtil.translate(
          this.translateService,
          'message.delete'
        ),
        accept: () => {
          this.productService.deleteProduct(this.id).subscribe(
            res => {
              if (res.status === 200) {
                this.showMessageService.showMessage("success", "message.delete_product_success")
                this.router.navigate(['/admin/']).then(r => {
                });
              }else {
                this.showMessageService.showMessage("error", "message.update_product_error")
                this.router.navigate(['/admin/']).then(r => {
                });
              }
            }
          )
        }
      });
    } else {
      this.router.navigate(['/admin/']).then(r => {
      });
    }
  }

  onBack() {
    this.router.navigate(['/admin/']).then(r => {
    });
  }
}
