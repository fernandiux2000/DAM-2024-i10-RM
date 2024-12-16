import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device {
  dispositivoId: number;
  nombre: string;
  ubicacion: string;
  electrovalvulaId: number;
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://node_backend:3000/api/devices'; // Ajusta según tu configuración.

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }
}