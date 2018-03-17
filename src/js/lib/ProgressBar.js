module.exports = class ProgressBar {
  constructor(total, bar) {
    this.total = total;
    this.bar = bar;
    this.status = 0;
    this.MAX = 100;
  }

  inc() {
    this.status += this.MAX / this.total;
    this.go();
  }

  finish() {
    this.status = this.MAX;
    this.go();
  }

  go() {
    this.bar.go(this.status);
  }
};
