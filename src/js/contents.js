import 'babel-polyfill';
import queryString from 'query-string';
import $ from 'jquery';
import axios from 'axios';

const RELAY_SERVER_URL = 'https://eroterest-helper-defyyhqlgb.now.sh';
const API_VERSION = 'v1';
const END_POINT = `${RELAY_SERVER_URL}/${API_VERSION}`;

(async () => {
  const openTab = link => {
    window.open(link);
  };

  console.log('contents');

  // メイン動画
  const mainUrl = document.querySelector('.gotoBlog a').getAttribute('href');

  // 類似動画
  const suggestedUrls = Array.from(
    document.querySelectorAll('.goodSiteItem .itemTitle a'),
  ).map(a => a.getAttribute('href'));

  console.log(mainUrl);
  console.log(suggestedUrls);

  // htmlに動画サイトのURLがないか探索
  const response = await axios.get(`${END_POINT}/eroterest/movies`, {
    params: { url: mainUrl },
  });

  // リンクの数を数えてボタンを生成。
  const buttonHtml = `
  <div style="padding:1rem 0;">
    <a class="btn btn-lg btn-success btn-block open-with-eh" data-links="${response.data.movie.links
      .map(link => link.href)
      .join(',')}">
      動画ページを直接開く ( ${response.data.movie.links.length}枚 )
    </a>
  </div>
  `;

  // ボタンのhtmlを挿入
  // document
  //   .querySelector('.gotoBlog')
  //   .insertAdjacentHTML('beforeend', buttonHtml);
  $('.gotoBlog').append(buttonHtml);

  // ボタンにイベントを登録(clickで新規タブを生成)
  // document
  //   .querySelector('.open-with-eh')
  //   .addEventListener('click', openTab, false);
  $('.open-with-eh').on('click', function(event) {
    const links = $(this)
      .data('links')
      .split(',');
    links.map(link => openTab(link));
  });
})();
