import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    email: [null, Validators.required],
    motivo: ['error_app', Validators.required]
  });

  hasUnitNumber = false;

   constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
