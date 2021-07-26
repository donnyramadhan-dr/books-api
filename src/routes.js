const {
  addBookshelfHandler, getAllBookshelfHandler,
} = require('./handlers');

const routes = [{
    method: 'POST',
    path: '/books',
    handler: addBookshelfHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshelfHandler,
  },
];

module.exports = routes;
