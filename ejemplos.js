const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const mostrarLista = () => {
    if (list.length > 0) {
        console.log(list);
    } else {
        console.log('No hay elementos en la lista');
    }
};

class Contador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cuentaIndividual = 0;
    }

    static cuentaGlobal = 0;

    obtenerResponsable() {
        return this.nombre;
    }
    obtenerCuentaIndividual() {
        return this.cuentaIndividual;
    }
    obtenerCuentaGlobal() {
        return Contador.cuentaGlobal;
    }
    contar() {
        Contador.cuentaGlobal++;
        this.cuentaIndividual++;
    }
}

const contador1 = new Contador('Contador 1');
const contador2 = new Contador('Contador 2');
contador1.contar();
contador1.contar();
contador1.contar();

contador2.contar();
contador2.contar();
contador2.contar();
contador2.contar();
contador2.contar();
contador2.contar();

console.log(contador1.obtenerResponsable());
console.log(contador2.obtenerResponsable());
console.log(Contador.cuentaGlobal);
console.log(contador1.obtenerCuentaIndividual());
console.log(contador2.obtenerCuentaIndividual());

