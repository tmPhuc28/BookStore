import { environment } from '../../environments/environment';

const AppConstant = Object.freeze({
  DEFAULT_URLS: {
    API: `${environment.backend_url}/api`,
  },
  PATTERNS: {
    EMAIL:
      /^(([^<>()?\[\]\.,;:\s@\"]+(\.[^<>()?\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()?[\]\.,;:\s@\"]+\.)+[^<>()?[\]\.,;:\s@\"]{2,})$/,
    USERNAME: /^[a-zA-Z0-9_@.]*$/,
    NO_SP_CHAR: '[^<>{}]*',
    PHONE: /^[0-9-]*$/,
    POSITIVE_NUMBER: /^[+]?([.]\d+|\d+[.]?\d*)$/,
    ALLOWED_INPUT: /^[0-9a-zA-Z._%+-@]*$/,
    SCRIPT_PATTERN: /^((?!<|>|{|\})[\s\S])*?$/,
    COLOR_PATTERN: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    COLOR_RGB_PATTERN: /^RGB\(\s*(?:(\d{1,3})\s*,?){3}\)$/,
    SPECIAL_CHARS_NOT_ALLOW_RENAME:
      /^((?!\\|\/|:|\*|\?|"|<|>|\||\{|})[\s\S])*?$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[0-9]).{8,}$/, // at least 8 characters, including numbers and characters
    AT_LEAST_ONE_LOWER_CHARACTER: /^(?=.*[a-z]).+$/,
    AT_LEAST_ONE_UPPERCASE_CHARACTER: /^(?=.*[A-Z]).+$/,
    AT_LEAST_ONE_NUMBER_CHARACTER: /^(?=.*\d).+$/,
    AT_LEAST_ONE_SPECIAL_CHARACTER: /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g,
  },
  FORMAT_DATE: {
    MOMENT_LONG_DATE: 'MM/DD/YYYY HH:mm:ss',
    MOMENT_SHORT_DATE: 'MM/DD/YYYY',
    MOMENT_SHORT_TIME: 'HH:mm',
  },
  STORAGE_KEYS: {
    SESSION: 'stk',
    REDIRECT_URL: 'redirect_url',
  },
});

export default AppConstant;
