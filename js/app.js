//Variables

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para los resultados

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la búsqueda

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarCoches(coches);

  llenarSelect();
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarCoche();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);

  filtrarCoche();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;

  filtrarCoche();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;

  filtrarCoche();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);

  filtrarCoche();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;

  filtrarCoche();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;

  filtrarCoche();
});

//Funciones
function mostrarCoches(coches) {
  limpiarHTML();

  coches.forEach((coche) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = coche;

    const cocheHTML = document.createElement("p");

    cocheHTML.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}`;

    resultado.appendChild(cocheHTML);
  });
}

//Limpiar el HTML

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
}

//función que filtra en base a la búsqueda

function filtrarCoche() {
  const resultado = coches
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarCoches(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent =
    "No hay resultados. Intenta con otros términos de búsqueda";
  resultado.appendChild(noResultado);
}

function filtrarMarca(coche) {
  const { marca } = datosBusqueda;

  if (marca) {
    return coche.marca === marca;
  }
  return coche;
}

function filtrarYear(coche) {
  const { year } = datosBusqueda;

  if (year) {
    return coche.year === year;
  }
  return coche;
}

function filtrarMin(coche) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return coche.precio >= minimo;
  }
  return coche;
}

function filtrarMax(coche) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return coche.precio <= maximo;
  }
  return coche;
}

function filtrarPuertas(coche) {
  const { puertas } = datosBusqueda;

  if (puertas) {
    return coche.puertas === puertas;
  }
  return coche;
}

function filtrarTransmision(coche) {
  const { transmision } = datosBusqueda;

  if (transmision) {
    return coche.transmision === transmision;
  }
  return coche;
}

function filtrarColor(coche) {
  const { color } = datosBusqueda;

  if (color) {
    return coche.color === color;
  }
  return coche;
}
