// toLocaleString es JavaScript puro, no hace falta ninguna libreria de fechas
// ni de plata. "es-AR" le dice el idioma y ARS la moneda.
export const formatearPrecio = (valor) =>
  Number(valor).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

// Los thumbnails viejos de Mercado Libre a veces vienen por http://, y el
// navegador bloquea imagenes http dentro de una pagina https.
export const imagenSegura = (url) => {
  if (!url) return "";
  return url.replace("http://", "https://");
};
