document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.getElementById('search');

    // Fetch categories and populate the dropdown
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        });

    // Function to fetch and display products
    function fetchProducts() {
        const category = categorySelect.value;
        const sort = sortSelect.value;
        const search = searchInput.value.trim().toLowerCase();

        fetch(`https://fakestoreapi.com/products${category ? `?category=${category}` : ''}`)
            .then(response => response.json())
            .then(products => {
                // Filter products by search query
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(search));

                // Sort products by price
                filteredProducts.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);

                // Clear previous products
                productsContainer.innerHTML = '';

                // Display products
                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>${product.price}$</p>
                    `;
                    productsContainer.appendChild(productCard);
                });
            });
    }

    // Event listeners for filters
    categorySelect.addEventListener('change', fetchProducts);
    sortSelect.addEventListener('change', fetchProducts);
    searchInput.addEventListener('input', fetchProducts);

    // Initial fetch on page load
    fetchProducts();
});
