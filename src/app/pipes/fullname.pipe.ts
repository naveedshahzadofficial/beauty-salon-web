import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value + " " + args.join(" ");
  }

}
