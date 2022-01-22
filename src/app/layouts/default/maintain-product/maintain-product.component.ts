import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../domain/product';
import {ProductService} from '../../../services/product.service';
import {FileService} from '../../../services/file.service';
import {Image} from '../../../domain/image';

@Component({
  selector: 'app-maintain-product',
  templateUrl: './maintain-product.component.html',
  styleUrls: ['./maintain-product.component.scss']
})
export class MaintainProductComponent implements OnInit {
  productForm: FormGroup;
  files: FormArray;
  images: Image[] = [];

  constructor(
    private productService: ProductService,
    private fileService: FileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      description: [null],
      stock: [null, Validators.required],
      price: [null, Validators.required],
      files: this.formBuilder.array([])
    });
  }

  activateFileInput(): void {
    document.getElementById('file-input').click();
  }

  uploadFile(event): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.images.push(new Image({
          fileName: file.name,
          url: reader.result as string
        }));

        this.files = this.productForm.get('files') as FormArray;
        this.files.push(new FormControl(file, []));
      };
    }
  }

  onSubmit(): void {
    const product: Product = new Product(this.productForm.value);
    const files = this.productForm.get('files').value;

    const formData = new FormData();

    for (const file of files) {
      formData.append('files', files[0]);
    }

    this.productService.addProduct(product).subscribe(result => {
      if (result !== null) {
        this.fileService.addFilesToProduct(result, formData).subscribe();
      }
    });
    console.log(product);
  }

  removeImage(index): void {
    this.images.splice(index, 1);
  }

  openDialog(index): void {
  }
}
