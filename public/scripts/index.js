const port = 8081;

async function createProduct(Name) {
    const res = await fetch(`http://localhost:${port}/products/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({Name})
    })
    const json = await res.json()
    console.log(json)
}

async function deleteProduct(Product_id) {
    const res = await fetch(`http://localhost:${port}/products/`+Product_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }})
    const json = await res.json()
    console.log(json)
}

async function getAll() {
    try {
        const res = await fetch(`http://localhost:${port}/api/getAll`);
        console.log(res)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        console.log(json);
        return json();

    } catch (error) {
        console.error('Error fetching or processing data:', error);
        return [];
    }
}


async function searchHandler() {
    const Name = document.getElementById('input_search').value.trim();
    const divResults = document.getElementById('cards_div');
    if (Name === '') {
        try {
            const res = await fetch(`http://localhost:${port}/api/getAll`);
            const json = await res.json();
            displaySearchResults(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    search(Name,divResults);
}

async function search(Name,divResults) {
    try {
        const encodedName = encodeURIComponent(Name); 
        const res = await fetch(`http://localhost:${port}/api/search/${encodedName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Name })
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await res.json();
        console.log(json);
        if (json.length === 0) {
            divResults.style.display = '<block>';
        } else {
            divResults.innerHTML = '';
            divResults.style.display = 'block';
            displaySearchResults(json);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        divResults.innerHTML = 'Error fetching data';
    }
}

async function displaySearchResults(products) {
    const cardsDiv = document.getElementById('cards_div');
    cardsDiv.innerHTML = '';

    if (products.length === 0) {
        cardsDiv.innerHTML = '<p>No products available</p>';
        return;
    }

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'; 

    products.forEach(product => {
        const productCard = document.createElement('span');
        productCard.id = 'card';
        productCard.className = `card_div_${product.Product_id}`;

        const productHtml = `
            <img id="img_card" src="./prod_img/${product.Name}.jpeg">
            <hr>
            <i id="i_item_name">${product.Name}</i><br>
            <i id="i_item_info1">${product.Type}</i><br>
            <i id="i_item_info2">${product.Price}$</i><br>
            <i id="i_item_info3">${product.discount}</i><br>
            <i id="i_item_info4">${product.Rank}</i><br>
        `;

        productCard.innerHTML = productHtml;
        cardsDiv.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const Type = event.target.getAttribute('data-filter')
            applyFilter(Type);
        });
    });
});

async function applyFilter(Type) {
    const cardsDiv = document.getElementById('cards_div');
    try {
        let url1 = `http://localhost:${port}/api/Type/`; 
        let url2  = `http://localhost:${port}/api/getAll/`;

        if(Type == 'All') {
            const res = await fetch(url2);
            const json = await res.json();
            displaySearchResults(json);
        }
        
        if (Type !== 'All') {
            const res = await fetch(url1, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Type })
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const products = await res.json();
            displaySearchResults(products); 
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        cardsDiv.innerHTML = 'Error fetching data';
    }
};

let originalContent = ''; 
document.addEventListener('DOMContentLoaded', () => {
    const cardsDiv = document.getElementById('div_sidebar_item_list');
    originalContent = cardsDiv.innerHTML; 
    document.getElementById('a_menu_11').addEventListener('click', () => loadStaticContent('/about'));
    document.getElementById('a_menu_12').addEventListener('click', () => loadStaticContent('/terms'));
    document.querySelectorAll('.a_menu:not(#a_menu_11):not(#a_menu_12)').forEach(button => {
        button.addEventListener('click', restoreOriginalContent);
    });
});

async function loadStaticContent(path) {
    const cardsDiv = document.getElementById('div_sidebar_item_list');
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await res.text();
        cardsDiv.innerHTML = html;
    } catch (error) {
        console.error('Error loading content:', error);
        cardsDiv.innerHTML = 'Error loading content';
    }
}

async function loadStaticContent(path) {
    const cardsDiv = document.getElementById('div_sidebar_item_list');
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Network response was not ok');
        const html = await res.text();
        cardsDiv.innerHTML = html; 
    } catch (error) {
        console.error('Error loading content:', error);
        cardsDiv.innerHTML = 'Error loading content';
    }
}

function restoreOriginalContent() {
    const cardsDiv = document.getElementById('div_sidebar_item_list');
    cardsDiv.innerHTML = originalContent; 
}

document.getElementById('input_search').onkeyup = searchHandler



