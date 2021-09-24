function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc += 1;
    return acc;
  }, 0);
}

function _objectSortedValues(obj) {
  const keys = Object.keys(obj);
  
  keys.sort((keyA, keyB) => obj[keyB] - obj[keyA]);
  
  return keys
}

function getMostCommonGenres(books) {
  let count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sortedGenres = _objectSortedValues(count);
  return sortedGenres
    .map((name) => ({
      name,
      count: count[name],
    }))
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, book) => {
    acc[book.id] = book.borrows.length;
    return acc;
  }, {});
  const keys = Object.keys(groupById);
  let sorted = keys.sort((keyA, keyB) => {
    if (groupById[keyA] > groupById[keyB]) {
      return -1;
    } else if (groupById[keyB] > groupById[keyA]) {
      return 1;
    }
    return 0;
  });
  let newArr = sorted.map((id) => {
    let book = books.find((book) => book.id === id);
    let count = groupById[id];
    return { name: book.title, count: count };
  });
  return newArr.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  
  //iterate books to look at "authorId, borrows" to count 
    // push authorId w/ borrows.length
  const count = books.reduce((acc, {authorId, borrows}) => {
      if(acc[authorId]){
        acc[authorId].push(borrows.length)
      } else {
        acc[authorId] = [borrows.length]
      }
      return acc;
  }, {})
  
  //iterate over "count var"
  for (let id in count) {
    //add up up sum of author[id]
   const sum = count[id].reduce((aaa, bbb) => aaa +bbb);
    count[id] = sum
 }
   
 // sort obj
  const sorted = _objectSortedValues(count) 
  
 //iterate sorted obj and build out obj 
 return sorted.map(currentId => {
   let  currentAuthor =  authors.find((author) => author.id == currentId)  
  let authorName= `${currentAuthor.name.first} ${currentAuthor.name.last}`
  return {name: authorName,  count: count[currentId]};
   })
  
 //display first five 
 .slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
