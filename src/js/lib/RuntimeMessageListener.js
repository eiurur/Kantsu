import 'babel-polyfill';
import $ from 'jquery';
import axios from 'axios';

const isProduction = false;
const RELAY_SERVER_URL = isProduction
  ? 'https://kantsu.now.sh'
  : 'https://127.0.0.1:5003';
const API_VERSION = 'v1';
const END_POINT = `${RELAY_SERVER_URL}/${API_VERSION}`;

export default class RuntimeMessageListener {
  constructor() {
    return this;
  }

  // htmlに動画サイトのURLがないか探索
  async search({ url }) {
    console.log(END_POINT);
    return await axios.post(
      `${END_POINT}/eroterest/movies`,
      { url },
      {
        timeout: 60 * 1000,
      },
    );
  }

  activate() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('onMessage request = ', request);
      if (request.func) {
        this[request.func](request).then((result) => sendResponse(result));
        return true; // Will respond asynchronously.
      }

      return sendResponse(`ok`);
    });
  }
}
