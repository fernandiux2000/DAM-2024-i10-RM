import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, // Declara los componentes aquí
    HomeComponent,
  ],
  imports: [
    BrowserModule, // Importa módulos esenciales
    HttpClientModule,
    AppRoutingModule // Importa el módulo de rutas
  ],
  providers: [],
  bootstrap: [AppComponent] // Componente raíz
})
export class AppModule { }