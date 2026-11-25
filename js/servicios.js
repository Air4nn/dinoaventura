// servicios.js : pagina de servicios hecha con React (sin JSX ni compilador: React.createElement).
// Patron CONTENEDOR / PRESENTACIONAL:
//   - ServiciosContainer (contenedor): lee los datos (SERVICIOS y PRODUCTOS), guarda el estado y decide que pasa al hacer clic.
//   - TarjetaServicio y Paquete (presentacionales): solo reciben datos y funciones por props y dibujan HTML.
// Si React no carga (sin internet), servicios.html conserva su HTML estatico de respaldo.
(function () {
  const raiz = document.getElementById("serviciosRaiz");
  if (!raiz || typeof React === "undefined" || typeof ReactDOM === "undefined") return;
  const h = React.createElement, useState = React.useState;

  // ---------- Presentacional: un paquete dentro de la tarjeta ----------
  function Paquete({ paquete, agregado, onAgregar }) {
    return h("li", null,
      h("span", { className: "p-nombre" }, paquete.nombre),
      h("span", { className: "p-precio" }, formatoPrecio.format(paquete.precio)),
      h("button", { type: "button", className: "btn btn-verde", onClick: () => onAgregar(paquete.id) },
        agregado ? "¡Agregado!" : "Agregar al pedido"));
  }

  // ---------- Presentacional: una tarjeta de servicio ----------
  function TarjetaServicio({ servicio, paquetes, abierto, idAgregado, onAlternar, onAgregar }) {
    const idLista = "paquetes-" + servicio.id;
    const desde = paquetes.length ? Math.min(...paquetes.map((p) => p.precio)) : null;
    return h("article", { className: "tarjeta" },
      h("span", { className: "num" }, servicio.num),
      h("h3", null, servicio.titulo),
      h("p", null, servicio.descripcion),
      h("p", { className: "desde" }, desde === null ? "Paquetes próximamente" : `${paquetes.length} ${paquetes.length === 1 ? "paquete" : "paquetes"} · desde ${formatoPrecio.format(desde)}`),
      h("div", { className: "acciones-serv" },
        paquetes.length > 0 && h("button", { type: "button", className: "btn btn-verde", "aria-expanded": abierto, "aria-controls": idLista, onClick: () => onAlternar(servicio.id) },
          abierto ? "Ocultar paquetes" : "Ver paquetes"),
        h("a", { className: "btn", href: "catalogo.html#" + encodeURIComponent(servicio.categoria) }, "Ir al catálogo")),
      abierto && h("ul", { className: "paquetes", id: idLista },
        paquetes.map((p) => h(Paquete, { key: p.id, paquete: p, agregado: idAgregado === p.id, onAgregar }))));
  }

  // ---------- Contenedor: datos + estado + acciones ----------
  function ServiciosContainer() {
    const [abierto, setAbierto] = useState(null);              // id del servicio con la lista de paquetes desplegada
    const [idAgregado, setIdAgregado] = useState(null);        // paquete recien agregado (para el aviso "¡Agregado!")

    const alternar = (id) => setAbierto((actual) => (actual === id ? null : id));
    const agregar = (idProducto) => {
      cambiarCantidad(idProducto, 1);                          // viene de pedido.js: suma al pedido y actualiza el contador del menu
      setIdAgregado(idProducto);
      setTimeout(() => setIdAgregado((actual) => (actual === idProducto ? null : actual)), 1200);
    };

    return h("div", { className: "grid grid-servicios" },
      SERVICIOS.map((s) => h(TarjetaServicio, {
        key: s.id, servicio: s, paquetes: PRODUCTOS.filter((p) => p.categoria === s.categoria),
        abierto: abierto === s.id, idAgregado, onAlternar: alternar, onAgregar: agregar
      })));
  }

  ReactDOM.createRoot(raiz).render(h(ServiciosContainer));
})();
