import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-PaginacionTabla',
  templateUrl: './PaginacionTabla.component.html',
  styleUrls: ['./PaginacionTabla.component.css']
})
export class PaginacionTablaComponent implements OnInit, OnChanges {

  @Input() rows:number=10;
  @Input() pages:number;
  @Output() selectPage = new EventEmitter<any>();

  currentPage:number = 1;
  listaPaginas:any[];
  constructor() { }

  ngOnInit() {
    this.generarPaginacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['rows'] || changes['pages']){
      this.generarPaginacion();
    }
  }

  generarPaginacion(){
    this.listaPaginas = [];
    for(let i=1; i <= this.pages; i++){
      this.listaPaginas.push(i);
    }
  }

  _selectPage(page:number){
    this.currentPage = page;
    this.selectPage.emit(page);
  }

  atras(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.selectPage.emit(this.currentPage);
    }
  }

  siguiente(){
    if(this.currentPage < this.pages){
      this.currentPage++;
      this.selectPage.emit(this.currentPage);
    }
  }
}
