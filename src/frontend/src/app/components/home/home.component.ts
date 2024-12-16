import { Component, OnInit } from '@angular/core';
import { DeviceService, Device } from '../services/device.service'; // Ajusta la ruta si es necesario.

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  devices: Device[] = []; // Define el tipo explícito.

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((data: Device[]) => {
      console.log(data); // Asegúrate de verificar si llegan los datos.
      this.devices = data;
    });
  }
}