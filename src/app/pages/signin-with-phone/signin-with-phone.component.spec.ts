import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninWithPhoneComponent } from './signin-with-phone.component';

describe('SigninWithPhoneComponent', () => {
  let component: SigninWithPhoneComponent;
  let fixture: ComponentFixture<SigninWithPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninWithPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninWithPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
