import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { FormInputErrorModule } from 'src/app/components/form/input-error/form-input-error.module';

import { HomeGuard } from './home.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputErrorModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canDeactivate: [HomeGuard]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
