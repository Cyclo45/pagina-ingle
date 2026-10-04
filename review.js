
const NOTA = 4;
const TOTAL = 10;


const contenedor = document.getElementById("estrellas");
const svgEstrella =
  '<svg class="estrella" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

for (let i = 0; i < TOTAL; i++) {
  contenedor.insertAdjacentHTML("beforeend", svgEstrella);
}

document.getElementById("nota").textContent = NOTA;
contenedor.setAttribute("aria-label", NOTA + " out of " + TOTAL);

function llenarEstrellas() {
  const estrellas = contenedor.querySelectorAll(".estrella");

  for (let i = 0; i < NOTA; i++) {
    setTimeout(function () {
      estrellas[i].classList.add("llena");
    }, i * 250);
  }
}


const bloques = document.querySelectorAll(".reveal");

const observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;

      entrada.target.classList.add("visible");
      observador.unobserve(entrada.target);

      // Cuando aparece el bloque de calificación, se llenan las estrellas
      if (entrada.target.classList.contains("rating")) {
        setTimeout(llenarEstrellas, 400);
      }
    });
  },
  { threshold: 0.2 }
);

bloques.forEach(function (bloque) {
  observador.observe(bloque);
});
