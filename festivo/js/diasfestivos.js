const API_URL_BASE = "https://holidayapi.com/v1/";
const API_KEY = "6cb0e01b-162e-4d26-a84f-41d105f9adfa";

let txt_anio, cbx_pais, cbx_mes, div_resultados, loader;

window.onload = function () {
    txt_anio = document.getElementById("txt_anio");
    cbx_pais = document.getElementById("cbx_pais");
    cbx_mes = document.getElementById("cbx_mes");
    div_resultados = document.getElementById("div_resultados");
    loader = document.getElementById("loader");
    txt_anio.value = new Date().getFullYear() - 1;
    div_resultados.style.display = "none";
};

function consultar() {
    div_resultados.style.display = "none";
    loader.style.display = "block";

    const URL_CONSULTA = `${API_URL_BASE}holidays?language=es&key=${API_KEY}&country=${cbx_pais.value}&year=${txt_anio.value}&month=${cbx_mes.value}`;
    console.log(URL_CONSULTA);

    fetch(URL_CONSULTA)
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none";
            mostrarDiasFestivos(data.holidays);
        })
        .catch(() => {
            loader.style.display = "none";
            alert("Error al conectar con el servidor...");
        });

    return false;
}

function mostrarDiasFestivos(diasFestivos) {
    div_resultados.style.display = "block";
    div_resultados.innerHTML = "";

    let titulo = document.createElement("h2");
    titulo.innerText = `Días festivos de ${cbx_pais.options[cbx_pais.selectedIndex].text} en ${cbx_mes.options[cbx_mes.selectedIndex].text} del año ${txt_anio.value}`;
    div_resultados.appendChild(titulo);

    if (diasFestivos.length) {
        let tarjetas = diasFestivos.map(dia => generarTarjeta(dia)).join("");
        div_resultados.innerHTML += `<div class="tarjetas">${tarjetas}</div>`;
    } else {
        let mensaje = document.createElement("h3");
        mensaje.innerText = "No se encontraron días feriados para este mes...";
        mensaje.className = "sinresultados";
        div_resultados.appendChild(mensaje);
    }
}

function generarTarjeta(datos) {
    return `
        <div class="tarjeta">
            <h3>${datos.name}</h3>
            <h4>${datos.date}</h4>
            <p>${datos.weekday.date.name}</p>
        </div>
    `;
}
