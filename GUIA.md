# DinoAventura Decoraciones: guía del proyecto (v4)

## 1. Qué hay en la carpeta
- Una página por sección: `index.html` (inicio), `nosotros.html`, `servicios.html`, `catalogo.html`, `pedido.html`, `galeria.html`, `cotizar.html` y `contacto.html`.
- `css/estilos.css`: colores y diseño (la paleta sale del logo y está al inicio, en `:root`).
- `js/config.js` (WhatsApp, correo, redes), `js/productos.js` (catálogo y precios), `js/galeria.js` (fotos del carrusel).
- `js/main.js`, `js/pedido.js`, `js/carrusel.js`: la lógica, comentada.
- `img/`: el logo recortado (`logo-principal.png`, `logo-palabra.png`), `img/galeria/` y `img/productos/` para las fotos.
- Para verlo: doble clic en `index.html`. Para editar: abre la carpeta en VS Code.

## 2. Cómo agregar tus fotos a la galería (carrusel)
1. Prepara las fotos: formato `.jpg` o `.webp`, unos 1200 px de ancho y menos de 300 KB (así cargan rápido en celular). Si las fotos tienen niños, pide permiso a las familias antes de publicarlas.
2. Ponles nombres en minúsculas, sin espacios ni tildes: `cumple-dino-1.jpg`.
3. Copia las fotos a la carpeta `img/galeria/`.
4. Abre `js/galeria.js`, quita las `//` de las líneas de ejemplo y escribe una por foto:
   ```js
   const GALERIA = [
     { archivo: "img/galeria/cumple-dino-1.jpg", titulo: "Cumpleaños de dinosaurios", texto: "Arco de globos y mesa temática" },
     { archivo: "img/galeria/baby-shower-1.jpg", titulo: "Baby shower huevito", texto: "Bogotá" },
   ];
   ```
5. Guarda y abre `galeria.html`: el carrusel se arma solo (una diapositiva por línea, en ese orden). Para quitar una foto, borra su línea. Con una sola foto se ocultan las flechas.
6. Fotos de los paquetes: guárdalas en `img/productos/` y escribe la ruta en el campo `imagen` de ese paquete en `js/productos.js`. Si queda vacío, se muestra el logo.

## 3. Otros cambios frecuentes
- **WhatsApp, correo, horario y redes:** `js/config.js` (el número va con 57 al inicio, sin "+").
- **Precios y paquetes:** `js/productos.js`.
- **Eslogan:** aparece en `index.html` y en el pie de página (`¡Diversión Prehistórica!`).

## 4. Subirlo a GitHub (y publicarlo gratis)
**Opción A: desde la web**
1. Crea una cuenta en github.com y toca **New repository**. Nombre: `dinoaventura`. Márcalo **Public**.
2. Entra al repositorio y toca **Add file > Upload files**.
3. Extrae el zip y arrastra el CONTENIDO de la carpeta (los `.html`, `css`, `js`, `img`, `GUIA.md`), no la carpeta completa: `index.html` debe quedar en la raíz.
4. Toca **Commit changes**.

**Opción B: con Git (terminal, dentro de la carpeta del proyecto)**
```bash
git init
git add .
git commit -m "DinoAventura v4"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/dinoaventura.git
git push -u origin main
```
(Crea antes el repositorio vacío en GitHub y cambia `TU_USUARIO`.)

**Publicar con GitHub Pages**
1. En el repositorio: **Settings > Pages**.
2. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
3. En 1 o 2 minutos estará en `https://TU_USUARIO.github.io/dinoaventura/`. Ábrelo desde el celular para probarlo.

**Actualizar después de un cambio:** vuelve a subir los archivos modificados (Opción A, con *Add file > Upload files*) o haz `git add .`, `git commit -m "cambio"` y `git push`. Si no ves el cambio, recarga con `Ctrl + F5`.

## 5. Descargar el proyecto
- **Desde GitHub:** entra al repositorio, toca el botón verde **Code** y luego **Download ZIP**. Extrae el zip en tu computador.
- **Con Git:** `git clone https://github.com/TU_USUARIO/dinoaventura.git`
- **Archivos sueltos:** en la página del repositorio abre el archivo y usa el ícono de descarga.

## 6. Probar en celular
- Con la página publicada en GitHub Pages, abre la dirección en el teléfono.
- Sin publicar: en Chrome presiona `F12` y luego `Ctrl + Shift + M` (modo celular).

## 7. Si algo falla
- **Sin estilos o sin catálogo:** revisa que los nombres coincidan (GitHub distingue mayúsculas de minúsculas).
- **La foto no aparece:** revisa la ruta en `galeria.js` y que el archivo esté en `img/galeria/`.
- **Las letras se ven distintas:** las fuentes vienen de Google Fonts y necesitan internet.
- **Página en blanco en GitHub Pages:** `index.html` debe estar en la raíz del repositorio, no dentro de otra carpeta.
