  let currentSentiment = "إيجابي";
  let currentRange = 7;

  const sentimentSelect = document.getElementById('sentimentSelect');
  const rangeSelect = document.getElementById('rangeSelect');
  const sentimentCards = document.querySelectorAll('.sentiment-card');
  const chartCanvas = document.getElementById('sentimentChart').getContext('2d');

  // إنشاء الرسم البياني
  let sentimentChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'عدد الرسائل',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // دالة تحديث الرسم البياني
  function updateSentimentChart() {
    let labels = [];
    let data = [];

    if (currentRange === 7) {
      labels = ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'];
    } else if (currentRange === 30) {
      labels = Array.from({length: 30}, (_, i) => `اليوم ${i+1}`);
    } else {
      labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    }

    data = labels.map(() => {
      if (currentSentiment === "إيجابي") return Math.floor(Math.random() * 100);
      if (currentSentiment === "سلبي") return Math.floor(Math.random() * 50);
      if (currentSentiment === "محايد") return Math.floor(Math.random() * 75);
    });

    sentimentChart.data.labels = labels;
    sentimentChart.data.datasets[0].data = data;
    sentimentChart.data.datasets[0].backgroundColor =
      currentSentiment === "إيجابي" ? 'rgba(40, 167, 69, 0.5)' :
      currentSentiment === "سلبي" ? 'rgba(220, 53, 69, 0.5)' :
      'rgba(108, 117, 125, 0.5)';

    sentimentChart.update();

    sentimentSelect.value = currentSentiment;
    rangeSelect.value = currentRange;
  }

  // عند الضغط على كروت النسبة
  sentimentCards.forEach(card => {
    card.addEventListener('click', () => {
      currentSentiment = card.getAttribute('data-sentiment');
      sentimentSelect.value = currentSentiment;

      // تظليل الكارد المختار
      sentimentCards.forEach(c => c.classList.remove('active-sentiment'));
      card.classList.add('active-sentiment');

      updateSentimentChart();

      // تمرير سلس للقسم
      document.getElementById('chartSection').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // عند تغيير المدة الزمنية
  rangeSelect.addEventListener('change', () => {
    currentRange = parseInt(rangeSelect.value);
    updateSentimentChart();
  });

  // عند تغيير الشعور من الـ select (اختياري)
  sentimentSelect.addEventListener('change', () => {
    currentSentiment = sentimentSelect.value;

    // تمييز الكارد المناسب
    sentimentCards.forEach(c => {
      if (c.getAttribute('data-sentiment') === currentSentiment) {
        c.classList.add('active-sentiment');
      } else {
        c.classList.remove('active-sentiment');
      }
    });

    updateSentimentChart();
  });

  // تنسيق تمييز الكارد المختار
  const style = document.createElement('style');
  style.textContent = `
    .sentiment-card.active-sentiment {
      border: 2px solid #c20079;
      box-shadow: 0 0 10px rgba(13, 110, 253, 0.5);
    }
    .sentiment-card {
      transition: box-shadow 0.3s, border 0.3s;
    }
  `;
  document.head.appendChild(style);

  // أول تحميل
  updateSentimentChart();
