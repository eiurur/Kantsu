import $ from 'jquery';

import Button from './Button';

export default class MainButton extends Button {
  constructor(html) {
    super(html);
  }

  create(movie) {
    let linksJoined = null;
    let movieNum = null;
    // 検出できない埋め込みリンクは
    if (movie.links.length === 0) {
      linksJoined = movie.url;
      movieNum = 1;
    } else {
      linksJoined = movie.links.map(link => link.href).join(',');
      movieNum = movie.links.length;
    }
    // リンクの数を数えてボタンを生成。
    this.html = `
      <div style="padding:1rem 0;">
        <a class="btn btn-lg btn-success btn-block open-with-eh" data-links="${linksJoined}">
          動画ページを直接開く ( ${movieNum}枚 )
        </a>
      </div>
    `;
  }

  onClick(selector) {
    // FIXME; 無駄
    this.offClick(selector);

    // ボタンにイベントを登録(clickで新規タブを生成)
    $(selector).on('click', function(event) {
      $(this)
        .data('links')
        .split(',')
        .map(link => window.open(link));
    });
  }

  offClick(selector) {
    $(selector).off('click');
  }
}
