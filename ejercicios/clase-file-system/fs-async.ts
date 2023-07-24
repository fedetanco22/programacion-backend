const fsys = require('fs');

let today = new Date().toString();
const fsAsync = async () => {
    await fsys.promises.writeFile('dateAsync.txt', today, (err: any) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    let resultado = await fsys.promises.readFile('dateAsync.txt', 'utf8', (err: any, data: any) => {
        if (err) throw err;
    });

    console.log(resultado);
};

fsAsync();
