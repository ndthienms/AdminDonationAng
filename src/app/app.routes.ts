import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
];
