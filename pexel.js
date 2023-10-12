const spinner = document.getElementById("spinner");

function loadImages(query) {
  spinner.classList.toggle("d-none");
  fetch("https://api.pexels.com/v1/search?query=" + query, {
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
      spinner.classList.toggle("d-none");
      createCards(data.photos);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCards(photos) {
  const row = document.getElementById("main-cont");
  row.innerHTML = "";
  photos.forEach((photo) => {
    const col = document.createElement("div");
    col.classList.add("col-md-4");
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
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onclick="updateModal(${photo.id})" 
                >


                  View
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  onclick="hide(event)"
                >
                  Hide
                </button>
              </div>
              <small class="text-muted">${photo.id}</small>
            </div>
          </div>
        </div>`;
    row.appendChild(col);
  });
}

const addressBarContent = new URLSearchParams(location.search);

const query = addressBarContent.get("query");

if (query != null) {
  loadImages(query);
  console.log("query", query);
  localStorage.setItem("query", query);
}

function hide(event) {
  event.target.closest(".col-md-4").remove();
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("search-query");
  localStorage.setItem("query", query.value);
  loadImages(query.value);
});

function updateModal(id) {
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
      updatePhoto(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function updatePhoto(photo) {
  const imgModal = document.getElementById("img-modal");
  imgModal.innerHTML = "";
  imgModal.innerHTML = `<img src="${photo.src.tiny}" class="w-100"/>`;
  document.getElementById("exampleModalLabel").innerText = photo.alt;
}
function emptyModal() {
  const imgModal = document.getElementById("img-modal");
  imgModal.innerHTML = "";
  document.getElementById("exampleModalLabel").innerText = "";
}
