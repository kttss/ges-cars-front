import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { AgenceListComponent } from '../../pages/agence-list/agence-list.component';
import { NewAgenceComponent } from '../../pages/new-agence/new-agence.component';
import { CarListComponent } from '../../pages/car-list/car-list.component';
import { CarFormComponent } from '../../pages/car-form/car-form.component';
import { ClientListComponent } from '../../pages/client-list/client-list.component';
import { ClientFormComponent } from '../../pages/client-form/client-form.component';
import { AdminListComponent } from '../../pages/admin-list/admin-list.component';
import { AdminFormComponent } from '../../pages/admin-form/admin-form.component';
import { ReservationListComponent } from '../../pages/reservation-list/reservation-list.component';
import { ReservationFormComponent } from '../../pages/reservation-form/reservation-form.component';
import { SharedModule } from '../../shared/shared.module';
import { ContratPageComponent } from '../../pages/contrat-page/contrat-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AgenceListComponent,
    NewAgenceComponent,
    CarListComponent,
    CarFormComponent,
    ClientListComponent,
    ClientFormComponent,
    AdminListComponent,
    AdminFormComponent,
    ReservationListComponent,
    ReservationFormComponent,
    ContratPageComponent,
  ],
})
export class AdminLayoutModule {}
