import 'babel-polyfill';
import OpenButtonMaker from './OpenButtonMaker';

export default class KantsuButton {
  constructor({ url, type }) {
    this.url = url;
    this.type = type;
  }
  show() {
    return new OpenButtonMaker()[this.type](this.url);
  }
}
