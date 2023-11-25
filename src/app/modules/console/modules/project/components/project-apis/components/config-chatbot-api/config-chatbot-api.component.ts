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
  commonForm = new FormGroup({
    botName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    botProfilePic: new FormControl(null, [Validators.required]),
    greeting: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });
  qnaForms: FormGroup[] = [];
  paramsForm = new FormGroup({
    botEngine: new FormControl('None', [Validators.required, Validators.maxLength(20)]),
    languageModel: new FormControl('None', [Validators.required]),
    sysPrompt: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    knowledge: new FormControl('', [Validators.required]),
    temperature: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1)]),
    maxTokens: new FormControl(200, [Validators.required, Validators.min(1), Validators.max(2048)])
  });
  isOtherParameterVisible = false;
  error: string | null = null;

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.addQuestion();
  }

  commitConfig(botProfilePic: FileList | null) {
    this.error = null;
    if (this.commonForm.value.botName === '') {
      this.error = 'Bot name required.'
      return;
    }
    if (this.commonForm.value.botProfilePic === null || botProfilePic === null) {
      this.error = 'Bot Profile pic required.'
      return;
    }
    if (this.commonForm.value.greeting === '') {
      this.error = 'Greetings required.'
      return;
    }
    if (this.projectApi && this.projectApi.type === this.product.chatbot.types[0]) {
      if (this.qnaForms.map(f => f.controls['question'].value === '' && f.controls['answer'].value === '' ).includes(true)) {
        this.error = 'Please, provide value for each QnA.'
        return;
      }
      const dataForQna = this.qnaForms.map(f => ({question: f.value.question, answer: f.value.answer}));
      this.chatbotService.setConfig({
        apiId: this.projectApi!.id,
        name: this.commonForm.value.botName!,
        photo: botProfilePic[0],
        greeting: this.commonForm.value.greeting!,
        engine: this.product.chatbot.engines[0],
        model: '',
        sysPrompt: '',
        knowledge: '',
        config: JSON.stringify({}),
        data: JSON.stringify({ qna: dataForQna })
      }).subscribe(res => {
        if (res.success()) {
          this.closeConfig.emit();
        } else {
          this.error = res.error();
        }
      });
    } else if (this.projectApi && this.projectApi.type === this.product.chatbot.types[1]) {
      if (this.paramsForm.value.botEngine === 'None') {
        this.error = 'Select the engine.'
        return;
      }
      if (this.paramsForm.value.languageModel === 'None') {
        this.error = 'Select the language model.'
        return;
      }
      if (this.paramsForm.value.sysPrompt === '') {
        this.error = 'System Prompt is required.'
        return;
      }
      if (this.paramsForm.value.knowledge === '') {
        this.error = 'Knowledge is required.'
        return;
      }
      if (this.paramsForm.value.temperature && this.paramsForm.value.temperature < 0 && this.paramsForm.value.temperature > 1) {
        this.error = 'Temperature must be in range of 0 to 1.'
        return;
      }
      if (this.paramsForm.value.maxTokens && this.paramsForm.value.maxTokens < 1 && this.paramsForm.value.maxTokens > 2048) {
        this.error = 'Max Tokens must be in range of 1 to 2048.'
        return;
      }
      this.chatbotService.setConfig({
        apiId: this.projectApi!.id,
        name: this.commonForm.value.botName!,
        photo: botProfilePic[0],
        greeting: this.commonForm.value.greeting!,
        engine: this.paramsForm.value.botEngine!,
        model: this.paramsForm.value.languageModel!,
        sysPrompt: this.paramsForm.value.sysPrompt!,
        knowledge: this.paramsForm.value.knowledge!,
        config: JSON.stringify({
          'temperature': this.paramsForm.value.temperature!,
          'maxToken': this.paramsForm.value.maxTokens!
        }),
        data: JSON.stringify({})
      }).subscribe(res => {
        if (res.success()) {
          this.closeConfig.emit();
        } else {
          this.error = res.error();
        }
      });
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

  onEngineChange(event: any) {
    this.isOtherParameterVisible = event.target.value !== 'None'
  }

  resetAiFrom() {
    
  }
}
