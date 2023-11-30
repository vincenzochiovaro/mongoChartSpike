import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { CustomLoginService } from './custom-login-service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private customLoginService: CustomLoginService) {}
  title = 'mongoChartSpike';

  ngOnInit(): void {
    setTimeout(async () => {
      await this.tryLogin();
    });
  }

  async tryLogin() {
    const token = await this.customLoginService.login();
    if (token) {
      await this.renderChart(token);
    }
  }

  renderChart(token: string) {
    document.getElementById("dashboard")!.style.visibility = "visible";
    const sdk = new ChartsEmbedSDK({
      baseUrl: 'Your base Url',
      getUserToken: async function() {
        return token;
      }
    });

    const chart = sdk.createDashboard({
      dashboardId: 'Your dashboard ID',
    });

    // render the chart/dashboard into a container
    chart
      .render(document.getElementById('dashboard')!)
      .catch(() => window.alert('Chart failed to initialise'));
  }
}
