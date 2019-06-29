import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { HomePage } from './home.page';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanDeactivate<HomePage> {

    canDeactivate(component: HomePage): Promise<boolean> | boolean {
        if (component.isDirty) {
            if (component.formSubmitted) {
                return true;
            }
            return component.confirm('Navigate away and lose all changes?');
        }
        return true;
    }
}
