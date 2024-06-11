import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../User/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../User/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  providers: [UserService],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  users: User[] = [];
  Total = 0;
  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.mostrarCarrito().subscribe(users => {
      this.users = users;
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.Total = this.users.reduce((acc, user) => acc + user.precio * user.maxCantidad, 0);
  }


  increment(user: User): void {
    if (user.maxCantidad < user.cantidad) {
      user.maxCantidad++;
      this.calcularTotal();
    }
  }

  decrement(user: User): void {
    if (user.maxCantidad > 1) {
      user.maxCantidad--;
      this.calcularTotal();
    }
  }


  EliminarDelCarrito(Id: any, NombreArticulo: any) {
    Swal.fire({
      title: "Eliminar Articulo ",
      text: "¿Desea Eliminar " + NombreArticulo + ' del carrito?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarDelCarrito(Id).subscribe(Response => {
          Swal.fire({
            title: "Articulo Eliminado del Carrito",
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

  VaciarCarrito() {
    Swal.fire({
      title: "Vaciar Carrito ",
      text: "¿Desea vaciar el carrito completamente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.vaciarCarrito().subscribe(Response => {
          Swal.fire({
            title: "Carrito vacio",
            icon: "success",
            showConfirmButton: false,
            timer: 1250
          }).then(() => {
            this.loadUsers();
          });
        }, error => {
          Swal.fire({
            title: "Error",
            text: "Error al vaciar el Articulo",
            icon: "error",
            showConfirmButton: false,
            timer: 1250
          });
        });
      }
    });
  }

  Comprar(Carrito: any) {
    Swal.fire({
      title: "Finalizar Compra ",
      text: "¿Desea finalizar su compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        for (var i = 0; i < Carrito.length; i++) {
          this.userService.comprarCarrito(Carrito[i]._id, Carrito[i].maxCantidad).subscribe(Response => {
            Swal.fire({
              title: "Compra Exitosa",
              icon: "success",
              showConfirmButton: false,
              timer: 1250
            }).then(() => {
              this.userService.vaciarCarrito().subscribe();
              this._router.navigate(['/principal']);
            });
          }, error => {
            Swal.fire({
              title: "Error",
              text: "Error al vaciar el Articulo",
              icon: "error",
              showConfirmButton: false,
              timer: 1250
            });
          });
        }
      }
    });
  }
}
