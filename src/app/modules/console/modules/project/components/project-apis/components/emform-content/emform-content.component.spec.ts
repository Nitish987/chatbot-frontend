import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmformContentComponent } from './emform-content.component';

describe('EmformContentComponent', () => {
  let component: EmformContentComponent;
  let fixture: ComponentFixture<EmformContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmformContentComponent]
    });
    fixture = TestBed.createComponent(EmformContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
