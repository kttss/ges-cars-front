import { Routes } from '@angular/router';

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
import { ReservationFormComponent } from '../../pages/reservation-form/reservation-form.component';
import { ReservationListComponent } from '../../pages/reservation-list/reservation-list.component';
import { AdminListComponent } from '../../pages/admin-list/admin-list.component';
import { AdminFormComponent } from '../../pages/admin-form/admin-form.component';

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  //   { path: 'typography', component: TypographyComponent },
  {
    path: 'typography',
    children: [
      {
        path: 'aa',
        component: TypographyComponent,
      },
    ],
  },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'agences', component: AgenceListComponent },
  { path: 'new-agence', component: NewAgenceComponent },
  {
    path: 'agence',
    children: [
      {
        path: 'list',
        component: AgenceListComponent,
      },
      {
        path: 'new',
        component: NewAgenceComponent,
      },
      {
        path: 'new',
        component: NewAgenceComponent,
      },
      {
        path: 'edit/:id',
        component: NewAgenceComponent,
      },
      {
        path: 'detail/:id',
        component: NewAgenceComponent,
      },
    ],
  },
  {
    path: 'car',
    children: [
      {
        path: 'list',
        component: CarListComponent,
      },
      {
        path: 'new',
        component: CarFormComponent,
      },
    ],
  },
  {
    path: 'client',
    children: [
      {
        path: 'list',
        component: ClientListComponent,
      },
      {
        path: 'new',
        component: ClientFormComponent,
      },
      {
        path: 'edit/:id',
        component: ClientFormComponent,
      },
      {
        path: 'detail/:id',
        component: ClientFormComponent,
      },
    ],
  },
  {
    path: 'reservation',
    children: [
      {
        path: 'list',
        component: ReservationListComponent,
      },
      {
        path: 'new',
        component: ReservationFormComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'list',
        component: AdminListComponent,
      },
      {
        path: 'new',
        component: AdminFormComponent,
      },
      {
        path: 'edit/:id',
        component: AdminFormComponent,
      },
      {
        path: 'detail/:id',
        component: AdminFormComponent,
      },
    ],
  },
];
