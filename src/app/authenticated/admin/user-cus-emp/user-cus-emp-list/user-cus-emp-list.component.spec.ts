import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCusEmpListComponent } from './user-cus-emp-list.component';

describe('UserCusEmpListComponent', () => {
  let component: UserCusEmpListComponent;
  let fixture: ComponentFixture<UserCusEmpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCusEmpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCusEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
