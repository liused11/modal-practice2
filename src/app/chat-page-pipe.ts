import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatPage'
})
export class ChatPagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
