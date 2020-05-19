import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {

  constructor(private _northwindService: NorthwindService) { }
  // Data Variables
  dataDimension: Label[] = [];
  dataValues: number[] = [];
  // Data Ng Select
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Company Name]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Product Name]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Employee Name]' }
  ];
  defaultBindingsListMonth = [
    { value: 1, label: 'Enero'},
    { value: 2, label: 'Febrero'},
    { value: 3, label: 'Marzo'},
    { value: 4, label: 'Abril'},
    { value: 5, label: 'Mayo'},
    { value: 6, label: 'Junio'},
    { value: 7, label: 'Julio'},
    { value: 8, label: 'Agosto'},
    { value: 9, label: 'Septiembre'},
    { value: 10, label: 'Octubre'},
    { value: 11, label: 'Noviembre'},
    { value: 12, label: 'Diciembre'}
  ];
  selectedDimension = null;
  selectedMonth = null;
  // Ng-Select Multiple
  customer$: Observable<any>;
  selectedCustomer = null;

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];
    this.selectedMonth = this.defaultBindingsListMonth[0];
    this.getDimension();
  }

  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.getDimension();
    this.clearModel();
  }

  onChangeMonth() {
    if (this.selectedCustomer != null) {
      this.getPieData();
    }
  }

  onChangeValues() {
    this.getPieData();
  }

  getDimension() {
    this._northwindService.getItemsByDimension(this.selectedDimension.dimension)
    .subscribe((result: any) => {
      this.customer$ = result.datosDimension;
    });
  }
  getPieData() {
    if (this.selectedCustomer.length > 0) {
    const mes = '[Dim Tiempo].[Mes].' + '[' + this.selectedMonth.value + ']';
    this._northwindService.getDataPieByDimension(this.selectedDimension.dimension, mes, this.selectedCustomer)
    .subscribe((result: any) => {
      console.log(result);
      this.dataDimension = result.pieChartLabels;
      if (result.pie[0] === undefined) {
        console.log('No tiene ventas');
    } else {
      this.dataValues = result.pie[0];
    }
      console.log(this.dataDimension);
      console.log(this.dataValues);
    });
  } else {console.log('vales verga jajaxd'); }
  }
  clearModel() {
    this.selectedCustomer = [];
  }
}
