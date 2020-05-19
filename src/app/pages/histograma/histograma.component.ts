import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})
export class HistogramaComponent implements OnInit {


  defaultBindingsList = [
    { value: 1, label: '1996'},
    { value: 2, label: '1997'},
    { value: 3, label: '1998'}
  ];
  defaultBindingsListDim = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Company Name]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Product Name]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Employee Name]' }
  ];
  selectedDimension = null;
  selectedYear = null;
  customer: Observable<any> = null;
  selectedCustomer: string[] = [];
  barChartLabels = [];
  barChartData = [];

  constructor(private _northwindService: NorthwindService) { }

  ngOnInit(): void {
    this.selectedYear = this.defaultBindingsList[0];
    this.selectedDimension = this.defaultBindingsListDim[0];
    this.consultarDims();
  }
  onChangeYear($event) {
    this.graficar();
  }
  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.selectedCustomer = [];
    this.consultarDims();
  }

  stringifyCustomer(): string {
    let stringCustomer = '';
    this.selectedCustomer.forEach(element => {
      stringCustomer += element + ',';
    });
    return stringCustomer.slice(0, -1);
  }

  onChangeValues() {
    this.graficar();
  }

  consultarDims() {
    this._northwindService.getItemsByDimension(this.selectedDimension.dimension)
    .subscribe((result: any) => {
      this.customer = result.datosDimension;
  });
  }

  graficar() {
    const jaar = '[' + this.selectedYear.label + ']';
    if (this.selectedCustomer.length > 0) {
      this._northwindService.getDataBarByDimensionYear(
        this.selectedDimension.dimension, jaar, this.stringifyCustomer())
        .subscribe((result: any) => {
          this.barChartLabels = result.barChartLabels;
          this.barChartData = result.barChartData;
          console.log(this.barChartData);
          console.log(this.barChartLabels);
        });
    }
  }
}
