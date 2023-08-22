import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-celery-ui',
  templateUrl: './celery-ui.component.html',
  styleUrls: ['./celery-ui.component.css']
})
export class CeleryUIComponent {
  url: any;
  showSuccessMessage = false;
  successMessage = '';
  ErrorMessage = '';
  NoFileMessage='';
  showErrorMessage = false;
  showNoFileMessage=false;
  showTable = false;
  csvFileUrls: string[] = [];
  headers: string[] | null = null;
  showHighchart = false;
  chartId = 'highchart-container';
  data: any;
  useCSVData = false;
  showMindMap = false;
  successData: number = 1; 
  totalScheduledTasks: number = 0; 


  constructor(private http: HttpClient, public router: Router) {}


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

}
