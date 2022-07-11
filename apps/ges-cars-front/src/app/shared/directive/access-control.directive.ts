import { Directive, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { RoleEnum } from '../enums/role.enum';

@Directive({
  selector: '[gesCarsAccessControl]',
})
export class AccessControlDirective {
  @Input() limited = true;

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      if (this.limited && decoded.role == RoleEnum.AgenceAdmin) {
        this.elementRef.nativeElement.style.display = 'none';
      } else {
        this.elementRef.nativeElement.style.display = 'block';
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
