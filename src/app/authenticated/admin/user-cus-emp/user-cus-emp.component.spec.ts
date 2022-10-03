import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCusEmpComponent } from './user-cus-emp.component';

describe('UserCusEmpComponent', () => {
  let component: UserCusEmpComponent;
  let fixture: ComponentFixture<UserCusEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCusEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCusEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
