import 'babel-polyfill';
import $ from 'jquery';
import Nanobar from 'nanobar';
import ProgressBar from './lib/ProgressBar';
import KantsuButton from './lib/KantsuButton';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchMain = () => {
  const eroterestPageUrl = location.href;
  return [new KantsuButton({ url: eroterestPageUrl, type: 'main' })];
};

const fetchList = () => {
  return $('.itemWrapper .itemTitle a')
    .map(function (i, el) {
      return $(this).attr('href');
    })
    .get()
    .map(
      (eroterestPageUrl) =>
        new KantsuButton({ url: eroterestPageUrl, type: 'list' })
    );
};

const fetchGoButtons = async () => {
  const inMainPage = location.href.includes(
    'https://movie.eroterest.net/page/'
  );

  if (inMainPage) {
    await sleep(500);
    return [...fetchMain(), ...fetchList()];
  } else {
    return [...fetchList()];
  }
};

(async () => {
  const goButtons = await fetchGoButtons();
  const progressBar = new ProgressBar(goButtons.length, new Nanobar());
  await Promise.all(
    goButtons.map(async (button, index) => {
      try {
        await sleep(index * 100);
        await button.show();
        progressBar.inc();
      } catch (err) {}
    })
  );
  progressBar.finish();
})();
