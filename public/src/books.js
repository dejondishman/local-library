const findAuthorById = (authors, id) =>
  authors.find((author) => author.id === id);

const findBookById = (books, id) => books.find((book) => book.id == id);

function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if (recent.returned) returned.push(book);
      else borrowed.push(books);
      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  // loop over accounts to pull out ids
  const idsByAccount = accounts.reduce((acc, account) => {
    acc[account.id] = account; //here the acc is given an key of account.id. so the acc object w ith key account.id is set to account
    return acc;
  }, {});
  // look at borrows to match account ids
  return book.borrows
    .map(({ id, returned }) => ({
      ...idsByAccount[id],
      returned,
    }))
    .slice(0, 10);

  //return the first ten
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
