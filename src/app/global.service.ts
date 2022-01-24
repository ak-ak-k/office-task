import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; ''

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  employees:any[]=JSON.parse(localStorage.getItem('employees') || '[]')
  tasks :any[]=JSON.parse(localStorage.getItem("tasks") || '[]')

  $show_toast = new Subject()



  constructor() { }
}
