import { AbstractControl } from '@angular/forms';

export function passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfpassValue = control.value;

        const passControl = control.root.get('pass');
        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== cnfpassValue || passValue === '') {
                return {
                    isError: true
                };
            }
        }
    }
    
    return null;
}

export class validateNumber{
    // Number only validation
    static numeric(control: AbstractControl) {
      let val = control.value;
  
      if (val === null || val === '') return null;
  
      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
  
      return null;
    }
  }