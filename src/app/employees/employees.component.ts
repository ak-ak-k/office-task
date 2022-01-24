import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    gender: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    city: this.fb.control('', [Validators.required]),
    id: new Date(),
  });

  constructor(public fb: FormBuilder,public gs: GlobalService,public ar: ActivatedRoute) 
  {
    this.array  = this.gs.employees
    this.ar.queryParams.subscribe((data:any)=>{
      let value =  this.array.find((i:any)=>i.id == data.id)
      this.edit(value)
    })

  }

  ngOnInit(): void {}

  array: any = [];

  add() {
    let date = new Date()
    this.form.value.id = date.toLocaleString()
    let value = {...this.form.value}
    this.array.push(value)
    localStorage.setItem('employees',JSON.stringify(this.array))
    this.gs.$show_toast.next('Employee was added')
  }

  
  update()
  {
   let index =  this.array.findIndex((i:any)=> i.id == this.form.value.id)
   let value = {...this.form.value}
   this.array[index] = value
   localStorage.setItem('employees',JSON.stringify(this.array))
  this.gs.$show_toast.next('Employee was Updated')
  }

  edit(item:any)
  {
   
    let value = {...item}
    this.form.patchValue(value)
  }

  delete(index:any)
  {
    this.array.splice(index,1)
    localStorage.setItem('employees',JSON.stringify(this.array))
    this.gs.$show_toast.next('Employee was deleted')
  }
}
