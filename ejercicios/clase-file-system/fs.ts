// Actividad:

// 1. Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual.
//     Posteriormente leer el archivo y mostrar el contenido por consola.
// 2. Utilizar el módulo fileSystem y sus operaciones de tipo callback.
const fileSystem = require('fs');

const date = new Date();
const dateStr = date.toString();

fileSystem.writeFile('date.txt', dateStr, (err: any) => {
    if (err) throw err;
    console.log('The file has been saved!');

    fileSystem.readFile('date.txt', 'utf8', (err: any, data: any) => {
        if (err) throw err;
        console.log(data);
    });
});

