  // البيانات التجريبية للرسم البياني بناءً على المحادثات
  const positiveCount = conversations.filter(c => c.sentiment === "إيجابي").length;
  const negativeCount = conversations.filter(c => c.sentiment === "سلبي").length;
  const neutralCount = conversations.filter(c => c.sentiment === "محايد").length;
  const allCount = conversations.length;

  // إظهار قسم الرسوم البيانية بعد التحميل
  document.getElementById("chartsSection").style.display = "block";

  // إنشاء الرسم البياني للمحادثات الإيجابية
  new Chart(document.getElementById("positiveChart"), {
    type: 'doughnut',
    data: {
      labels: ['إيجابي', 'باقي'],
      datasets: [{
        data: [positiveCount, allCount - positiveCount],
        backgroundColor: ['#198754', '#e9ecef'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false }
      }
    }
  });

  // الرسم البياني للمحادثات السلبية
  new Chart(document.getElementById("negativeChart"), {
    type: 'doughnut',
    data: {
      labels: ['سلبي', 'باقي'],
      datasets: [{
        data: [negativeCount, allCount - negativeCount],
        backgroundColor: ['#dc3545', '#e9ecef'],
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // الرسم البياني للمحادثات المحايدة
  new Chart(document.getElementById("neutralChart"), {
    type: 'doughnut',
    data: {
      labels: ['محايد', 'باقي'],
      datasets: [{
        data: [neutralCount, allCount - neutralCount],
        backgroundColor: ['#6c757d', '#e9ecef'],
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // الرسم البياني لكل المحادثات (مثلاً تمثيل نسبة كل نوع)
  new Chart(document.getElementById("allChart"), {
    type: 'pie',
    data: {
      labels: ['إيجابي', 'سلبي', 'محايد'],
      datasets: [{
        data: [positiveCount, negativeCount, neutralCount],
        backgroundColor: ['#198754', '#dc3545', '#6c757d'],
      }]
    },
    options: { responsive: true }
  });
