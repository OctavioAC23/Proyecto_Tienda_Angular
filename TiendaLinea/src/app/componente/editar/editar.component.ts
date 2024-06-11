import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../User/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../User/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  providers: [HttpClient, UserService],
  templateUrl: '../agregar/agregar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  user: User = {
    _id: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen: '',
    maxCantidad:1
  };
  returnUrl: string = '/principal'; // Valor por defecto
  isImageLoaded = false;
  imageTouched = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  globalID!: string;
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.globalID = id;
      this.userService.getOneUser(id).subscribe(user => {
        this.user = user;
        this.returnUrl = '/mostrar';
        this.imagePreview = 'http://localhost:3000' + user.imagen;
        this.selectedFile = new File([], user.imagen.split('/').pop() || ''); // Establecer el nombre del archivo cargado
        this.isImageLoaded = true;
      });
    });
  }

  onImageChange(event: any): void {
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

  onSubmit(): void {
    if (this.isImageLoaded && this.selectedFile) {
      const formData = new FormData();
      formData.append('nombre', this.user.nombre);
      formData.append('descripcion', this.user.descripcion);
      formData.append('cantidad', this.user.cantidad.toString());
      formData.append('precio', this.user.precio.toString());
      formData.append('imagen', this.selectedFile);
      this.userService.UpdateUser(this.globalID,formData).subscribe(response => {
        Swal.fire({
          title: "Articulo Actualizado Exitosamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1250
        }).then(() => {
          this.router.navigate(['/mostrar']);
        });
      }, error => {
        Swal.fire({
          title: "Error",
          text: "Error al actualizar el Articulo",
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
