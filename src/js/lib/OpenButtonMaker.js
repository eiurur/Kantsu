import 'babel-polyfill';
import $ from 'jquery';
import MainButton from './MainButton';
import ListButton from './ListButton';

export default class OpenButtonMaker {
  constructor() {}

  // htmlに動画サイトのURLがないか探索
  search(url) {
    return new Promise(resolve => {
      chrome.runtime.sendMessage(
        {
          func: 'search',
          url: url,
        },
        data => {
          return resolve(data);
        },
      );
    });
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
