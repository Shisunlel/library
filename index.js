const addNewButton = document.querySelector("#add-new-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form");
const bookContainer = document.querySelector("main");
let exist = false;
let i = 0;

window.onload = resetForm;

let myLibrary = [];

function Book(title, author, pageNumber, hasRead) {
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.hasRead = hasRead;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pageNumber} pages, ${this.hasRead}`;
  };
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pageNumber = document.querySelector("#pageNumber").value;
  const hasRead = document.querySelector("#hasRead").checked;
  myLibrary.forEach((e) => {
    if (e.title.includes(title)) return (exist = true);
  });
  if (!exist) {
    myLibrary.push(new Book(title, author, pageNumber, hasRead));
    addToView();
  } else {
    alert("Cannot add duplicate");
  }
}

function addToView() {
  bookContainer.innerHTML = "";
  myLibrary.forEach((e) => {
    const card = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h4");
    const pageNumber = document.createElement("h5");
    const bookAction = document.createElement("div");
    const hasReadToggler = document.createElement("button");
    const removeButton = document.createElement("button");

    card.className = "book-content";
    card.dataset.index = i++;
    title.className = "book-title";
    author.className = "book-author";
    pageNumber.className = "book-page-number";
    bookAction.className = "book-action";
    hasReadToggler.className = "has-read-toggler";
    removeButton.className = "remove-book";
    
    title.innerText = e.title;
    author.innerText = e.author;
    pageNumber.innerText = e.pageNumber + " pages";
    removeButton.innerText = "Remove";

    hasReadToggler.addEventListener("click", hasReadToggle);
    removeButton.addEventListener("click", removeBook);

    e.hasRead
      ? (hasReadToggler.innerText = "Has Read")
      : (hasReadToggler.innerText = "Has Not Read");
    e.hasRead
      ? hasReadToggler.classList.remove("has-not")
      : hasReadToggler.classList.add("has-not");


    bookAction.append(hasReadToggler, removeButton);
    card.append(title, author, pageNumber, bookAction);
    bookContainer.append(card);
  });
}

function showPopup() {
  popup.classList.add("show");
  closeButton.classList.add("show");
}

function hidePopup() {
  popup.classList.remove("show");
  closeButton.classList.remove("show");
}

function resetForm() {
  form.reset();
  i = 0;
}

function hasReadToggle() {
  this.classList.toggle("has-not");
  this.innerText === "Has Not Read"
    ? (this.innerText = "Has Read")
    : (this.innerText = "Has Not Read");
  const thisBook = myLibrary[this.parentNode.parentNode.dataset.index];
  this.innerText === "Has Not Read" ? thisBook.hasRead = false : thisBook.hasRead = true;
}

function removeBook() {
  myLibrary = myLibrary.filter((e) => !e.title);
  this.parentNode.parentNode.remove();
}

addNewButton.addEventListener("click", showPopup);
closeButton.addEventListener("click", () => {
  hidePopup();
  resetForm();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  hidePopup();
  resetForm();
});

// Book.prototype.print = function(){
//     return this.title
// }

// const book = new Book('The Hobbit', 'J.R.R Tolkien', '295', 'not read yet')
// console.info(book.info())
