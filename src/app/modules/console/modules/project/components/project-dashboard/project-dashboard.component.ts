import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { BillingService } from '../../../billing/services/billing.service';
import { WorkingProjectService } from 'src/app/modules/console/services/project/working-project.service';
import { Chart } from 'chart.js/auto';
import { Product } from 'src/app/constants/products';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  @Input() project: Project | null = null;
  billing: any = null;
  chart: any;

  constructor(private workingProjectService: WorkingProjectService, private billingService: BillingService) {}

  ngOnInit(): void {
    this.workingProjectService.getWorkingProjectId$.subscribe(id => {
      if (id != null) {
        this.billingService.getBillingByProject(id).subscribe(res => {
          if (res.success()) {
            this.billing = res.data()['billing'];
            this.plotChart();
          }
        })
      }
    });
  }

  plotChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const apiNames = this.billing.apis.map((api: any) => api.product);
    const prices = this.billing.apis.map((api: any) => this.getApiPrice(api));
    this.chart = new Chart("projectBillingChart", {
      type: 'bar',
      data: {
        labels: apiNames,
        datasets: [
          {
            label: 'API Price',
            data: prices,
            backgroundColor: '#0d6efd'
          }
        ]
      },
      options: {
        aspectRatio:5
      }
    })
  }

  getApiPrice(api: any) {
    if (api.product === Product.chatbot.name) return api.hitsCount * Product.chatbot.price;
    if (api.product === Product.emforms.name) return api.hitsCount * Product.emforms.price;
    return 0;
  }
}
