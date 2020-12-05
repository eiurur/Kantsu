import $ from 'jquery';
import sanitizer from 'sanitizer';

import Button from './Button';

export default class ListButton extends Button {
  constructor(html) {
    super(html);
  }

  create(movie) {
    let cleanLinks = null;
    let movieNum = null;
    let html = '';
    // 検出できない埋め込みリンクは
    if (movie.links.length === 0) {
      cleanLinks = sanitizer.sanitize(movie.url);
      movieNum = 1;
      html = `
        <div style="color:white;">
          <a style="margin:.5rem 0;" class="btn btn-lg btn-info open-with-eh" data-links="${cleanLinks}">
          子サイトを直接開く ( ${movieNum}枚 )
          </a>
        </div>
      `;
    } else {
      const linksJoined = movie.links.map((link) => link.href).join(',');
      cleanLinks = sanitizer.sanitize(linksJoined);
      movieNum = movie.links.length;
      html = `
      <div style="color:white;">
          <a style="margin:.5rem 0;"  class="btn btn-lg btn-success open-with-eh" data-links="${cleanLinks}">
            動画ページを直接開く ( ${movieNum}枚 )
          </a>
        </div>
      `;
    }
    // リンクの数を数えてボタンを生成。
    this.html = html;
  }

  onClick(selector) {
    // FIXME: 無駄
    this.offClick(selector);

    // ボタンにイベントを登録(clickで新規タブを生成)
    $(selector).on('click', function (event) {
      $(this)
        .data('links')
        .split(',')
        .map((link) => window.open(link));
    });
  }

  offClick(selector) {
    $(selector).off('click');
  }
}
