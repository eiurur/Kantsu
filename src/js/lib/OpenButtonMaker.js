import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';
import MainButton from './MainButton';
import ListButton from './ListButton';

const isProduction = chrome.runtime.id === 'knagjpmiabllamnchkhehmajdnlnamoe';
const RELAY_SERVER_URL = isProduction
  ? 'https://kantsu.now.sh'
  : 'https://localhost:5003';
const API_VERSION = 'v1';
const END_POINT = `${RELAY_SERVER_URL}/${API_VERSION}`;

export default class OpenButtonMaker {
  constructor() {}

  // htmlに動画サイトのURLがないか探索
  async search(url) {
    console.log(END_POINT);
    return await axios.post(
      `${END_POINT}/eroterest/movies`,
      { url },
      {
        timeout: 60 * 1000,
      },
    );
  }

  // 個別画面(メイン)の動画
  async main(eroterestPageUrl) {
    const response = await this.search(eroterestPageUrl);
    const button = new MainButton();
    button.create(response.data.movie);
    button.render('.gotoBlog');
    button.onClick('.open-with-eh');
  }

  // 一覧画面の動画
  async list(eroterestPageUrl) {
    const response = await this.search(eroterestPageUrl);
    const button = new ListButton();
    button.create(response.data.movie);
    button.render(
      $(`.itemTitle a[href="${eroterestPageUrl}"]`).closest('.item'),
    );
    button.onClick('.open-with-eh');
  }
}
