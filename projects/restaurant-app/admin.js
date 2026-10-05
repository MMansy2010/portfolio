// admin.js
import { db } from "./firebase.js";
import {
  collection, onSnapshot, doc, updateDoc, getDocs, query, orderBy
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const statusLabels = {
  pending:    { label: "⏳ انتظار",   color: "#e67e22" },
  cooking:    { label: "👨‍🍳 بيتطبخ",  color: "#9b59b6" },
  delivering: { label: "🛵 بيتوصل",  color: "#3498db" },
  done:       { label: "✅ اتسلم",    color: "#27ae60" },
};

let allOrders = [];
let currentFilter = "all";

// استماع للطلبات real-time
const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  updateStats();
  renderOrders();
});

// إحصائيات
function updateStats() {
  ["pending", "cooking", "delivering", "done"].forEach(status => {
    const count = allOrders.filter(o => o.status === status).length;
    document.getElementById(`count-${status}`).textContent = count;
  });
}

// عرض الطلبات
function renderOrders() {
  const container = document.getElementById("orders-container");
  document.getElementById("loading-msg")?.remove();

  const filtered = currentFilter === "all"
    ? allOrders
    : allOrders.filter(o => o.status === currentFilter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty-msg">مفيش طلبات 😴</p>`;
    return;
  }

  container.innerHTML = filtered.map(order => `
    <div class="order-card" id="order-${order.id}">
      <div class="order-header">
        <div>
          <strong>${order.customerName}</strong>
          <span class="order-phone">📞 ${order.phone}</span>
        </div>
        <span class="status-badge" style="background:${statusLabels[order.status]?.color}22; color:${statusLabels[order.status]?.color}; border: 1px solid ${statusLabels[order.status]?.color}">
          ${statusLabels[order.status]?.label}
        </span>
      </div>

      <p class="order-address">📍 ${order.address}</p>

      <div class="order-items">
        ${order.items.map(i => `<span class="item-tag">${i.name} × ${i.qty}</span>`).join("")}
      </div>

      <div class="order-footer">
        <strong class="order-total">💰 ${order.total} جنيه</strong>
        <div class="order-actions">
          <select class="status-select" data-id="${order.id}">
            ${Object.entries(statusLabels).map(([val, {label}]) =>
              `<option value="${val}" ${order.status === val ? "selected" : ""}>${label}</option>`
            ).join("")}
          </select>
        </div>
      </div>
    </div>
  `).join("");

  // أحداث الـ select
  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", async (e) => {
      const id = e.target.dataset.id;
      const newStatus = e.target.value;
      await updateDoc(doc(db, "orders", id), { status: newStatus });
    });
  });
}

// فلتر
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.status;
    renderOrders();
  });
});