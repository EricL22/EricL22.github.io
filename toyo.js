async function loadCharactersFromFile(file) {
    const response = await fetch(file);
    const text = await response.text();
    return text.split("\n").slice(1);
}

function getAllSimplified(data) {
    return data.map(row => row.split(",")[0].trim()).filter(Boolean);
}

async function loadAllCharGrids() {
    const grids = document.querySelectorAll(".char-grid");

    for (const grid of grids) {
        const src = grid.dataset.src;
        const type = grid.dataset.type;
        const data = await loadCharactersFromFile(src);
        
        switch (type) {
            case "pairs":
                break;
            default:
                renderSimplifiedGrid(grid, data);
                break;
        }
    }
}

function renderSimplifiedGrid(container, data) {
    const chars = getAllSimplified(data);

    container.innerHTML = chars
        .map(c => `<div class="char">${c}</div>`)
        .join("");
}

loadAllCharGrids();