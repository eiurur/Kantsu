import 'babel-polyfill';
import OpenButtonMaker from './OpenButtonMaker';

module.exports = class KantsuButton {
  constructor({ url, type }) {
    this.url = url;
    this.type = type;
  }
  show() {
    return new OpenButtonMaker()[this.type](this.url);
  }
};
