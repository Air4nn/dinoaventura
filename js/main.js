// main.js : logica comun a TODAS las paginas. Cada bloque revisa si su elemento existe,
// porque no todas las paginas tienen catalogo, formulario o lista de contacto.
const $ = (s) => document.querySelector(s);
const formatoPrecio = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
// Enlace https://wa.me/NUMERO?text=MENSAJE (encodeURIComponent vuelve seguro el texto)
const enlaceWhatsApp = (m) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;

// ---------- 1. ELEMENTOS COMUNES ----------
const saludo = enlaceWhatsApp("Hola, quisiera información sobre sus decoraciones.");
document.querySelectorAll("[data-wa]").forEach((a) => { a.href = saludo; });
document.querySelectorAll("[data-red]").forEach((a) => { a.href = CONFIG.redes[a.dataset.red]; });
$("#anio").textContent = new Date().getFullYear();
$("#menuBtn").addEventListener("click", () => {            // menu de 3 rayas en celular
  const abierto = $("#menu").classList.toggle("abierto");
  $("#menuBtn").setAttribute("aria-expanded", abierto);
});

// ---------- 2. CATALOGO (solo en catalogo.html) ----------
function mostrarCatalogo(cat = "todos") {
  document.querySelectorAll(".filtro").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === cat));
  const lista = cat === "todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === cat);
  $("#listaProductos").innerHTML = lista.map((p) => `
    <article class="producto" data-categoria="${p.categoria}">
      <div class="producto-img">
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">` : `<img class="sin-foto" src="img/logo-principal.png" alt="" loading="lazy">`}
        <span class="etiqueta">${p.categoria}</span>
      </div>
      <div class="producto-cuerpo">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class="precio">${formatoPrecio.format(p.precio)}</p>
        <div class="acciones">
          <button class="btn btn-verde" type="button" data-agregar="${p.id}">Agregar al pedido</button>
          <a class="btn" target="_blank" rel="noopener"
             href="${enlaceWhatsApp(`Hola, me interesa el paquete "${p.nombre}". ¿Me dan más información?`)}">Pedir por WhatsApp</a>
        </div>
      </div>
    </article>`).join("");
}
if ($("#listaProductos")) {
  // Si llegas desde Servicios con #cumpleaños (por ejemplo), el filtro arranca en esa categoria.
  const inicial = decodeURIComponent(location.hash.slice(1));
  mostrarCatalogo(["cumpleaños", "baby shower", "temática"].includes(inicial) ? inicial : "todos");
  $("#filtros").addEventListener("click", (e) => {
    const boton = e.target.closest(".filtro");
    if (boton) mostrarCatalogo(boton.dataset.cat);
  });
}

// ---------- 3. FORMULARIO DE COTIZACION (solo en cotizar.html) ----------
if ($("#formCotizar")) {
  $("#formCotizar").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {                          // revisa required / min / minlength del HTML
      $("#errorForm").textContent = "Revisa los campos obligatorios: nombre, tipo de evento, fecha e invitados.";
      return;
    }
    $("#errorForm").textContent = "";
    const d = Object.fromEntries(new FormData(form));
    window.open(enlaceWhatsApp(`Hola, soy ${d.nombre}. Quiero cotizar un evento (${d.evento}) para el ${d.fecha} con ${d.invitados} invitados.` + (d.idea ? ` Mi idea: ${d.idea}` : "")), "_blank", "noopener");
  });
}

// ---------- 4. DATOS DE CONTACTO (solo en contacto.html) ----------
if ($("#datosContacto")) {
  $("#datosContacto").innerHTML = `
    <li><b>Zona</b> ${CONFIG.zona}</li>
    <li><b>Horario</b> ${CONFIG.horario}</li>
    <li><b>Correo</b> ${CONFIG.correo}</li>
    <li><b>WhatsApp</b> <a href="${saludo}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a></li>`;
}
