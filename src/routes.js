const {
  addBookshelfHandler, getAllBookshelfHandler, getByIdBookshelfHandler, updateByIdBookshelfHandler, deleteByIdBookshelfHandler,
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
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBookshelfHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateByIdBookshelfHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteByIdBookshelfHandler,
  },
];

module.exports = routes;
