import { AbstractControl } from '@angular/forms';

export function clientValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfClientValue = control.value;

        const clientControl = control.root.get('cliente'); // magic is this
        if (clientControl) {
            const clientValue = clientControl.value;
            if (clientValue !== cnfClientValue || clientValue === '') {
                return {
                    isError: true
                };
            }
        }
    }

    return null;
}

export function positiveNumberValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        if (control.value < 0) {
            return {
                isError: true
            };
        }
    }
    return null;
}