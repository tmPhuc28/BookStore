import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCusEmpFormComponent } from './user-cus-emp-form.component';

describe('UserCusEmpFormComponent', () => {
  let component: UserCusEmpFormComponent;
  let fixture: ComponentFixture<UserCusEmpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCusEmpFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCusEmpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
