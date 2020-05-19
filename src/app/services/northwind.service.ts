import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const URL_API = environment.API.EndPoint.Northwind;

@Injectable({
  providedIn: 'root'
})
export class NorthwindService {

  constructor(private http: HttpClient) { }

  getItemsByDimension(dimension: string) {
    return this.http.get(`${URL_API}GetItemsByDimension/${dimension}/`);
  }

  getDataBarByDimension(dimension: string, mes: string, values: string) {
    return this.http.get(`${URL_API}GetDataBarByDimensionMonth/${dimension}/${mes}/${values}`).pipe(
      map((result: any) => result)
    );
  }
  getDataBarByDimensionYear(dimension: string, año: string, values: string) {
    return this.http.get(`${URL_API}GetDataBarByDimensionYear/${dimension}/${año}/${values}`).pipe(
      map((result: any) => result)
    );
  }
  getDataPieByDimension(dimension: string, mes: string, values: string) {
    return this.http.get(`${URL_API}GetDataPieByDimensionMonth/${dimension}/${mes}/${values}`).pipe(
      map((result: any) => result)
    );
  }
}
