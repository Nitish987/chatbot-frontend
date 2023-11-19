import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/constants/products';
import { Api } from 'src/app/models/api';

@Component({
  selector: 'app-config-chatbot-api',
  templateUrl: './config-chatbot-api.component.html',
  styleUrls: ['./config-chatbot-api.component.css']
})
export class ConfigChatbotApiComponent implements OnInit {
  @Input() projectApi: Api | null = null;
  product = Product;
  qnaForms: FormGroup[] = [];

  ngOnInit(): void {
    this.addQuestion();
  }
  
  addQuestion() {
    this.qnaForms.push(
      new FormGroup({
        question: new FormControl('', [Validators.required]),
        answer: new FormControl('', [Validators.required])
      })
    );
  }

  removeQuestion(index: number) {
    this.qnaForms = this.qnaForms.filter((v, i) => i !== index);
  }

  resetQnaForm() {
    this.qnaForms = [];
    this.addQuestion();
  }
}
