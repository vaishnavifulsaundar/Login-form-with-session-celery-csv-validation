import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Chart, SeriesOptionsType } from 'highcharts';
// import * as go from 'gojs';
declare var go: any;

interface CsvDataResponse {
  data: any[];
  url: string; 
}


@Component({
  selector: 'app-csv-data',
  templateUrl: './csv-data.component.html',
  styleUrls: ['./csv-data.component.css']
})

export class CsvDataComponent {
  chart: Highcharts.Chart | undefined;
  url: any;
  selectedFile: any;
  csvData: any;
  showSuccessMessage = false;
  successMessage = '';
  ErrorMessage = '';
  NoFileMessage='';
  showErrorMessage = false;
  showNoFileMessage=false;
  showTable = false;
  csvFileUrls: string[] = [];
  headers: string[] | null = null;
  csvData1: CsvDataResponse[] = [];
  showHighchart = false;
  chartId = 'highchart-container';
  data: any;
  useCSVData = false;
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  gojsDiagram: go.Diagram | undefined;
  showMindMap = false;
  successData: number = 1; 
  totalScheduledTasks: number = 0; 

  
  constructor(private http: HttpClient, public router: Router) {}


  celerycomp(){
    this.router.navigate(['/celery'])
  }

  validateCsv(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('csvFile') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const fileName = this.selectedFile.name.toLowerCase();
      if (fileName.endsWith('.csv')) {
        const formData = new FormData();
        formData.append('csv_file', this.selectedFile);

        this.http.post<any>('http://localhost:8000/api/csvdata/', formData).subscribe(
          (response: any) => {
            this.showSuccessMessage = true;
            this.successMessage = 'CSV file is valid.';
            this.csvFileUrls.push(response.url);
            this.saveCsvUrlToDatabase(response.url);
          },
          (error: any) => {
            console.error(error);
            this.showErrorMessage = true;
          }
        );
      } else {
        this.showErrorMessage = true;
        this.successMessage = 'Invalid file format. Please select a CSV file.';
      }
    } else {
      console.error('No file selected.');
    }
  }

  saveCsvUrlToDatabase(url: string) {
    const csrfToken = this.getCSRFToken();
    if (!csrfToken) {
      console.error('CSRF token not found.');
      return;
    }

    const headers = new HttpHeaders({
      'X-CSRFToken': csrfToken,
    });

    this.http.post<any>('http://localhost:8000/api/save_csv_url/', { url }, { headers }).subscribe(
      (response: any) => {
        this.csvData1.push(response);
        console.log('CSV URL saved successfully:', response);
      },
      (error: any) => {
        console.error('Error saving CSV URL:', error);
      }
    );
  }


  scheduleCsvUrlTask(urls: string[]) {
    const taskName = 'backend.tasks.process_saved_url';
    const formData = new FormData();
    formData.append('task_name', taskName);
    for (const url of urls) {
      formData.append('urls', url);
    }
  
    this.http.post<any>('http://localhost:8000/api/schedule_csv_url_task/', formData).subscribe(
      (response: any) => {
        this.showSuccessMessage = true;
        this.successMessage = response.message;
        this.totalScheduledTasks += urls.length; 
        this.successData = this.totalScheduledTasks;
      },
      (error: any) => {
        console.error('Error while scheduling task:', error);
        this.showErrorMessage = true;
        this.ErrorMessage = 'Error scheduling the task. Please try again.';
      }
    );
  }


  getCSRFToken(): string | null {
    const name = 'csrftoken';
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
  }

  readCsvData(event: Event) {
    event.preventDefault();
    const url = 'http://localhost:8000/api/read_csv/';
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post<CsvDataResponse>(url, formData).subscribe(
      (response: CsvDataResponse) => {
        if ('data' in response) {
          this.csvData = response.data;
          this.headers = Object.keys(this.csvData[0]);
          this.showTable = true;
         
        } else {
          console.error('Invalid response');
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }



  plotAreaChart(data: any[]) {
    const chartData = this.csvData.map((entry:any) => ({
      name: `${entry.NZPort} - ${entry.Citizenship}`,
      x: parseInt(entry.Year, 10),
      y: parseFloat(entry.Count) / 1000,
    }));
    
    this.chartOptions = {
      chart: {
        type: 'bar',
        inverted: true,
      },
      title: {
        text: 'NZ Port - Citizenship Passenger Count',
        align: 'left',
      },
      accessibility: {
        keyboardNavigation: {
          seriesNavigation: {
            mode: 'serialize',
          },
        },
        enabled: false,
      },

      tooltip: {
        pointFormat: '&#8226; {series.name}: <b>${point.y} B</b>',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -150,
        y: 100,
        floating: true,
        borderWidth: 1,
      },
      yAxis: {
        labels: {
          format: '${text} B',
        },
        title: {
          text: 'Passenger Count (billions)',
        },
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          type: 'bar',
          data: [
                      {y:100},
                      {y:200},
                    ]
        },
        chartData
      ],
      
    };
    this.chart = Highcharts.chart(this.chartId, this.chartOptions);
  }



  Gocharts(){
    this.router.navigate(['/gochart'])
  }

  
   
  }
  
 













  


 












