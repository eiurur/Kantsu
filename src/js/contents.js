import 'babel-polyfill';
import $ from 'jquery';
import OpenButtonMaker from './lib/OpenButtonMaker';

(async () => {
  const sleep = (ms = 1000) =>
    new Promise(resolve => setTimeout(() => resolve(), ms));

  // メイン動画
  const mainUrl = $('.gotoBlog a').attr('href');
  new OpenButtonMaker().main(mainUrl);

  // 類似動画
  const suggestedUrls = $('.item .itemTitle a')
    .map(function(i, el) {
      return $(this).attr('href');
    })
    .get();
  suggestedUrls.forEach(async (url, index) => {
    await sleep(300 * index);
    new OpenButtonMaker().list(url);
  });
})();
