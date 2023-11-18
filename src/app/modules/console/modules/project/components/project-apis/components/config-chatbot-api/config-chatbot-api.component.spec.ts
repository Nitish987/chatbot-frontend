import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigChatbotApiComponent } from './config-chatbot-api.component';

describe('ConfigChatbotApiComponent', () => {
  let component: ConfigChatbotApiComponent;
  let fixture: ComponentFixture<ConfigChatbotApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigChatbotApiComponent]
    });
    fixture = TestBed.createComponent(ConfigChatbotApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
