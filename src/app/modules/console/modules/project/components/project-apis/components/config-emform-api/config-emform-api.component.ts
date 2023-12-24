import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/constants/products';
import { Api } from 'src/app/models/api';
import { EmformService } from '../../../../services/emform/emform.service';

@Component({
  selector: 'app-config-emform-api',
  templateUrl: './config-emform-api.component.html',
  styleUrls: ['./config-emform-api.component.css']
})
export class ConfigEmformApiComponent implements OnInit {
  @Input() projectApi: Api | null = null;
  @Output() closeConfig = new EventEmitter<any>();
  product = Product;
  emform = new FormGroup({
    formName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
  });
  emformArray: FormGroup[] = [];
  error: string | null = null;

  constructor(private emformService: EmformService) {}

  ngOnInit(): void {
    this.addField();
  }

  commitConfig() {
    this.error = null;
    if (!this.emform.value.formName) {
      this.error = 'Form Name must be specified.'
      return;
    }
    if (this.emform.value.formName.length < 3 || this.emform.value.formName.length > 50) {
      this.error = 'Form Name must be atleast of 3 characters and less than 50 characters.'
      return;
    }
    if (this.projectApi && this.emform.valid && this.emformArray.length > 0) {
      this.emformService.setConfig({
        apiId: this.projectApi.id,
        name: this.emform.controls.formName.value!,
        config: JSON.stringify(this.emformArray.map(form => form.value))
      }).subscribe(res => {
        if (res.success()) {
          this.closeConfig.emit();
        } else {
          this.error = res.error();
        }
      });
    }
  }

  addField() {
    this.emformArray.push(new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      placeholder: new FormControl('', [Validators.required])
    }));
  }

  removeField(index: number) {
    this.emformArray = this.emformArray.filter((v, i) => i !== index);
  }
}
