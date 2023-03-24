import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/interfaces/Vehiculo';
import { VehiculoService } from 'src/app/servicios/Vehiculo.service';

@Component({
  selector: 'app-Vehiculos',
  templateUrl: './Vehiculos.component.html',
  styleUrls: ['./Vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder) { }

  filtrarPor:string = "";

  listaVehiculo:any[] = [];
  mostrarImagen:boolean = false;

  formularioVehiculo: FormGroup;

  rows:number = 5;
  pages:number;
  page:number = 1;

  wasValidated = false;

  ngOnInit() {
    //this.listaVehiculo = this.vehiculoService.getVehiculos();
    this.consultaVehiculos();
    this.formularioVehiculo = this.formBuilder.group({
      "marca": [null, Validators.required],
      "modelo":[null, Validators.required],
      "codigo": [null, Validators.compose([Validators.required, Validators.minLength(3)]) ] ,
      "anio": [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]*$')])],
      "calificacion": [null, Validators.compose([Validators.required, Validators.max(5), Validators.min(1)])],
      "foto": [null]
    });
    console.log(this.formularioVehiculo);
  }

  consultaVehiculos(){
    this.vehiculoService.getVehiculos(this.filtrarPor, this.rows, this.page).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        this.listaVehiculo = respuesta.data;
        this.rows = respuesta.rows;
        this.pages = respuesta.pages;
      }
    });
  }

  mostraAlerta(calificacion:any){
    alert("La calificacion es: " + calificacion);
  }

  elminarVehiculo(vehiculo:any){
    this.vehiculoService.eliminarVehiculo(vehiculo.id).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        alert(respuesta.mensaje);
        this.consultaVehiculos();
      }
    });
  }

  getListaVehiculos(){
    return this.listaVehiculo;
  }

  guardarVehiculo(){
    this.wasValidated = true;
    if(!this.formularioVehiculo.valid){
      console.log(this.formularioVehiculo);
      alert("Faltan campos requeridos");
      return;
    }
    let vehiculo:Vehiculo = {...this.formularioVehiculo.value};
    console.log(vehiculo);
    this.vehiculoService.agregarVehiculo(vehiculo).subscribe((respuesta)=>{
      alert(respuesta.mensaje);
      if(respuesta.codigo == 1){
        this.inicializarFormulario();
        this.consultaVehiculos();
      }
    },
    (errorHttp:HttpErrorResponse) => {
      console.log(errorHttp.error);
      let mensaje = errorHttp.error.mensaje;
      mensaje += errorHttp.error.error?.codigo ? (' - ' + errorHttp.error.error?.codigo) : "";
      mensaje += errorHttp.error.error?.marca ? (' - ' + errorHttp.error.error?.marca) : "";
      mensaje += errorHttp.error.error?.modelo ? (' - ' + errorHttp.error.error?.modelo) : "";
      mensaje += errorHttp.error.error?.anio ? (' - ' + errorHttp.error.error?.anio) : "";
      alert(mensaje);
    });
  }

  seleccionarPagina(page:number){
    this.page = page;
    this.consultaVehiculos();
  }

  cambioRows(){
    this.page = 1;
    this.consultaVehiculos();
  }

  inicializarFormulario(){
    this.formularioVehiculo.controls['marca'].setValue(null);
    this.formularioVehiculo.controls['foto'].setValue(null);
    this.formularioVehiculo.controls['anio'].setValue(null);
    this.formularioVehiculo.controls['calificacion'].setValue(null);
    this.formularioVehiculo.controls['codigo'].setValue(null);
    this.formularioVehiculo.controls['modelo'].setValue(null);
    this.wasValidated = false;
  }
}
