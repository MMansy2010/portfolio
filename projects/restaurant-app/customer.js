// customer.js
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// بيانات المنيو مؤقتة — هنجيبها من Firestore بعدين
const menuItems = [
  { id: 1, name: "كشري", price: 25, category: "أكل" },
  { id: 2, name: "فول وطعمية", price: 15, category: "فطار" },
  { id: 3, name: "كباب", price: 80, category: "مشويات" },
  { id: 4, name: "عيش بالجبنة", price: 10, category: "إضافات" },
];

let cart = [];

// عرض المنيو
function renderMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";
  menuItems.forEach(item => {
    container.innerHTML += `
      <div class="menu-item">
        <span>${item.name}</span>
        <span>${item.price} جنيه</span>
        <button onclick="addToCart(${item.id})">+ أضف</button>
      </div>
    `;
  });
}

// إضافة للكارت
window.addToCart = function(id) {
  const item = menuItems.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

// عرض الكارت
function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${item.price * item.qty} جنيه</span>
        <button onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    `;
  });
  totalEl.textContent = total;
}

// حذف من الكارت
window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

// إرسال الطلب
document.getElementById("submit-order").addEventListener("click", async () => {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name || !phone || !address) {
    alert("من فضلك ادخل كل البيانات!");
    return;
  }
  if (cart.length === 0) {
    alert("الكارت فاضي!");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  try {
    await addDoc(collection(db, "orders"), {
      customerName: name,
      phone,
      address,
      items: cart,
      total,
      status: "pending",
      createdAt: serverTimestamp()
    });
    alert("✅ تم إرسال طلبك بنجاح!");
    cart = [];
    renderCart();
    document.getElementById("customer-name").value = "";
    document.getElementById("customer-phone").value = "";
    document.getElementById("customer-address").value = "";
  } catch (e) {
    alert("حصل خطأ، حاول تاني!");
    console.error(e);
  }
});

renderMenu();