import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputContraseniaComponent } from './modules/input-contrasenia/input-contrasenia.component';
import { InputLoginComponent } from './modules/input-login/input-login.component';
import { DashboardAdminComponent } from './modules/dashboard-admin/dashboard-admin.component';
import { PermissionsAdminGuard } from './core/guards/permissions-admin.guard';
import { AdminSuccessComponent } from './modules/admin-success/admin-success.component';
import { UsersListComponent } from './modules/users-list/users-list.component';
import { PollsterDashboardComponent } from './modules/pollster-dashboard/pollster-dashboard.component';
import { CreateUserComponent } from './modules/create-user/create-user.component';
import { SendPollSuccessComponent } from './modules/send-poll-success/send-poll-success.component';
import { StatsComponent } from './modules/stats/stats.component';
import { HePollComponent } from './modules/he-poll/he-poll.component';
import { PermissionsPollsterGuard } from './core/guards/permissions-pollster.guard';
import { OpenSessionGuard } from './core/guards/open-session.guard';

const routes: Routes = [
  { path: 'login', component: InputLoginComponent, canActivate: [OpenSessionGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    canActivate: [PermissionsAdminGuard]
  },

  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [PermissionsAdminGuard]
  },

  { path: 'Contrasenia', component: InputContraseniaComponent, canActivate: [OpenSessionGuard]  },
  { path: 'user-create-success', component: AdminSuccessComponent, canActivate: [PermissionsAdminGuard], data: { text: 'creado' } },
  { path: 'user-update-success', component: AdminSuccessComponent, canActivate: [PermissionsAdminGuard], data: { text: 'actualizado' } },
  { path: 'user-delete-success', component: AdminSuccessComponent, canActivate: [PermissionsAdminGuard], data: { text: 'eliminado' } },
  { path: 'dashboard-pollster', component: PollsterDashboardComponent, canActivate: [PermissionsPollsterGuard] },
  { path :'create-user', component: CreateUserComponent ,  data: { text: 'crear'}},
  { path :'update-user/:id/:roll', component: CreateUserComponent , data: { text: 'editar' } },
  { path: 'send-poll-success', component: SendPollSuccessComponent, canActivate: [PermissionsPollsterGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [PermissionsAdminGuard] },
  { path: 'poll', component: HePollComponent, canActivate: [PermissionsPollsterGuard] },

  //Este path debe ir siempre al final para que redirija a dashboard-admin cuando el user ingrese una ruta inexistente
  {
    path: '**',
    redirectTo: 'dashboard-admin'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
