import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'onlyOneError',
})
export class onlyOneErrorPipe implements PipeTransform{

    transform(allErrors: any, errorPriority: string[]) {
        if ( !allErrors ){
            return null;
        }

        const onlyErrors: any = {};

        for(let error of errorPriority){
            if ( allErrors[error] ){
                onlyErrors[error] = allErrors[error];
                break;
            }
        }

        return onlyErrors;
    }

}