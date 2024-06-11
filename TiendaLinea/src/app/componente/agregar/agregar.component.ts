import { Component, Injector } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../User/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../User/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  providers: [HttpClientModule, UserService]
})
export class AgregarComponent {
  user = {
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: ''
  };
  returnUrl: string = '/principal'; // Valor por defecto
  isImageLoaded = false;
  imageTouched = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private userService: UserService, private _router: Router) { }
  onImageChange(event: any) {
    const file = event.target.files[0];
    this.imageTouched = true;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.isImageLoaded = true;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    } else {
      this.isImageLoaded = false;
      this.imagePreview = null;
      this.selectedFile = null;
    }
  }
  onSubmit() {
    if (this.isImageLoaded && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.user.nombre);
      formData.append('descripcion', this.user.descripcion);
      formData.append('cantidad', this.user.cantidad);
      formData.append('precio', this.user.precio);
      formData.append('imagen', this.selectedFile);

      this.userService.createUser(formData).subscribe(response => {
        Swal.fire({
          title: "Articulo Guardado Exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1250
        }).then(() => {
          this._router.navigate(['/principal']);
        });
      }, error => {
        Swal.fire({
          title: "Error",
          text: "Error al enviar el Articulo",
          icon: "error",
          showConfirmButton: false,
          timer: 1250
        });
      });
    } else {
      Swal.fire({
        title: "Precaucion",
        text: "Debe cargar una imagen antes de enviar el Articulo",
        icon: "warning",
        showConfirmButton: false,
        timer: 1250
      });
    }
  }
  inputWidth: number = 169; // Ancho inicial en píxeles

  adjustWidth(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputWidth = Math.max(170, input.value.length * 10); // Ajusta el factor multiplicador según sea necesario
  }
}


