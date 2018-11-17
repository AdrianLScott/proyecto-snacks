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