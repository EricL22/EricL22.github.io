async function loadCharactersFromFile(file) {
    const response = await fetch(file);
    const text = await response.text();
    return text.split("\n").map(c => c.trim()).filter(Boolean);
}

async function loadAllCharGrids() {
    const grids = document.querySelectorAll(".char-grid");

    for (const grid of grids) {
        const src = grid.dataset.src;
        const chars = await loadCharactersFromFile(src);

        grid.innerHTML = chars
            .map(c => `<div class="char">${c}</div>`)
            .join("");
    }
}

loadAllCharGrids();