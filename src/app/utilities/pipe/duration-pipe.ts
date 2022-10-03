import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number, hourFormat: string = 'h', minuteFormat: string = 'm'): string {
    const hourValue = parseInt(`${duration / 3600000}`);
    const hourString = hourValue > 0
      ? `${hourValue}${hourFormat} `
      : ''
    const minuteValue = Math.ceil((duration % 3600000) / 60000);
    const minuteString = `${minuteValue}${minuteFormat}`
    return `${hourString}${minuteString}`;
  }
}
