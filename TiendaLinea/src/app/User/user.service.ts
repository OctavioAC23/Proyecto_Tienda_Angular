import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/'; // Asegúrate de que esta URL coincida con tu configuración

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+'mostrar');
  }

  createUser(userData: FormData): Observable<User> {
    return this.http.post<User>(this.apiUrl+'guardar', userData);
  }

  deleteUser(UserID:string):Observable<User>{
    return this.http.delete<User>(this.apiUrl+'eliminar/'+UserID);
  }

  searchUsers(nombre:string):Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+'buscar/'+nombre);
  }

  getOneUser(UserID:string):Observable<User>{
    return this.http.get<User>(this.apiUrl+'editar/'+UserID);
  }

  UpdateUser(UserID:string,userData:FormData):Observable<User>{
    return this.http.post<User>(this.apiUrl+'actualizar/'+UserID,userData);
  }

  crearCarrito(Articulo:any):Observable<User>{
    return this.http.post<User>(this.apiUrl+'carrito/agregar',Articulo);
  }

  mostrarCarrito():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+'carrito/mostrar');
  }

  eliminarDelCarrito(CarritoID:string):Observable<User>{
    return this.http.delete<User>(this.apiUrl+'carrito/eliminar/'+CarritoID);
  }

  vaciarCarrito():Observable<User>{
    return this.http.delete<User>(this.apiUrl+'carrito/vaciar');
  }

  comprarCarrito(UserID: string, cantidad: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}carrito/compra/${cantidad}/${UserID}`, {});
  }
}
