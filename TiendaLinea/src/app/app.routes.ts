import { Routes } from '@angular/router';
import { PrincipalComponent } from './componente/principal/principal.component';
import { AgregarComponent } from './componente/agregar/agregar.component';
import { MostrarComponent } from './componente/mostrar/mostrar.component';
import { EditarComponent } from './componente/editar/editar.component';
import { CarritoComponent } from './componente/carrito/carrito.component';
export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'principal', component: PrincipalComponent },
    {path: 'agregar',component:AgregarComponent},
    {path: 'mostrar',component:MostrarComponent},
    {path: 'editar/:id',component:EditarComponent},
    {path: 'carrito',component:CarritoComponent}
];
