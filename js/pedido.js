// pedido.js : carrito "Mi pedido". Se carga en todas las paginas para mantener el contador del menu;
// la lista y los botones solo existen en pedido.html. El pedido es { idProducto: cantidad } y se guarda
// en localStorage, asi sobrevive al cambiar de pagina. No hay pagos: el total es de referencia.
const CLAVE_PEDIDO = "dinoaventura_pedido";
let pedido = cargarPedido();
function cargarPedido() { try { return JSON.parse(localStorage.getItem(CLAVE_PEDIDO)) || {}; } catch { return {}; } }
function guardarPedido() { try { localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido)); } catch { /* sin almacenamiento */ } }

function cambiarCantidad(id, delta) {                      // +1 / -1; al llegar a 0 sale del pedido (maximo 20)
  const nueva = (Number(pedido[id]) || 0) + delta;
  if (nueva <= 0) delete pedido[id]; else pedido[id] = Math.min(nueva, 20);
  guardarPedido();
  dibujarPedido();
}

function dibujarPedido() {
  const items = PRODUCTOS.filter((p) => pedido[p.id] > 0);  // ignora ids que ya no existan
  const total = items.reduce((s, p) => s + p.precio * pedido[p.id], 0);
  $("#contadorPedido").textContent = items.reduce((s, p) => s + pedido[p.id], 0);
  if (!$("#listaPedido")) return;                           // fuera de pedido.html solo se actualiza el contador
  $("#pedidoVacio").hidden = items.length > 0;
  $("#totalPedido").hidden = $("#accionesPedido").hidden = items.length === 0;
  $("#listaPedido").innerHTML = items.map((p) => `
    <li>
      <span>${p.nombre}</span>
      <span class="cantidad">
        <button type="button" data-menos="${p.id}" aria-label="Quitar uno de ${p.nombre}">-</button>
        <b>${pedido[p.id]}</b>
        <button type="button" data-mas="${p.id}" aria-label="Agregar uno de ${p.nombre}">+</button>
      </span>
      <span>${formatoPrecio.format(p.precio * pedido[p.id])}</span>
    </li>`).join("");
  $("#totalPedido").textContent = `Total de referencia: ${formatoPrecio.format(total)}`;
  const lineas = items.map((p) => `- ${pedido[p.id]} x ${p.nombre} (${formatoPrecio.format(p.precio * pedido[p.id])})`).join("\n");
  $("#enviarPedido").href = enlaceWhatsApp(`Hola, quiero hacer este pedido:\n${lineas}\nTotal de referencia: ${formatoPrecio.format(total)}\n¿Me confirman disponibilidad y fecha?`);
}

if ($("#listaProductos")) {                                // clic en "Agregar al pedido" (catalogo)
  $("#listaProductos").addEventListener("click", (e) => {
    const b = e.target.closest("[data-agregar]");
    if (!b) return;
    cambiarCantidad(Number(b.dataset.agregar), 1);
    b.textContent = "¡Agregado!";
    setTimeout(() => { b.textContent = "Agregar al pedido"; }, 1200);
  });
}
if ($("#listaPedido")) {                                   // botones + y - y vaciar (pedido.html)
  $("#listaPedido").addEventListener("click", (e) => {
    const mas = e.target.closest("[data-mas]"), menos = e.target.closest("[data-menos]");
    if (mas) cambiarCantidad(Number(mas.dataset.mas), 1);
    if (menos) cambiarCantidad(Number(menos.dataset.menos), -1);
  });
  $("#vaciarPedido").addEventListener("click", () => { pedido = {}; guardarPedido(); dibujarPedido(); });
}
dibujarPedido();
