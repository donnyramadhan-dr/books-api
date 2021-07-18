const nanoid = require('nanoid');
const bookshelf = require('./bookshelf');

const addBookshelfHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertAt = new Date().toISOString();
  const updateAt = insertAt;
  const finished = pageCount === readPage;

  const newBookshelf = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertAt,
    updateAt,
    finished,
  };
  bookshelf.push(newBookshelf);

  const isSuccsess = bookshelf.filter((book) => book.id === id).length > 0;
  if (isSuccsess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  if (name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahlan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllBookshelfHandler = () => ({
  status: 'success',
  data: {
    bookshelf,
  },
});

module.exports = {
  addBookshelfHandler,
  getAllBookshelfHandler,
};