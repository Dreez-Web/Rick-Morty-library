let currentPage = 1;
const charactersContainer = document.getElementById("characters");
const paginationContainer = document.getElementById("pagination");

function getCharacters(page = 1) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => response.json())
        .then(data => {
            renderCharacters(data.results);
            renderPagination(data.info);
        })
        .catch(error => {
            console.error("Error al obtener los personajes:", error);
        });
}

function renderCharacters(characters) {
    charactersContainer.innerHTML = ""; // Limpiamos los personajes anteriores
    characters.forEach(character => {
        const characterElement = document.createElement("div");
        characterElement.className = "card";
        characterElement.innerHTML = `
            <img src="${character.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${character.name}</h3>
                <h5>Especie: ${character.species}</h5>
                <h5>Género: ${character.gender}</h5>
                <h5>Status: ${character.status}</h5>
                <h5>Locacion: ${character.location["name"]}</h5>
            </div>
        `;
        charactersContainer.appendChild(characterElement);
    });
}

function renderPagination(info) {
    paginationContainer.innerHTML = ""; // Limpiamos la paginación anterior

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = !info.prev; // Deshabilitar si no hay página anterior
    prevButton.addEventListener("click", () => {
        currentPage--;
        getCharacters(currentPage);
    });
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = !info.next; // Deshabilitar si no hay siguiente página
    nextButton.addEventListener("click", () => {
        currentPage++;
        getCharacters(currentPage);
    });
    paginationContainer.appendChild(nextButton);
}

// Inicializar con la primera página
getCharacters(currentPage);
