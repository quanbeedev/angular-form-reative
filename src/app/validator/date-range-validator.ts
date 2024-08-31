import { FormGroup, Validators, ValidatorFn } from "@angular/forms";

export function createPromotionRangeValidator(): ValidatorFn {
    return (form: FormGroup): Validators | null => {
        const start: Date = form.get("promoteStartAt").value;
        const end: Date = form.get("promoteEndAt").value;


        if ( start && end) {
            const isRangeValid = (end?.getTime() - start?.getTime() > 0);

            console.log("isRangeValid", isRangeValid);
            return isRangeValid ? null : { promoPeriod: true};
        };

        return null;

    }
}