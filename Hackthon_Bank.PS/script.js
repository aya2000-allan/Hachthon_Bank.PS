
  const conversations = [
    {
      name: "محمد صالح",
      time: "11:03 ص",
      date: "2025-06-15",
      sentiment: "سلبي",
      message: "تأخرتوا كثير, متى بتوصل البطاقة؟ ",
      messages: [
        { sender: "العميل", text: "تأخرتوا كثير, متى بتوصل البطاقة؟ ", sentiment: "سلبي" },
      ],
      hasReplied: false
    },
    {
      name: "سارة علي",
      time: "10:45 ص",
      date: "2025-06-10",
      sentiment: "إيجابي",
      message: " .شكرًاعلى تعاونكم, فعلا خدمة ممتازة ",
      messages: [
        { sender: "العميلة", text: ".شكرًاعلى تعاونكم, فعلا خدمة ممتازة", sentiment: "إيجابي" },
      ],
      hasReplied: false
    },
    {
      name: "أحمد خالد",
      time: "09:20 ص",
      date: "2025-06-12",
      sentiment: "محايد",
      message: "هل بإمكاني استلام البطاقة من الفرع مباشرة؟",
      messages: [
        { sender: "العميل", text: "هل بإمكاني استلام البطاقة من الفرع مباشرة؟", sentiment: "محايد" },
      ], 
      hasReplied: false
    }
  ];

  function getIcon(sentiment) {
    switch (sentiment) {
      case "إيجابي": return "bi-emoji-smile-fill";
      case "سلبي": return "bi-emoji-frown-fill";
      case "محايد": return "bi-emoji-neutral-fill";
      default: return "";
    }
  }

  const list = document.getElementById("conversation-list");
  const loading = document.getElementById("loading");

  function updateReplyCounts() {
    const replied = conversations.filter(c => c.hasReplied).length;
    const unreplied = conversations.filter(c => !c.hasReplied).length;

    document.getElementById("repliedCount").textContent = replied;
    document.getElementById("unrepliedCount").textContent = unreplied;
  }

  function renderConversations(filter = "") {
  list.innerHTML = "";

  let filtered;

  if (filter === "التي تم الرد عليها") {
    filtered = conversations.filter(c => c.hasReplied === true);
  } else if (filter === "التي لم يتم الرد عليها") {
    filtered = conversations.filter(c => c.hasReplied === false);
  } else if (filter) {
    filtered = conversations.filter(c => c.sentiment === filter);
  } else {
    filtered = conversations;
  }

  if (filtered.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">لا توجد محادثات</li>`;
    return filtered;  // رجع حتى لو فاضية
  }

  filtered.forEach((conv, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
    li.innerHTML = `
      <div style="flex:1; min-width: 220px;">
        <strong>${conv.name}</strong> <small class="text-muted">${conv.time}</small><br>
        <small>${conv.message}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="sentiment-badge sentiment-${conv.sentiment}">
          <i class="bi ${getIcon(conv.sentiment)}"></i> ${conv.sentiment}
        </span>
        <button class="btn btn-sm btn-outline-primary" aria-label="عرض تفاصيل المحادثة" onclick="openModalFiltered(${index})">عرض</button>
      </div>
    `;
    list.appendChild(li);
  });

  return filtered;



    filtered.forEach((conv, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
      li.innerHTML = `
        <div style="flex:1; min-width: 220px;">
          <strong>${conv.name}</strong> <small class="text-muted">${conv.time}</small><br>
          <small>${conv.message}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
<span class="sentiment-badge sentiment-${conv.messages[0].sentiment}">
<i class="bi ${getIcon(conv.messages[0].sentiment)}"></i> ${conv.messages[0].sentiment}
          </span>
          <button class="btn btn-sm btn-outline-primary" aria-label="عرض تفاصيل المحادثة" onclick="openModal(${index})">عرض</button>
        </div>
      `;
      list.appendChild(li);
    });
  }
let currentFilteredConversations = conversations;

function openModalFiltered(index) {
  // افتح المحادثة بناءً على الفلتر الحالي
  const conv = currentFilteredConversations[index];
  if (!conv) return; // إذا الخطأ صار

  const modalContent = document.getElementById("modalContent");

  const messagesHtml = conv.messages.map(msg =>
    `<div class="mb-3 p-2 rounded" style="background-color: #f9f9f9; border-left: 5px solid ${
      msg.sentiment === 'إيجابي' ? '#198754' :
      msg.sentiment === 'سلبي' ? '#dc3545' : '#6c757d'
    }">
      <strong>${msg.sender}:</strong>
      <span class="sentiment-badge sentiment-${msg.sentiment}" style="font-size:0.9rem; margin-inline-start: 10px;">
        <i class="bi ${getIcon(msg.sentiment)}"></i> ${msg.sentiment}
      </span><br>
      <div style="margin-top: 5px;">${msg.text}</div>
    </div>`
  ).join("");

  const replyForm = !conv.hasReplied ? `
    <div class="mt-4">
      <label for="replyText" class="form-label">الرد على العميل:</label>
      <textarea id="replyText" class="form-control mb-2" rows="3" placeholder="اكتب رد الدعم هنا..."></textarea>

      <label for="replySentiment" class="form-label">تقييم شعور الرد:</label>
      <select id="replySentiment" class="form-select mb-2">
        <option value="إيجابي">إيجابي</option>
                <option value="محايد">محايد</option>

      </select>

      <button class="btn" style="background-color: #6c757d; border-color: #6c757d; color: white;" onclick="sendReplyFiltered(${index})">إرسال</button>
    </div>
  ` : `<div class="alert mt-4" style="background-color:#9b2677; color:#ffffff;">تم الرد على هذه المحادثة بالفعل.</div>`;

  const closeButton = `
    <div class="text-end mt-4">
      <button type="button" class="btn custom-close-btn" data-bs-dismiss="modal">إغلاق</button>
    </div>
  `;

  modalContent.innerHTML = messagesHtml + replyForm + closeButton;

  new bootstrap.Modal(document.getElementById("conversationModal")).show();
}

  function sendReplyFiltered(index) {
  const conv = currentFilteredConversations[index];
  if (!conv || conv.hasReplied) return;

  const textarea = document.getElementById("replyText");
  const replyText = textarea.value.trim();

  const sentimentSelect = document.getElementById("replySentiment");
  const replySentiment = sentimentSelect.value;

  if (replyText === "") {
    Swal.fire({
      icon: "warning",
      title: "تنبيه",
      text: "يرجى كتابة رسالة قبل الإرسال.",
      customClass: {
        popup: 'custom-swal-popup',
        icon: 'custom-swal-icon',
        confirmButton: 'custom-swal-button'
      }
    });
    return;
  }

  conv.messages.push({
    sender: "الدعم",
    text: replyText,
    sentiment: replySentiment
  });

  conv.hasReplied = true;

  Swal.fire({
    icon: "success",
    title: "تم الإرسال بنجاح",
    showConfirmButton: false,
    timer: 1500
  });

  updateReplyCounts();
  // إعادة عرض المحادثات مع نفس الفلتر الحالي:
  renderConversations(document.getElementById("sentimentFilter").value);

  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('conversationModal'));
    if (modal) modal.hide();
  }, 1600);
}

  document.getElementById("sentimentFilter").addEventListener("change", (e) => {
  currentFilteredConversations = renderConversations(e.target.value);
});

 setTimeout(() => {
  loading.style.display = "none";
  currentFilteredConversations = renderConversations();
  updateReplyCounts();
}, 1200);


