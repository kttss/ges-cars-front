import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems[];
  limited: boolean;
}

declare interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  limited: boolean;
  description?: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    class: '',
    limited: false,
  },
  // { path: '/agences', title: 'Les Agences', icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  // {
  //   path: '/typography',
  //   title: 'submenu',
  //   icon: 'content_paste',
  //   class: '',
  //   type: 'sub',
  //   collapse: 'typography',
  //   children: [{ path: 'aa', title: 'Regular Forms', ab: 'RF' }],
  // },
  // {
  //   path: '/typography',
  //   title: 'Typography',
  //   icon: 'library_books',
  //   class: '',
  // },
  // { path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // {
  //   path: '/notifications',
  //   title: 'Notifications',
  //   icon: 'notifications',
  //   class: '',
  // },
  // {
  //   path: '/upgrade',
  //   title: 'Upgrade to PRO',
  //   icon: 'unarchive',
  //   class: 'active-pro',
  // },
  {
    path: '/agence',
    title: 'Agence',
    icon: 'api',
    class: '',
    type: 'sub',
    collapse: 'agence',
    limited: false,
    children: [
      {
        path: 'list',
        title: 'List',
        ab: 'L',
        description: 'Liste des agences',
        limited: false,
      },
      {
        path: 'new',
        title: 'new ',
        ab: 'N',
        description: 'Nouvelle agence',
        limited: true,
      },
    ],
  },
  {
    path: '/car',
    title: 'Voiture',
    icon: 'drive_eta',
    class: '',
    type: 'sub',
    collapse: 'car',
    limited: false,
    children: [
      {
        path: 'list',
        title: 'List',
        ab: 'L',
        description: 'Liste des Voitures',
        limited: false,
      },
      {
        path: 'new',
        title: 'new ',
        ab: 'N',
        description: 'Nouvelle Voiture',
        limited: true,
      },
    ],
  },
  {
    path: '/client',
    title: 'Client',
    icon: 'people',
    class: '',
    type: 'sub',
    collapse: 'client',
    limited: false,
    children: [
      {
        path: 'list',
        title: 'List',
        ab: 'L',
        description: 'liste des clients',
        limited: false,
      },
      {
        path: 'new',
        title: 'new ',
        ab: 'N',
        description: 'Nouveau client',
        limited: false,
      },
    ],
  },
  {
    path: '/reservation',
    title: 'Reservation',
    icon: 'content_paste',
    class: '',
    type: 'sub',
    collapse: 'reservation',
    limited: false,
    children: [
      {
        path: 'list',
        title: 'List',
        ab: 'L',
        description: 'Liste des Reservations',
        limited: false,
      },
      {
        path: 'new',
        title: 'new ',
        ab: 'N',
        description: 'Nouvelle Reservation',
        limited: false,
      },
    ],
  },
  {
    path: '/admin',
    title: 'User',
    icon: 'api',
    class: '',
    type: 'sub',
    collapse: 'admin',
    limited: true,
    children: [
      {
        path: 'list',
        title: 'Liste des admins',
        ab: 'L',
        description: 'liste des Admins',
        limited: true,
      },
      {
        path: 'new',
        title: 'new ',
        ab: 'N',
        description: 'Nouveau Admin',
        limited: true,
      },
    ],
  },
  {
    path: '/logs',
    title: 'Logs',
    icon: 'history',
    class: '',
    limited: true,
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = ROUTES;

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (true) {
      return false;
    }
    return true;
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector('.sidebar .sidebar-wrapper')
      );
      const ps = new PerfectScrollbar(elemSidebar, {
        wheelSpeed: 2,
        suppressScrollX: true,
      });
    }
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
