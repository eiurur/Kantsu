import $ from 'jquery';

export default class Button {
  constructor(html) {
    this.html = html;
  }

  create(links) {
    throw new Error('must extend');
  }

  onClick() {
    throw new Error('must extend');
  }

  render(selector) {
    $(selector).append(this.html);
  }
}
