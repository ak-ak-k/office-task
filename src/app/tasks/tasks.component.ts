import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks = {
    id:new Date(),
    employee:this.fb.control("",[Validators.required]),
    task:this.fb.control("",[Validators.required]),
    date:this.fb.control("",[Validators.required]),
  }

  
  constructor(public fb:FormBuilder ,public gs:GlobalService ,public ar:ActivatedRoute) {
    this.array = this.gs.tasks
    this.ar.queryParams.subscribe((data:any)=>{
      let item = this.array.find(i=>i.id==data.id)
      this.edit(item)
    })
  }
  
  ngOnInit(): void {
  }
  
  array:any[]=[]

  add()
  {
    this.tasks.id = new Date()
    let value = {...this.tasks}
    this.array.push(value)
    localStorage.setItem('tasks',JSON.stringify(this.array))
  }

  edit(item:any)
  {
    let value = {...item}
    this.tasks=value
  }

  update()
  {
    let index = this.array.findIndex(i=>i.id==this.tasks.id)
    let value = {...this.tasks}
    this.array[index]=value
    localStorage.setItem("tasks",JSON.stringify(this.array))
  }

  delete(index:any)
  {
    this.array.splice(index,1)
  }
  

}
