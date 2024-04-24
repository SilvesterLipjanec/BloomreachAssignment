import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputValueType',
  standalone: true
})
export class InputValueTypePipe implements PipeTransform {

  transform(value: string): string {
    return value === "number" ? "number" : "text";
  }

}
