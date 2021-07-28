const books = require('./books');
const {
  nanoid,
} = require('nanoid');

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
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage) ? true : false;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  }

  books.push(newBooks);

  const isSuccess = books.filter((data) => data.id === id).length > 0;

  if (isSuccess) {
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

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookshelfHandler = (request, h) => {
  const {
    name,
    reading,
    finished,
  } = request.query;

  if (name) {
    const searchName = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: searchName.map((book) = ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    response.code(200);
    return response;
  } else if (reading) {
    if (reading === 0) {
      const searchRead = books.filter((book) => book.reading === false)
      const response = h.response({
        status: 'success',
        data: {
          books: searchRead.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    } else {
      const searchRead = books.filter((book) => book.reading === true);
      const response = h.response({
        status: 'success',
        data: {
          books: searchRead.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      });
      response.code(200);
      return response;
    }
  } else if (finished) {
    const searchFinish = books.filter((book) => Number(book.finished) === Number(finished))
    const response = h.response({
      status: 'success',
      data: {
        books: searchFinish.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

const getByIdBookshelfHandler = (request, h) => {
  const {
    bookId,
  } = request.params;

  const book = books.filter((data) => data.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateByIdBookshelfHandler = (request, h) => {
  const {
    bookId,
  } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
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

    const updatedAt = new Date().toISOString();
    const finished = (pageCount === readPage) ? true : false;

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response
    } else if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      author,
      summary,
      publisher,
      year,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteByIdBookshelfHandler = (request, h) => {
  const {
    bookId,
  } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus, Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookshelfHandler,
  getAllBookshelfHandler,
  getByIdBookshelfHandler,
  updateByIdBookshelfHandler,
  deleteByIdBookshelfHandler,
};