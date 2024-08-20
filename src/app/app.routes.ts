import { Routes } from '@angular/router';
import { LoginComponent } from './Component/LoginComponent/login/login.component';
import { RegisterComponent } from './Component/RegisterComponent/register/register.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AuthguardService } from './Service/authguard.service';
import { AddNoteComponent } from './Component/dashboard/AddNote/add-note/add-note.component';

export const routes: Routes = [
    { path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent,pathMatch:'full',canActivate:[AuthguardService]},
    {path:'addnote',component:AddNoteComponent,pathMatch:'full',canActivate:[AuthguardService]}
];
