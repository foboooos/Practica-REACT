export class Articulo {
  constructor(nombre, cantidad, id, comprado) {
    this.nombre = nombre
    this.cantidad = cantidad
    this.id = id
    this.comprado = comprado
  }

  describir() {
    return `${this.id}. ${this.nombre}: ${this.cantidad}`
  }
}
