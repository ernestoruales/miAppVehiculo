import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-mensajeValidacion',
  templateUrl: './mensajeValidacion.component.html',
  styleUrls: ['./mensajeValidacion.component.css']
})
export class MensajeValidacionComponent implements OnInit {

  constructor() { }

  @Input() control:AbstractControl;
  @Input() summited:boolean = false;

  ngOnInit() {
  }

  mostrarError(){
    if(!this.control){
      return false;
    }
    return this.control.invalid && this.summited;
  }
}
