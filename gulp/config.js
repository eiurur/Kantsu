const path = require('path');
const src = './src';
const dest = './build';
const relativeSrcPath = path.relative('.', src);

module.exports = {
  // 出力先の指定
  dest,

  images: {
    src: src + '/images/**',
    dest: dest + '/images/',
  },

  sass: {
    src: [src + '/sass/**/*.scss'],
    dest: dest + '/css/',
  },

  clean: {
    target: './build',
  },

  watch: {
    images: relativeSrcPath + '/images/**',
    sass: relativeSrcPath + '/sass/**/*.scss',
  },
};
