import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../User/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { User } from '../../User/user.model';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  providers: [UserService]
})
export class MostrarComponent implements OnInit {
  users: User[] = [];
  busqueda: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  Busqueda(): void {
    if (this.busqueda != '') {
      this.userService.searchUsers(this.busqueda).subscribe(users => {
        this.users = users;
      });
    } else {
      this.loadUsers();
    }

  }

  Agregar(Articulo: any): void {
    Swal.fire({
      title: "Agregar Articulo",
      text: "¿Desea agregar " + Articulo.nombre + " al carrito?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.crearCarrito(Articulo).subscribe(Response => {
          Swal.fire({
            title: "Articulo Agregado al Carrito Exitosamente",
            icon: "success",
            showConfirmButton: false,
            timer: 1250
          });
        }, error => {
          if(error.error.error.includes('duplicate')){
            Swal.fire({
              title: "Advertencia",
              text: "El Articulo ya está en el Carrito",
              icon: "warning",
              showConfirmButton: false,
              timer: 1250
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Error al agregar el Articulo",
              icon: "error",
              showConfirmButton: false,
              timer: 1250
            });
          }
        });
      }
    });
  }

  Eliminar(UserID: any, NombreArticulo: any) {
    Swal.fire({
      title: "Eliminar Articulo ",
      text: "Desea Eliminar " + NombreArticulo,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(UserID).subscribe(Response => {
          Swal.fire({
            title: "Articulo Eliminado Exitosamente",
            icon: "success",
            showConfirmButton: false,
            timer: 1250
          }).then(() => {
            this.loadUsers();
          });
        }, error => {
          Swal.fire({
            title: "Error",
            text: "Error al eliminar el Articulo",
            icon: "error",
            showConfirmButton: false,
            timer: 1250
          });
        });
      }
    });
  }
}
