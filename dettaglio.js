function loadPhoto(id) {
  fetch("https://api.pexels.com/v1/photos/" + id, {
    headers: {
      Authorization: "DVC1e1mowerNoffroUC10X14SazMZpC9q5VyUb7teJfcWeXchaqOE7dW",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((data) => {
      console.log(data);
      createCard(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

const addressBarContent = new URLSearchParams(location.search);

const id = addressBarContent.get("id");

loadPhoto(id);

function createCard(photo) {
  const row = document.getElementById("main-cont");
  row.innerHTML = "";
  const col = document.createElement("div");
  col.classList.add("col-md-6", "mt-5");
  col.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img
              src="${photo.src.tiny}"
              class="bd-placeholder-img card-img-top"
              alt="${photo.alt}"
              onclick=location.href="./dettaglio-img.html?id=${photo.id}" 
            />
            <div class="card-body">
              <h5 class="card-title" onclick=location.href="./dettaglio-img.html?id=${photo.id}">${photo.alt}</h5>
              <p class="card-text">
                Artista: ${photo.photographer}
              </p>
              <a href="${photo.photographer_url}" target="_blank">Pagina dell'artista</a>
              <div
                class="d-flex justify-content-between align-items-center"
              >
                </div>
                <small class="text-muted">${photo.id}</small>
              </div>
            </div>
          </div>`;
  row.appendChild(col);
  document.getElementsByTagName("body")[0].style.backgroundColor =
    photo.avg_color;
}

const back = document.getElementById("back");
const query = localStorage.getItem("query");

if (query != null) {
  back.setAttribute("href", `pexels-start.html?query=${query}`);
}
