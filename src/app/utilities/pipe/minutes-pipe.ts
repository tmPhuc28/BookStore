import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {

  transform(duration: number, minuteFormat: string = 'm'): string {
    const minuteValue = Math.ceil(duration / 60000);
    const minuteString = `${minuteValue}${minuteFormat}`
    return `${minuteString}`;
  }
}
