import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent{
  message!: string; 

  constructor(private spinner: NgxSpinnerService) { }

  showLoading(msg: string) {
    this.message = msg;
    this.spinner.show();
  }

  hideLoading() {
    this.spinner.hide();
  }
}
