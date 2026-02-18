//categories data loading

const categoriesDataLoad = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      categoriesDataDisplay(data);
      loadAllProducts();
    });
};
// categories data display
const categoriesDataDisplay = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  // all btn
  const div = document.createElement("div");
  div.innerHTML = `
      <button id='btn-all'  class="btn rounded-full active catbtn">All</button>
      `;
  categoriesContainer.append(div);
  const btnAll = document.getElementById("btn-all");

  btnAll.addEventListener("click", () => {
    loadAllProducts();
    removeActive();
    btnAll.classList.add("active");
  });

  categories.forEach((cate, index) => {
    const cat = cate;

    const div = document.createElement("div");
    div.innerHTML = `
      <button id='btn-${index}' class="btn rounded-full catbtn">${cate}</button>
      `;
    categoriesContainer.append(div);
    div.addEventListener("click", () => {
      loadcatProducts(cat);
      removeActive();
      const btn = document.getElementById(`btn-${index}`);
      btn.classList.add("active");
    });
  });
};

// Product data load

const loadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

// Product data display

const displayProducts = (products) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");

    div.innerHTML = `
          <div class="card bg-base-100 shadow-md">
            <figure class="bg-gray-100 p-6">
              <img
                src=${product.image}
                
                alt=""
                class="h-48 object-contain"
              />
            </figure>

            <div class="card-body">
              <div
                class="flex justify-between items-center text-xs text-gray-500 mb-1"
              >
                <span class="badge badge-ghost text-indigo-600 bg-indigo-100"
                  >${product.category}</span
                >
                <span class="flex items-center gap-1">
                  <i class="fa-solid fa-star text-yellow-400"></i> ${product.rating.rate} (${product.rating.count})
                </span>
              </div>

              <h3 class="font-semibold text-sm">
                ${product.title}
              </h3>

              <p class="font-bold text-lg mt-1">$${product.price}</p>

              <div class="flex gap-2 mt-4">
                <button
                 onclick="loadProductDetails(${product.id})"
                 class="btn btn-outline btn-sm flex-1">
                  <i class="fa-solid fa-eye mr-1"></i> Details
                </button>
                <button class="btn btn-primary btn-sm flex-1">
                  <i class="fa-solid fa-cart-shopping mr-1"></i> Add
                </button>
              </div>
            </div>
          </div>
        
        `;
    cardContainer.append(div);
  });
};

//load data by category
const loadcatProducts = (category) => {
  const encodedCategory = category;

  fetch(`https://fakestoreapi.com/products/category/${encodedCategory}`)
    .then((res) => res.json())
    .then((data) => displayProducts(data))
    .catch((err) => console.error(err));
};

// add active class

const removeActive = () => {
  const btns = document.querySelectorAll(".catbtn");
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

categoriesDataLoad();

// Modal functionality

const showProductModal = (product) => {
  const modalCard = document.getElementById("modal-card");

  modalCard.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      
     
      <div class="bg-gray-100 rounded-lg p-6 flex justify-center">
        <img src="${product.image}" alt="" class="h-64 object-contain">
      </div>

     
      <div>
        <span class="badge badge-ghost text-indigo-600 bg-indigo-100 mb-3">
          ${product.category}
        </span>

        <h2 class="text-xl md:text-2xl font-bold mb-3">
          ${product.title}
        </h2>

        <p class="text-gray-600 text-sm mb-4">
          ${product.description}
        </p>

        <div class="flex items-center justify-between mb-5">
          <p class="text-2xl font-bold text-indigo-600">$${product.price}</p>
          <p class="text-yellow-500 font-semibold">
            <i class="fa-solid fa-star"></i> ${product.rating.rate}
            <span class="text-gray-500 text-sm">(${product.rating.count})</span>
          </p>
        </div>

        <div class="flex gap-3">
          <button class="btn btn-primary flex-1">
            <i class="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
          </button>
          <button class="btn btn-outline flex-1">
            Buy Now
          </button>
        </div>
      </div>

    </div>
  `;

  document.getElementById("product-modal").showModal();
};

// single Product
const loadProductDetails = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => showProductModal(data));
};


//togging 
navHome = document.querySelectorAll('.nav-home')
navHome.forEach(home => {
    home.addEventListener('click',()=>{
        removeActive();
        home.classList.add('active');
        document.getElementById('banner').classList.remove('hidden');
        document.getElementById('why').classList.remove('hidden');
        document.getElementById('trending').classList.remove('hidden');
        document.getElementById('product').classList.add('hidden');
    })
})


//togging product
navProduct = document.querySelectorAll('.nav-products')
navProduct.forEach(Pro => {
    Pro.addEventListener('click',()=>{

        removeActive();

        Pro.classList.add('active');
        document.getElementById('banner').classList.add('hidden');
        document.getElementById('why').classList.add('hidden');
        document.getElementById('trending').classList.add('hidden');
        document.getElementById('product').classList.remove('hidden');
    })
})