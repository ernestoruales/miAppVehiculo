import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../interfaces/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://www.epico.gob.ec/vehiculo/public/api/";
  //baseUrl = "http://localhost/vehiculo/public/api/";

  getVehiculos(filtro?:string, rows?:number, page?:number){
    let body = new HttpParams();
    body = filtro ? body.set('filtro',filtro) : body;
    body = rows ? body.set('rows',rows) : body;
    body = page ? body.set('page',page) : body;
    return this.http.get<any>(this.baseUrl+"vehiculos/", {params:body});
  }

  eliminarVehiculo(codigo:string){
    return this.http.delete<any>(this.baseUrl+'vehiculo/'+codigo);
    /*let index = this.listaAutos.findIndex((item) => item.codigo === codigo);
    this.listaAutos.splice(index, 1);*/
  }

  agregarVehiculo(vehiculo:Vehiculo){
    let body = this.getParamsVehiculo(vehiculo);
    return this.http.post<any>(this.baseUrl+'vehiculo/', body);
  }

  actualizarVehiculo(vehiculo:Vehiculo, codigo:string){
    let body = this.getParamsVehiculo(vehiculo);
    return this.http.put<any>(this.baseUrl+'vehiculo/' + codigo, body);
  }

  getVehiculo(codigo:string){
    return this.http.get<any>(this.baseUrl + "vehiculo/" + codigo);
  }

  getParamsVehiculo(vehiculo:Vehiculo){
    let body = new HttpParams();
    body = vehiculo.codigo ? body.set('codigo',vehiculo.codigo) : body;
    body = vehiculo.marca ? body.set('marca',vehiculo.marca) : body;
    body = vehiculo.modelo ? body.set('modelo',vehiculo.modelo) : body;
    body = vehiculo.anio ? body.set('anio',vehiculo.anio) : body;
    body = vehiculo.calificacion ? body.set('calificacion',vehiculo.calificacion) : body;
    body = vehiculo.foto ? body.set('foto',vehiculo.foto) : body;
    return body;
  }

}
