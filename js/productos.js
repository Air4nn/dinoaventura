// productos.js : catalogo. Cada paquete es un objeto. categoria: "cumpleaños", "baby shower" o "temática".
// imagen: ruta de la foto del paquete (ej. "img/productos/dino-basico.jpg"). Si se deja vacia, se muestra el logo.
const PRODUCTOS = [
  { id: 1, nombre: "Dino básico", categoria: "cumpleaños", descripcion: "Arco de globos, mesa principal y centros de mesa.", precio: 250000, imagen: "img/productos/dinobasico.webp" },
  { id: 2, nombre: "Dino aventura", categoria: "cumpleaños", descripcion: "Todo lo básico más fondo temático y mesa de dulces.", precio: 450000, imagen: "img/productos/dinoaventuras.webp" },
  { id: 3, nombre: "Dino premium", categoria: "cumpleaños", descripcion: "Ambientación completa con dinosaurios gigantes y luces.", precio: 750000, imagen: "img/productos/dinopremium.webp" },
  { id: 4, nombre: "Baby shower selva", categoria: "baby shower", descripcion: "Decoración suave con animales y follaje.", precio: 300000, imagen: "img/productos/babyshowerselva.webp" },
  { id: 5, nombre: "Baby shower huevito", categoria: "baby shower", descripcion: "Temática de dinosaurio bebé que sale del huevo.", precio: 280000, imagen: "img/productos/babyshowerhuevito.webp" },
  { id: 6, nombre: "Arco de globos temático", categoria: "temática", descripcion: "Arco personalizado con la temática que elijas.", precio: 180000, imagen: "img/productos/arcoglobos.webp" }
];
