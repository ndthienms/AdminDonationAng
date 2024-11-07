import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AccountService } from '../../../Services/account.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [NgFor]
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService,
    private accountService: AccountService,
    private router: Router
  ) { }

  pageIndex: number = 0;
  response: any;
  request: boolean = true;
  adminList: Array<any> = [];
  text: string = "";

  ngOnInit(): void {

    this.GetAdminList();
  }

  SearchSubmit(event: any) {
    this.request = true;
    this.pageIndex = 0;
    this.text = event.target.value;
    this.adminList = [];
    this.GetAdminList();
  }

  GetAdminList() {
    if (this.request) {
      this.pageIndex += 1;
      if (this.text != "" && this.text != null) {
        this.adminService.GetSearchedList(this.pageIndex, JSON.stringify(this.text)).subscribe(
          (res: any) => {
            if (res.type === HttpEventType.UploadProgress) {
              console.log('Upload Progress: ' + (res.loaded / res.total * 100) + '%');
              // ===== Loader =====
              var loader = document.getElementById("loader");
              loader!.style.display = "block";
            }
            if (res.type === HttpEventType.Response) {
              this.response = res.body.$values;
              if (this.response.length < 20) {
                this.request = false;
              }
              this.adminList = this.adminList.concat(this.response);
              // ===== Loader =====
              var loader = document.getElementById("loader");
              loader!.style.display = "none";
            }
          },
          err => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
            console.log(err);
          }
        )
      }
      else {
        this.adminService.GetAll(this.pageIndex).subscribe(
          (res: any) => {
            if (res.type == HttpEventType.UploadProgress) {
              console.log('Upload Progress: ' + (res.loaded / res.total * 100) + '%');
              // ===== Loader =====
              var loader = document.getElementById("loader");
              loader!.style.display = "block";
            }
            if (res.type === HttpEventType.Response) {
              this.response = res.body.$values;
              if (this.response.length < 20) {
                this.request = false;
              }
              this.adminList = this.adminList.concat(this.response);
              console.log(this.adminList);
              // ===== Loader =====
              var loader = document.getElementById("loader");
              loader!.style.display = "none";
            }
          },
          err => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
          }
        )
      }
    }
  }

  DisabledAccount(admin: any) {
    let disabled = false;
    if (admin.disabled == "Active") {
      disabled = true;
    }
    this.accountService.UpdateDisabledAccount(admin.phoneNum, JSON.stringify(disabled)).subscribe(
      (res: any) => {
        if (res.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + (res.loaded / res.total * 100) + '%');
        }
        if (res.type === HttpEventType.Response) {
          if (disabled) {
            admin.disabled = 'Disabled';
          }
          else {
            admin.disabled = 'Active';
          }
          this.ActiveToast(true, "Your changes have been saved");
        }
      },
      err => {
        this.ActiveToast(true, disabled ? "Disabled account failed" : "Active account failed");
        console.log(err);
      }
    )
  }

  ActiveToast(isSuccess: boolean, response: string) {
    var toastContainer = document.getElementById("toast-container");
    var progress = document.getElementById("progress");
    var toastTitle = document.getElementById("toast-title");
    var toastBody = document.getElementById("toast-body");
    var toastSuccessIcon = document.getElementById("toast-success");
    var toastErrorIcon = document.getElementById("toast-error");

    if (!isSuccess) {
      progress?.classList.add("error")
      toastContainer?.classList.add("error")
      toastTitle!.innerHTML = "Error";
      toastBody!.innerHTML = response;
      toastErrorIcon!.style.display = "flex";
      toastSuccessIcon!.style.display = "none";
    }
    else {
      progress?.classList.remove("error")
      toastContainer?.classList.remove("error")
      toastTitle!.innerHTML = "Success";
      toastBody!.innerHTML = response;
      toastErrorIcon!.style.display = "none";
      toastSuccessIcon!.style.display = "flex";
    }

    toastContainer?.classList.add("active")
    progress?.classList.add("active")

    setTimeout(() => {
      toastContainer?.classList.remove("active")
      progress?.classList.remove("active")
    }, 5000)
  }
}
