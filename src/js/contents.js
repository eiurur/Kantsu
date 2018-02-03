import 'babel-polyfill';
import $ from 'jquery';
import OpenButtonMaker from './lib/OpenButtonMaker';

const sleep = (ms = 1000) =>
  new Promise(resolve => setTimeout(() => resolve(), ms));

const showMain = () => {
  const eroteresPagetUrl = location.href;
  new OpenButtonMaker().main(eroteresPagetUrl);
};

const showList = () => {
  const eroterestPageUrls = $('.itemWrapper .itemTitle a')
    .map(function(i, el) {
      return $(this).attr('href');
    })
    .get();
  new OpenButtonMaker().list(eroterestPageUrls);
};

(async () => {
  const inMainPage = location.href.includes(
    'https://movie.eroterest.net/page/',
  );
  if (inMainPage) {
    showMain();
    await sleep(500); //  類似動画の表示がワンテンポ遅いので待つ
    showList();
  } else {
    showList();
  }
})();
