import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { swalInfo, swalSuccess } from 'src/app/utils/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  displayedColumns: string[] = ['category', 'status'];
  // displayedColumnsVideo: string[] = ['category', 'status'];
  dataSource = new MatTableDataSource<any>();
  name = '';
  formGroup!: FormGroup;
  isFormValid = true;
  categories: any[] = [];
  file?: File | null = null;
  fileResult: string | ArrayBuffer | null = null;

  generateForm() {
    this.formGroup = this.fb.group({
      id: this.UpdateData?.id ? this.UpdateData.id : 0,
      title: [this.UpdateData?.title ? this.UpdateData?.title : '', [Validators.required]],
      description: [this.UpdateData?.description ? this.UpdateData?.description : '', [Validators.required]],
      categoryId: [this.UpdateData?.categoryId ? this.UpdateData?.categoryId : 0, [Validators.required]],
      country: this.UpdateData?.country ? this.UpdateData?.country : '',
      projectFileName: [this.UpdateData?.projectFileName ? this.UpdateData?.projectFileName : '', [Validators.required]],
    })
  }

  UpdateData: any;

  get FF(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.adminService.getAllCategories().subscribe({
      next: res => {
        this.categories = res
      },
      error: err => console.log(err)
    })
    this.generateForm();
    this.getTableData();
  }

  getTableData() {
    this.adminService.getAllCategories().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res)
      },
      error: err => console.log(err)
    })
  }

  fileLocalUrl = '';
  uploadFile(event: any) {
    this.fileLocalUrl = URL.createObjectURL(event.target.files[0])
    this.file = event.target.files[0];
    this.fileResult = event.target.result;
    this.FF['projectFileName'].setValue(event.target.files[0].name);
  }

  deleteLine(index: number) {
    Swal.fire({
      text: 'Silmək istədiyinizdən əminsiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#266AB8',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sil',
      cancelButtonText: 'Geri'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteCategories(index).subscribe({
          next: (res: any) => {
            swalSuccess(res.message);
            this.getTableData();
          },
          error: err => console.log(err)
        })
        // this.dataSource = new MatTableDataSource<any>(this.dataSource.data.filter((dt: any, key: number) => key != index))
      }
    })
  }

  handleSaveCategory() {
    this.name ? this.adminService.saveCategory({ name: this.name }).subscribe({
      next: res => {
        this.name = '';
        swalSuccess("Succesfully saved!"),
          this.getTableData();
      },
      error: err => console.log(err)
    }) : swalInfo('Please, enter category name!')
  }

  handleSaveVideo() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.isFormValid = true;
      // this.complexService.addOrUpdateComplex(this.formGroup.value, this.file).subscribe({
      //   next: res => {
      //     res.status ? (swalSuccess(res.message), this.onCloseDialog()) : swalError(res.message);
      //   },
      //   error: err => console.log(err)
      // })

      this.adminService.saveVideo(this.formGroup.value, this.file).subscribe({
        next: res => {
          swalSuccess("Succesfully saved!"),
          this.UpdateData = '';
          this.generateForm();
        },
        error: err => console.log(err)
      })
    }

    else {
      this.isFormValid = false;
    }
  }
}
