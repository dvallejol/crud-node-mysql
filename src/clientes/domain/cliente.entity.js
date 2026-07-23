class Cliente {
    constructor(id, identificacion, nombre, telefono = null, direccion = null, limiteCredito = 0.00) {
        this.id = id;
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.limiteCredito = limiteCredito;
    }
}

module.exports = Cliente;