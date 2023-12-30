import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Api } from 'src/app/models/api';
import { EmformService } from '../../../../services/emform/emform.service';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-emform-content',
  templateUrl: './emform-content.component.html',
  styleUrls: ['./emform-content.component.css']
})
export class EmformContentComponent implements OnChanges {
  @Input() projectApi: Api | null = null;
  headers: string[] = [];
  data: any[] = [];

  constructor(private emformService: EmformService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadContent();
  }

  loadContent() {
    if (this.projectApi) {
      this.emformService.getContent(this.projectApi.configId).subscribe(res => {
        if (res.success()) {
          this.headers = res.data()['content']['keys'];
          this.data = res.data()['content']['data'];
        }
      });
    }
  }

  downloadExcelSheet() {
    const workbook = utils.book_new();
    const sheet = utils.json_to_sheet(this.data);
    utils.book_append_sheet(workbook, sheet, 'sheet');
    const binaryXlsx = write(workbook, { bookType: 'xlsx', type: 'binary' });
    let buf = new ArrayBuffer(binaryXlsx.length);
    let view = new Uint8Array(buf);
    for (var i = 0; i < binaryXlsx.length; i++) view[i] = binaryXlsx.charCodeAt(i) & 0xFF;
    saveAs(new Blob([buf], { type: "application/octet-stream" }), 'sheet.xlsx');
  }
}

