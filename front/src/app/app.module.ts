import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './modules/dashboard-admin/dashboard-admin.component';
import { HeaderDashboardComponent } from './modules/header-dashboard/header-dashboard.component';
import { LogoutModalComponent } from './modules/logout-modal/logout-modal.component';
import { InputContraseniaComponent } from './modules/input-contrasenia/input-contrasenia.component';
import { InputLoginComponent } from './modules/input-login/input-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSuccessComponent } from './modules/admin-success/admin-success.component'; 
import { UsersListComponent } from './modules/users-list/users-list.component'; 
import { PollsterDashboardComponent } from './modules/pollster-dashboard/pollster-dashboard.component';
import { CreateUserComponent } from './modules/create-user/create-user.component';
import { DeleteUserModalComponent } from './modules/delete-user-modal/delete-user-modal.component';
import { SendPollSuccessComponent } from './modules/send-poll-success/send-poll-success.component';
import { StatsComponent } from './modules/stats/stats.component';
import { ChartComponent } from './modules/chart/chart.component'; 
import { HePollComponent } from './modules/he-poll/he-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    HeaderDashboardComponent,
    LogoutModalComponent,
    InputLoginComponent,
    InputContraseniaComponent,
    AdminSuccessComponent,
    UsersListComponent,
    PollsterDashboardComponent,
    CreateUserComponent,
    DeleteUserModalComponent,
    SendPollSuccessComponent,
    StatsComponent,
    ChartComponent,
    HePollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
