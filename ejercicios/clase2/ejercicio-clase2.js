// Consigna:
// - Realizar una lista nueva  (array) que contenga todos los tipos de productos (no cantidades),
// consejo: utilizar Object.keys y Array.includes. Mostrar el array por consola.
// - Posteriormente, obtener el total de productos vendidos por todos los objetos (utilizar Object.values)
var objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2,
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 2,
    },
];
var tiposProductos = [];
objetos.forEach(function (objeto) {
    Object.keys(objeto).forEach(function (producto) {
        if (!tiposProductos.includes(producto)) {
            tiposProductos.push(producto);
        }
    });
});
console.log(tiposProductos);
var totalProductosVendidos = Object.values(objetos.reduce(function (acc, obj) {
    for (var producto in obj) {
        if (acc[producto]) {
            acc[producto] += obj[producto];
        }
        else {
            acc[producto] = obj[producto];
        }
    }
    return acc;
}, {}));
console.log(totalProductosVendidos);
