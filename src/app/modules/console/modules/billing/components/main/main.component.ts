import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Chart } from 'chart.js/auto';
import { Product } from 'src/app/constants/products';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  billings: any[] = [];
  chart: any;
  Product = Product;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.getBillingDashboard().subscribe(res => {
      if (res.success()) {
        this.billings = res.data()['billings'];
        this.plotChart();
      }
    });
  }

  plotChart() {
    const projectNames = this.billings.map(project => project.name);
    const prices = this.billings.map(project => project.priceToPay);
    this.chart = new Chart("billingChart", {
      type: 'bar',
      data: {
        labels: projectNames,
        datasets: [
          {
            label: 'Project Price',
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
