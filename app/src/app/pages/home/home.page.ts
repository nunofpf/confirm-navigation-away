import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/validators/pw-validation';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;
  originalFormValue: any;
  formSubmitted = false;

  get isDirty(): boolean {
    return JSON.stringify(this.originalFormValue) !== JSON.stringify(this.form.value);
  }

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: [
          PasswordValidation.matchPassword
        ]
      });

    this.originalFormValue = this.form.value;
  }

  /**
   * Check if form input is required
   * @param formInput Form control
   */
  formInputIsRequired(formInput: string) {
    if (this.form.controls[formInput]) {
      if (this.form.controls[formInput].hasError('required')) {
        return true;
      }
    }
    return false;
  }

  submit() {
    this.formSubmitted = true;
  }

  confirm(msg: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.presentAlert({
        header: 'Register',
        message: msg,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Yes',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
    });
  }

  async presentAlert(opts: AlertOptions) {
    if (!opts.buttons) {
      Object.assign(opts, {
        buttons: ['Ok']
      });
    }
    const alert = await this.alertController.create(opts);
    alert.present();
  }
}
