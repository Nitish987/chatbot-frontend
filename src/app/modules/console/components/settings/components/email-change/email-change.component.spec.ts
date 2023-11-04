import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangeComponent } from './email-change.component';

describe('EmailChangeComponent', () => {
  let component: EmailChangeComponent;
  let fixture: ComponentFixture<EmailChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailChangeComponent]
    });
    fixture = TestBed.createComponent(EmailChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
