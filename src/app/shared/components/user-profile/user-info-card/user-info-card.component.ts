import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ModalComponent } from '../../ui/modal/modal.component';

@Component({
  selector: 'app-user-info-card',
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
  ],
  templateUrl: './user-info-card.component.html',
  styles: ``
})
export class UserInfoCardComponent {

  constructor(public modal: ModalService) {}

  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }

  user = {
    firstName: 'Luis',
    lastName: 'Vera',
    role: 'Administrador',
    location: 'Huancayo, Perú',
    avatar: '/images/user/user.png',
    social: {
      facebook: 'https://www.facebook.com',
      x: 'https://x.com',
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://instagram.com',
    },
    email: 'luis@bodega.com',
    phone: '+51 987 654 321',
    bio: 'Administrador',
  };

  handleSave() {
    // Handle save logic here
    console.log('Guardando cambios...');
    this.modal.closeModal();
  }
}
