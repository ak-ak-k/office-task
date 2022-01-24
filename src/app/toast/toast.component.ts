import { Component, OnInit } from '@angular/core';
// import { setTimeout } from 'timers';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  display_toast=false
  message = "Text Message"

  constructor(public gs:GlobalService) {
    this.gs.$show_toast.subscribe((message:any)=>{
      this.message=message
      this.display_toast = true
      setTimeout(() => {
        this.display_toast = false        
      }, 3000);
    })
   }

  ngOnInit(): void {
  }

}
