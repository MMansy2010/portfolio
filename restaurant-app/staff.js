// staff.js
import { db } from "./firebase.js";
import {
  collection, onSnapshot, doc, updateDoc, query, where, orderBy
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const roles = {
  chef: {
    title: "👨‍🍳 الطباخ",
    subtitle: "الطلبات اللي محتاج تطبخها",
    heading: "🔥 طلبات الطبخ",
    status: "cooking",
    nextStatus: "delivering",
    nextLabel: "✅ خلصت الطبخ",
    color: "#9b59b6"
  },
  delivery: {
    title: "🛵 مندوب التوصيل",
    subtitle: "الطلبات اللي محتاج توصلها",
    heading: "📦 طلبات التوصيل",
    status: "delivering",
    nextStatus: "done",
    nextLabel: "✅ وصّلت الطلب",
    color: "#3498db"
  }
};

let currentRole = null;
let unsubscribe = null;

// اختيار الدور
document.getElementById("btn-chef").addEventListener("click", () => startRole("chef"));
document.getElementById("btn-delivery").addEventListener("click", () => startRole("delivery"));
document.getElementById("btn-logout").addEventListener("click", () => {
  if (unsubscribe) unsubscribe();
  document.getElementById("tasks-screen").classList.add("hidden");
  document.getElementById("role-screen").classList.remove("hidden");
  document.getElementById("tasks-container").innerHTML = "";
});

function startRole(role) {
  currentRole = roles[role];

  // UI
  document.getElementById("role-screen").classList.add("hidden");
  document.getElementById("tasks-screen").classList.remove("hidden");
  document.getElementById("role-title").textContent = currentRole.title;
  document.getElementById("role-subtitle").textContent = currentRole.subtitle;
  document.getElementById("tasks-heading").textContent = currentRole.heading;

  // اشتراك real-time
  const q = query(
    collection(db, "orders"),
    where("status", "==", currentRole.status)
  );

  unsubscribe = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    
    // الترتيب محلياً لتجنب خطأ الـ Composite Index في فايربيز
    orders.sort((a, b) => {
      const timeA = a.createdAt && typeof a.createdAt.toMillis === 'function' ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt && typeof b.createdAt.toMillis === 'function' ? b.createdAt.toMillis() : 0;
      return timeA - timeB;
    });

    renderTasks(orders);
  });
}

function renderTasks(orders) {
  const container = document.getElementById("tasks-container");
  document.getElementById("loading-msg")?.remove();

  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <p>🎉 مفيش طلبات دلوقتي</p>
      <span>استرح شوية! 😄</span>
    </div>`;
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="task-card" id="task-${order.id}">
      <div class="task-header">
        <div class="task-info">
          <strong>${order.customerName}</strong>
          <span>📞 ${order.phone}</span>
        </div>
        <span class="task-time">${formatTime(order.createdAt)}</span>
      </div>

      <p class="task-address">📍 ${order.address}</p>

      <div class="task-items">
        ${order.items.map(i => `
          <div class="task-item">
            <span>${i.name}</span>
            <span class="task-qty">× ${i.qty}</span>
          </div>
        `).join("")}
      </div>

      <div class="task-footer">
        <span class="task-total">💰 ${order.total} جنيه</span>
        <button class="done-btn" data-id="${order.id}"
          style="background: linear-gradient(45deg, ${currentRole.color}, ${currentRole.color}aa)">
          ${currentRole.nextLabel}
        </button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".done-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      btn.disabled = true;
      btn.textContent = "جاري التحديث...";
      await updateDoc(doc(db, "orders", id), {
        status: currentRole.nextStatus
      });
    });
  });
}

function formatTime(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== 'function') return "";
  const date = timestamp.toDate();
  return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
}