/* eslint-disable require-jsdoc */
class FilterQery {
  constructor(bookshelf, value, type) {
    this.bookshelf = bookshelf;
    this.value = value;
    this.result = [];

    switch (type) {
      case 'name':
        this.filterByName()
        break;

      case 'reading':
        this.filterByReading()
        break;

      case 'finished':
        this.filterByFinished()
        break;
    }
  }

  filterByName() {
    this.result = this.bookshelf.filter((book) => book.name.includes(this.value))
  }

  filterByReading() {
    this.result = this.bookshelf.filter((book) => book.reading(this.value))
  }

  filterByFinished() {
    this.result = this.bookshelf.filter((book) => book.finished(this.value))
  }
}

module.exports = FilterQery;