import $ from 'jquery';

import Button from './Button';

export default class MainButton extends Button {
  constructor(html) {
    super(html);
  }

  create(links) {
    // リンクの数を数えてボタンを生成。
    this.html = `
      <div style="padding:1rem 0;">
        <a class="btn btn-lg btn-success btn-block open-with-eh" data-links="${links
          .map(link => link.href)
          .join(',')}">
          動画ページを直接開く ( ${links.length}枚 )
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
