// Actividad:
// 1. Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual.
//     Posteriormente leer el archivo y mostrar el contenido por consola.
// 2. Utilizar el módulo fs y sus operaciones de tipo callback.
var fs = require('fs');
var date = new Date();
var dateStr = date.toString();
fs.writeFile('date.txt', dateStr, function (err) {
    if (err)
        throw err;
    console.log('The file has been saved!');
    fs.readFile('date.txt', 'utf8', function (err, data) {
        if (err)
            throw err;
        console.log(data);
    });
});
