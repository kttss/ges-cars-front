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
}

declare interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
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
    children: [
      { path: 'list', title: 'List', ab: 'L' },
      { path: 'new', title: 'new ', ab: 'N' },
    ],
  },
  {
    path: '/car',
    title: 'Voiture',
    icon: 'drive_eta',
    class: '',
    type: 'sub',
    collapse: 'car',
    children: [
      { path: 'list', title: 'List', ab: 'L' },
      { path: 'new', title: 'new ', ab: 'N' },
    ],
  },
  {
    path: '/client',
    title: 'Client',
    icon: 'people',
    class: '',
    type: 'sub',
    collapse: 'client',
    children: [
      { path: 'list', title: 'List', ab: 'L' },
      { path: 'new', title: 'new ', ab: 'N' },
    ],
  },
  {
    path: '/reservation',
    title: 'Reservation',
    icon: 'content_paste',
    class: '',
    type: 'sub',
    collapse: 'reservation',
    children: [
      { path: 'list', title: 'List', ab: 'L' },
      { path: 'new', title: 'new ', ab: 'N' },
    ],
  },
  {
    path: '/admin',
    title: 'User',
    icon: 'api',
    class: '',
    type: 'sub',
    collapse: 'admin',
    children: [
      { path: 'list', title: 'List', ab: 'L' },
      { path: 'new', title: 'new ', ab: 'N' },
    ],
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
