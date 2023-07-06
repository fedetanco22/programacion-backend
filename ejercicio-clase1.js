var Book = /** @class */ (function () {
    function Book(bookObj) {
        this.name = bookObj.name;
        this.author = bookObj.author;
    }
    return Book;
}());
var User = /** @class */ (function () {
    function User(userObj) {
        this.name = userObj.name;
        this.last_name = userObj.last_name;
        this.books = userObj.books.map(function (book) { return new Book(book); });
        this.pets = userObj.pets;
    }
    User.prototype.getFullName = function () {
        console.log("Usuario:\n  ".concat(this.name, " ").concat(this.last_name));
    };
    User.prototype.addPet = function (pet) {
        this.pets.push(pet);
    };
    User.prototype.countPet = function () {
        console.log("Cantidad de mascotas:\n  ".concat(this.pets.length));
    };
    User.prototype.addBook = function (book, author) {
        this.books.push(new Book({ name: book, author: author }));
    };
    User.prototype.getBooksName = function () {
        console.log('Libros:');
        this.books.forEach(function (book) { return console.log("- ".concat(book.name, " by ").concat(book.author)); });
    };
    return User;
}());
var user = new User({
    name: 'Juan',
    last_name: 'Perez',
    pets: ['perro', 'gato', 'pajarito'],
    books: [
        {
            name: 'El señor de las moscas',
            author: 'William Golding',
        },
        {
            name: 'Fundacion',
            author: 'Isaac Asimov',
        },
    ],
});
user.addBook('El arte de la guerra', 'Sun Tzu');
user.getFullName();
user.getBooksName();
user.countPet();
