async function loadCharactersFromFile(file) {
    const response = await fetch(file);
    const text = await response.text();
    return text.split("\n").slice(1);
}

// return array ["a", "b", ...]
function getAllSimplified(data) {
    return data.map(row => row.split(",")[0].trim()).filter(Boolean);
}

// return array [["a", "b"], ["c", "d"], ...] 
function getTraditional(data) {
    return data.map(row => row.split(","))
        .filter(cols => cols[1] && cols[1].trim())
        .map(cols => [cols[0], cols[1]]);
}

// return array [["a", "b"], ["c", "d"], ...]
function getSubstitute(data) {
    return data.map(row => row.split(","))
        .filter(cols => cols[2] && cols[2].trim())
        .map(cols => [cols[0], cols[2]]);
}

async function loadAllCharGrids() {
    const grids = document.querySelectorAll(".char-grid");

    for (const grid of grids) {
        const src = grid.dataset.src;
        const type = grid.dataset.type;
        const data = await loadCharactersFromFile(src);
        
        switch (type) {
            case "trad":
                renderPairsGrid(grid, getTraditional(data));
                break;
            case "sub":
                renderPairsGrid(grid, getSubstitute(data));
                break;
            default:
                renderSimplifiedGrid(grid, getAllSimplified(data));
                break;
        }
    }
}

// data expects 1D array of strings
function renderSimplifiedGrid(container, data) {
    const chars = data;

    container.innerHTML = chars
        .map(c => `<div class="char">${c}</div>`)
        .join("");
}

// data expects 2D array, each sub-array of len >= 2
function renderPairsGrid(container, data) {
    const pairs = data;

    container.innerHTML = pairs
        .map(p => 
            `<div class="char" style="display:flex">
                <span>${p[0]}</span>
                <span style="font-size:20px">${p[1]}</span>
            </div>`
        )
        .join("");
}

loadAllCharGrids();