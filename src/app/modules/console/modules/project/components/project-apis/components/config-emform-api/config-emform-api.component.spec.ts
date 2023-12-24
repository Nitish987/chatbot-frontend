import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEmformApiComponent } from './config-emform-api.component';

describe('ConfigEmformApiComponent', () => {
  let component: ConfigEmformApiComponent;
  let fixture: ComponentFixture<ConfigEmformApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigEmformApiComponent]
    });
    fixture = TestBed.createComponent(ConfigEmformApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
