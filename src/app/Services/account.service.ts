import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly baseUrl = 'http://localhost:5178/api/Account';

  constructor(private http: HttpClient) { }

  UpdateDisabledAccount(phoneNumber: any, disabled: any) {
    return this.http.put(this.baseUrl + '/UpdateDisabledAccount/' + phoneNumber, disabled,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json' 
      })
      },
    );
  }

  AddAdminAccount(addForm:any) {
    return this.http.post(this.baseUrl + '/AddAdminAccount', addForm,
      {
        reportProgress: true,
        observe: 'events',
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json' 
      })
      },
    );
  }

  AddOrganiserAccount(addFormData:any) {
    return this.http.post(this.baseUrl + '/AddOrganiserAccount', addFormData,
      {
        reportProgress: true,
        observe: 'events'
      },
    );
  }
}
