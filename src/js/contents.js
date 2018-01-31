import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';
import MainButton from './lib/MainButton';
import ListButton from './lib/ListButton';

const RELAY_SERVER_URL = 'https://eroterest-helper-yccuzjlnug.now.sh';
const API_VERSION = 'v1';
const END_POINT = `${RELAY_SERVER_URL}/${API_VERSION}`;

(async () => {
  const sleep = (ms = 1000) =>
    new Promise(resolve => setTimeout(() => resolve(), ms));

  // htmlに動画サイトのURLがないか探索
  const search = async url => {
    return await axios.get(`${END_POINT}/eroterest/movies`, {
      params: { url },
    });
  };

  // 個別画面(メイン)の動画
  const main = async url => {
    const response = await search(url);
    const button = new MainButton();
    button.create(response.data.movie.links);
    button.render('.gotoBlog');
    button.onClick('.open-with-eh');
  };

  // 一覧画面の動画
  const list = async url => {
    const response = await search(url);
    const button = new ListButton();
    button.create(response.data.movie.links);
    button.render($(`.itemTitle a[href="${url}"]`).closest('.goodSiteItem'));
    button.onClick('.open-with-eh');
  };

  // ここから
  const mainUrl = $('.gotoBlog a').attr('href');
  main(mainUrl);

  // 類似動画
  const suggestedUrls = $('.goodSiteItem .itemTitle a')
    .map(function(i, el) {
      return $(this).attr('href');
    })
    .get();
  suggestedUrls.forEach(async (url, index) => {
    await sleep(300 * index);
    console.log('Go => ', url);
    list(url);
  });
})();
