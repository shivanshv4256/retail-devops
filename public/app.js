const productGrid = document.getElementById("product-grid");
const cartItemsNode = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");
const totalsNode = document.getElementById("totals");

const cart = new Map();
let products = [];

const renderCart = () => {
  if (cart.size === 0) {
    cartItemsNode.textContent = "No items yet.";
    return;
  }

  cartItemsNode.innerHTML = [...cart.entries()]
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return "";
      return `<div>${product.name} x ${quantity}</div>`;
    })
    .join("");
};

const renderProducts = () => {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="card-content">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}">Add to Cart</button>
          </div>
        </article>
      `,
    )
    .join("");

  productGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      if (!productId) return;
      cart.set(productId, (cart.get(productId) ?? 0) + 1);
      renderCart();
    });
  });
};

const loadProducts = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  products = data.products ?? [];
  renderProducts();
};

checkoutBtn.addEventListener("click", async () => {
  const items = [...cart.entries()].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  const result = await response.json();

  totalsNode.innerHTML = `
    <div>Subtotal: $${result.subtotal.toFixed(2)}</div>
    <div>Discount: ${result.discountPercent}%</div>
    <div>Tax: ${result.taxPercent}%</div>
    <div><strong>Total: $${result.total.toFixed(2)}</strong></div>
  `;
});

loadProducts().catch(() => {
  productGrid.innerHTML = "<p>Unable to load products.</p>";
});
renderCart();
