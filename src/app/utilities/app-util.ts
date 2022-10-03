import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

interface FormatDate {
  date: any;
  format?: string;
  toLocal?: boolean;
  options?: object;
}

interface JsonValue {
  name: string;
  value: any;
}

const AppUtil = {
  toast(
    errorMessage: any,
    event: any,
    isShow: boolean = true,
    messageService?: MessageService
  ) {
    if (isShow && messageService) {
      messageService.add({
        key: 'app-toast',
        severity: 'error',
        // @ts-ignore
        detail: errorMessage || event.body.message,
      });
    }
  },
  toCamelCaseKey({ obj }: { obj: any }): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toCamelCaseKey({ obj: v }));
    } else if (obj && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [_.camelCase(key)]: AppUtil.toCamelCaseKey({ obj: obj[key] }),
        }),
        {}
      );
    }
    return obj;
  },
  toSnakeCaseKey(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => AppUtil.toSnakeCaseKey(v));
    } else if (obj && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [_.snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key]),
        }),
        {}
      );
    }
    return obj;
  },
  translate(service: TranslateService, key: string): string {
    if (!service || !key) {
      return '';
    }
    let translated = '';
    service.get(key).subscribe((s: string) => {
      translated = s;
    });
    return translated;
  },
  translateWithParams(
    service: TranslateService,
    key: string,
    params: any
  ): string {
    if (!service || !key) {
      return '';
    }
    let translateTxt = '';
    service.get(key, params).subscribe((res: string) => {
      translateTxt = res;
    });
    return translateTxt;
  },
  translateList: function (
    service: TranslateService,
    keys: string[],
    object: Object | undefined
  ): Observable<any> {
    return service.get(keys, object);
  },
  getBrowserLang() {
    return navigator.language || window.navigator.language;
  },
  hashMD5(text: string | CryptoJS.lib.WordArray): string {
    return CryptoJS.MD5(text).toString();
  },
  checkRegex(regex: RegExp, str: string): boolean {
    return !!str.match(regex);
  },
  generateArrayOfYears(yearDefault: number, maxYear: number) {
    let years = [];
    for (let i = maxYear; i >= yearDefault; i--) {
      years.push({ item: `${i}` });
    }
    return years;
  },
  generateArrayOfMonths() {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({
        item: `${i - 1}`,
        label: `${i}`,
      });
    }
    return months;
  },
  parseFloatNumber(number: string | number, decimal: number) {
    return parseFloat(`${number}`).toFixed(decimal);
  },
  initArrRanges(startValue: number, endValue: number, step: number = 0) {
    return Array(endValue)
      .fill(startValue, startValue, endValue)
      .map((v, i) => i + step);
  },
  formatDate(service: any, data: FormatDate): string {
    if (!data.date) {
      return '';
    }
    const {
      date,
      format = 'MMMM DD, YYYY hh:mm a',
      toLocal,
      options = { year: 'numeric', month: 'long', day: 'numeric' },
    } = data;
    moment.locale(service.currentLang);
    let newDate = date;
    if (typeof newDate === 'string') {
      newDate = new Date(newDate);
    }
    const timeZone = new Date().getTimezoneOffset() / -60;
    // If currentLang is ko
    if (service.currentLang === 'ko') {
      if (toLocal) {
        newDate.setHours(newDate.getHours() + timeZone);
      }
      return newDate.toLocaleDateString(service.currentLang, options);
    }
    // Others
    if (toLocal) {
      return moment(newDate).add(timeZone, 'hours').format(format);
    }
    return moment(newDate).format(format);
  },
  millisToMinutesAndSeconds(millis: number, isShowSecond: boolean = false) {
    var minutes = Math.floor(millis / 60000);
    var seconds = parseFloat(((millis % 60000) / 1000).toFixed(0));
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    return isShowSecond
      ? minutes + ' mins ' + (seconds < 10 ? '0' : '') + seconds + ' sec'
      : minutes + ' mins';
  },
  replaceAll(text: string, oldText: string, newText: string) {
    return String(text).replace(new RegExp(oldText, 'g'), newText);
  },
};

export default AppUtil;
