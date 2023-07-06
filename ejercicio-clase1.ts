class Book {
    name: string;
    author: string;

    constructor(bookObj: { name: string; author: string }) {
        this.name = bookObj.name;
        this.author = bookObj.author;
    }
}

class User {
    name: string;
    last_name: string;
    books: Book[];
    pets: string[];

    constructor(userObj: {
        name: string;
        last_name: string;
        books: { name: string; author: string }[];
        pets: string[];
    }) {
        this.name = userObj.name;
        this.last_name = userObj.last_name;
        this.books = userObj.books.map((book) => new Book(book));
        this.pets = userObj.pets;
    }

    getFullName() {
        console.log(`Usuario:\n  ${this.name} ${this.last_name}`);
    }

    addPet(pet: string) {
        this.pets.push(pet);
    }

    countPet() {
        console.log(`Cantidad de mascotas:\n  ${this.pets.length}`);
    }

    addBook(book: string, author: string) {
        this.books.push(new Book({ name: book, author: author }));
    }

    getBooksName() {
        console.log('Libros:');
        this.books.forEach((book) => console.log(`- ${book.name} by ${book.author}`));
    }
}

const user = new User({
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

