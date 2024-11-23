import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../security/auth.service';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  private roles: string[] = [];
  private isHidden = true;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private authService: AuthService) { }

  @Input()
  set hasRole(roles: string | string[]) {
    this.roles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.updateView();
    })
  }

  private updateView() {
    let hasRole = this.checkRoles();

    if (hasRole && this.isHidden) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isHidden = false;
    } else if (!hasRole && !this.isHidden) {
      this.viewContainer.clear();
      this.isHidden = true;
    }
  }

  private checkRoles(): boolean {
    let userRoles = this.authService.currentUserSubject.value?.roles  || [];
    return this.roles.some(role => userRoles.includes(role));
  }

}
