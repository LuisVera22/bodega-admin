import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { PhoneInputComponent } from '../../shared/components/form/group-input/phone-input/phone-input.component';
import { ImageInputComponent } from '../../shared/components/form/input/image-input.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { TextAreaComponent } from '../../shared/components/form/input/text-area.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';

@Component({
  selector: 'app-local',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LabelComponent,
    InputFieldComponent,
    PhoneInputComponent,
    TextAreaComponent,
    ImageInputComponent
  ],
  templateUrl: './local.component.html'
})
export class LocalComponent {
  icons = {
    editIcon: '<i class="fa-solid fa-pen-to-square"></i>',
    storeIcon: '<i class="fa-solid fa-store"></i>',
    locationIcon: '<i class="fa-solid fa-location-dot"></i>',
    phoneIcon: '<i class="fa-solid fa-phone"></i>',
    mailIcon: '<i class="fa-solid fa-envelope"></i>',
    clockIcon: '<i class="fa-solid fa-clock"></i>'
  };

  countries = [
    { code: 'PE', label: '+51' },
    { code: 'US', label: '+1' }
  ];

  handlePhoneNumberChange(phoneNumber: string) {
    console.log('Updated phone number:', phoneNumber);
  }

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  }

  message = `Lunes a Sábado: 6:00 AM - 10:00 PM
Domingo: 6:00 AM - 2:00 PM`;
  messageTwo = '';
}
