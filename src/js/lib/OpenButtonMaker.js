import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';
import MainButton from './MainButton';
import ListButton from './ListButton';

const RELAY_SERVER_URL = 'https://eroterest-helper.now.sh';
const API_VERSION = 'v1';
const END_POINT = `${RELAY_SERVER_URL}/${API_VERSION}`;

export default class OpenButtonMaker {
  constructor() {}

  // htmlに動画サイトのURLがないか探索
  async search(url) {
    return await axios.get(`${END_POINT}/eroterest/movies`, {
      params: { url },
    });
  }

  // 個別画面(メイン)の動画
  async main(url) {
    const response = await this.search(url);
    const button = new MainButton();
    button.create(response.data.movie.links);
    button.render('.gotoBlog');
    button.onClick('.open-with-eh');
  }

  // 一覧画面の動画
  async list(url) {
    const response = await this.search(url);
    const button = new ListButton();
    button.create(response.data.movie.links);
    button.render($(`.itemTitle a[href="${url}"]`).closest('.goodSiteItem'));
    button.onClick('.open-with-eh');
  }
}
