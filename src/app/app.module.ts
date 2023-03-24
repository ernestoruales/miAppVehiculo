import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalificacionComponent } from './componentes/calificacion/calificacion.component';
import { MensajeValidacionComponent } from './componentes/mensajeValidacion/mensajeValidacion.component';
import { PaginacionTablaComponent } from './componentes/PaginacionTabla/PaginacionTabla.component';
import { UserInterceptor } from './interceptores/userInterceptor';
import { VehiculoDetalleComponent } from './paginas/VehiculoDetalle/VehiculoDetalle.component';
import { VehiculosComponent } from './paginas/Vehiculos/Vehiculos.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiculosComponent,
    CalificacionComponent,
    PaginacionTablaComponent,
    VehiculoDetalleComponent,
    MensajeValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
