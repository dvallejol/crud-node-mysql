class Producto {
    constructor(id, nombre, precio, stock = 0, lote = null, fechaVencimiento = null) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.lote = lote;
        this.fechaVencimiento = fechaVencimiento;
    }

    // Regla de negocio: verificar si hay inventario disponible
    tieneStockSuficiente(cantidad) {
        return this.stock >= cantidad;
    }
}

module.exports = Producto;