import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/constants/products';
import { Api } from 'src/app/models/api';
import { ChatbotService } from '../../../../services/chatbot/chatbot.service';

@Component({
  selector: 'app-config-chatbot-api',
  templateUrl: './config-chatbot-api.component.html',
  styleUrls: ['./config-chatbot-api.component.css']
})
export class ConfigChatbotApiComponent implements OnInit {
  @Input() projectApi: Api | null = null;
  @Output() closeConfig = new EventEmitter<any>();
  product = Product;
  qnaForms: FormGroup[] = [];
  error: string | null = null;

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.addQuestion();
  }

  commitConfig() {
    this.error = null;
    if (this.projectApi && this.projectApi.type === this.product.chatbot.types[0]) {
      if (this.qnaForms.map(f => f.controls['question'].value === '' && f.controls['answer'].value === '' ).includes(true)) {
        this.error = 'Please, provide value for each QnA.'
        return;
      }
      const dataForQna = this.qnaForms.map(f => ({question: f.value.question, answer: f.value.answer}));
      this.chatbotService.setConfig({
        apiId: this.projectApi!.id,
        config: {},
        data: { qna: dataForQna }
      }).subscribe(res => {
        if (res.success()) {
          this.closeConfig.emit();
        } else {
          this.error = res.error();
        }
      });
    } else if (this.projectApi && this.projectApi.type === this.product.chatbot.types[1]) {
      // Todo
    }
  }
  
  addQuestion() {
    this.qnaForms.push(new FormGroup({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required])
    }));
  }

  removeQuestion(index: number) {
    this.qnaForms = this.qnaForms.filter((v, i) => i !== index);
  }

  resetQnaForm() {
    this.qnaForms = [];
    this.addQuestion();
  }
}
