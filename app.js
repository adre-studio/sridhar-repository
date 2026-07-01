// ===== DermaScan AI - Skin Disease Identifier =====

// Disease database (simulated AI knowledge base)
const DISEASE_DB = [
  {
    name: "Melanoma",
    type: "Malignant Skin Cancer",
    icon: "\u{1F534}",
    severity: "high",
    description: "Melanoma is the most dangerous form of skin cancer, developing in melanocytes. Early detection via the ABCDE rule (Asymmetry, Border, Color, Diameter, Evolving) is critical for successful treatment.",
    recommendations: [
      "Seek immediate consultation with a dermatologist",
      "Schedule a full-body skin examination",
      "Monitor all moles for changes in size, shape, or color",
      "Use broad-spectrum SPF 50+ sunscreen daily",
      "Avoid UV tanning beds and excessive sun exposure"
    ]
  },
  {
    name: "Basal Cell Carcinoma",
    type: "Non-Melanoma Skin Cancer",
    icon: "\u{1F7E0}",
    severity: "medium",
    description: "Basal Cell Carcinoma (BCC) is the most common form of skin cancer. It typically appears as a pearly or waxy bump on sun-exposed areas. While rarely metastatic, early treatment prevents local tissue damage.",
    recommendations: [
      "Consult a dermatologist for biopsy confirmation",
      "Consider Mohs surgery for precise removal",
      "Apply sunscreen SPF 30+ regularly",
      "Perform monthly self-skin examinations",
      "Wear protective clothing during outdoor activities"
    ]
  },
  {
    name: "Eczema (Atopic Dermatitis)",
    type: "Inflammatory Skin Condition",
    icon: "\u{1F7E1}",
    severity: "low",
    description: "Eczema is a chronic inflammatory condition causing itchy, red, and dry skin. It often appears in childhood and can be triggered by allergens, irritants, or stress. Management focuses on hydration and avoiding triggers.",
    recommendations: [
      "Apply fragrance-free moisturizer twice daily",
      "Use gentle, hypoallergenic cleansers",
      "Avoid known irritants and allergens",
      "Consider topical corticosteroid creams as prescribed",
      "Use a humidifier in dry environments"
    ]
  },
  {
    name: "Psoriasis",
    type: "Autoimmune Skin Disorder",
    icon: "\u{1F7E3}",
    severity: "medium",
    description: "Psoriasis is a chronic autoimmune condition causing rapid skin cell buildup, resulting in thick, silvery scales and red patches. It commonly affects elbows, knees, and scalp, and may be associated with psoriatic arthritis.",
    recommendations: [
      "Consult a dermatologist for personalized treatment plan",
      "Apply prescribed topical treatments consistently",
      "Moisturize skin regularly to reduce scaling",
      "Manage stress through relaxation techniques",
      "Consider phototherapy under medical supervision"
    ]
  },
  {
    name: "Acne Vulgaris",
    type: "Inflammatory Skin Condition",
    icon: "\u{1F7E4}",
    severity: "low",
    description: "Acne vulgaris is a common skin condition caused by clogged hair follicles, excess oil production, and bacteria. It manifests as pimples, blackheads, and cysts, primarily on the face, chest, and back.",
    recommendations: [
      "Cleanse face twice daily with gentle, non-comedogenic products",
      "Avoid picking or squeezing blemishes",
      "Use oil-free, non-comedogenic skincare products",
      "Consider over-the-counter benzoyl peroxide or salicylic acid",
      "Consult a dermatologist for persistent or severe acne"
    ]
  },
  {
    name: "Rosacea",
    type: "Chronic Vascular Condition",
    icon: "\u{1F338}",
    severity: "low",
    description: "Rosacea is a chronic condition causing facial redness, visible blood vessels, and sometimes pus-filled bumps. It typically affects the central face and can be triggered by heat, spicy foods, alcohol, and stress.",
    recommendations: [
      "Identify and avoid personal triggers",
      "Use gentle, fragrance-free skincare products",
      "Apply green-tinted sunscreen daily (SPF 30+)",
      "Consider prescribed topical metronidazole or azelaic acid",
      "Limit alcohol, hot beverages, and spicy foods"
    ]
  },
  {
    name: "Tinea (Fungal Infection)",
    type: "Fungal Skin Infection",
    icon: "\u{1F7E2}",
    severity: "low",
    description: "Tinea (ringworm) is a common fungal infection appearing as ring-shaped, red, scaly patches. It can affect the body, scalp, feet (athlete's foot), and groin area. It is contagious through direct contact.",
    recommendations: [
      "Apply antifungal cream (clotrimazole or terbinafine) twice daily",
      "Keep affected area clean and dry",
      "Avoid sharing towels or personal items",
      "Wear breathable, moisture-wicking fabrics",
      "Complete the full course of antifungal treatment"
    ]
  },
  {
    name: "Vitiligo",
    type: "Pigmentary Disorder",
    icon: "\u26AA",
    severity: "low",
    description: "Vitiligo is an autoimmune condition causing loss of skin pigment in patches. It occurs when melanocytes are destroyed and can affect any body area. While not contagious or life-threatening, it can impact self-esteem.",
    recommendations: [
      "Consult a dermatologist for treatment options",
      "Consider topical corticosteroids or calcineurin inhibitors",
      "Use high-SPF sunscreen to protect depigmented areas",
      "Explore phototherapy (narrowband UVB) options",
      "Seek psychological support if affecting quality of life"
    ]
  },
  {
    name: "Contact Dermatitis",
    type: "Allergic Skin Reaction",
    icon: "\u{1F536}",
    severity: "low",
    description: "Contact dermatitis occurs when skin reacts to an allergen or irritant, causing redness, itching, and sometimes blisters. Common triggers include nickel, fragrances, latex, and certain plants like poison ivy.",
    recommendations: [
      "Identify and avoid the triggering substance",
      "Apply cool compresses to soothe affected areas",
      "Use over-the-counter hydrocortisone cream for mild cases",
      "Take oral antihistamines for itching relief",
      "See a dermatologist for patch testing if recurring"
    ]
  },
  {
    name: "Seborrheic Keratosis",
    type: "Benign Skin Growth",
    icon: "\u{1FAD8}",
    severity: "low",
    description: "Seborrheic keratoses are common, non-cancerous skin growths that appear as waxy, stuck-on bumps. They are usually brown or black and become more common with age. They are harmless but may be removed for cosmetic reasons.",
    recommendations: [
      "No treatment required unless cosmetically desired",
      "Monitor for rapid changes in appearance",
      "Consult a dermatologist if growth bleeds or irritates",
      "Consider cryotherapy or curettage for removal",
      "Do not attempt to scratch or pick off growths"
    ]
  }
];

// Loading messages for realistic AI feel
const LOADING_MESSAGES = [
  "Initializing neural network...",
  "Loading dermatological dataset...",
  "Preprocessing image data...",
  "Extracting skin lesion features...",
  "Running convolutional neural network...",
  "Analyzing texture patterns...",
  "Comparing against 150,000+ reference images...",
  "Calculating diagnostic confidence...",
  "Generating clinical report..."
];

// ===== DOM ELEMENTS =====
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('previewArea');
const previewImage = document.getElementById('previewImage');
const scanLine = document.getElementById('scanLine');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsIdle = document.getElementById('resultsIdle');
const resultsLoading = document.getElementById('resultsLoading');
const resultsData = document.getElementById('resultsData');
const loadingText = document.getElementById('loadingText');
const loadingBarFill = document.getElementById('loadingBarFill');
const resultPrimary = document.getElementById('resultPrimary');
const resultConfidence = document.getElementById('resultConfidence');
const resultDetails = document.getElementById('resultDetails');
const resultRecommendations = document.getElementById('resultRecommendations');
const newScanBtn = document.getElementById('newScanBtn');

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    if (Math.random() > 0.5) p.style.background = '#b400ff';
    container.appendChild(p);
  }
}
createParticles();

// ===== UPLOAD HANDLERS =====
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) handleFile(file);
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    uploadZone.style.display = 'none';
    previewArea.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// ===== ANALYSIS =====
analyzeBtn.addEventListener('click', startAnalysis);
resetBtn.addEventListener('click', resetAll);
newScanBtn.addEventListener('click', resetAll);

function startAnalysis() {
  // Show scan line on image
  scanLine.classList.add('active');

  // Switch results to loading
  resultsIdle.style.display = 'none';
  resultsLoading.style.display = 'flex';
  resultsData.style.display = 'none';

  // Animate loading messages + bar
  let msgIndex = 0;
  let progress = 0;
  const totalDuration = 4000;
  const interval = totalDuration / LOADING_MESSAGES.length;

  const msgTimer = setInterval(() => {
    if (msgIndex < LOADING_MESSAGES.length) {
      loadingText.textContent = LOADING_MESSAGES[msgIndex];
      msgIndex++;
    }
  }, interval);

  const barTimer = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;
    loadingBarFill.style.width = progress + '%';
  }, totalDuration / 50);

  setTimeout(() => {
    clearInterval(msgTimer);
    clearInterval(barTimer);
    loadingBarFill.style.width = '100%';
    loadingText.textContent = 'Analysis complete!';

    setTimeout(() => {
      scanLine.classList.remove('active');
      showResults();
    }, 500);
  }, totalDuration);
}

function showResults() {
  // Pick a random disease for simulation
  const primary = DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)];

  // Generate confidence scores
  const primaryConf = (70 + Math.random() * 25).toFixed(1);
  const others = [];
  const used = [primary.name];

  while (others.length < 3) {
    const candidate = DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)];
    if (!used.includes(candidate.name)) {
      used.push(candidate.name);
      others.push({
        disease: candidate,
        score: (5 + Math.random() * 20).toFixed(1)
      });
    }
  }

  // Render Primary Result
  const severityClass = `severity-${primary.severity}`;
  const severityLabel = primary.severity === 'high' ? 'HIGH RISK' : primary.severity === 'medium' ? 'MODERATE' : 'LOW RISK';

  resultPrimary.innerHTML = `
    <div class="disease-icon">${primary.icon}</div>
    <div>
      <div class="disease-name">${primary.name}</div>
      <div class="disease-type">${primary.type}</div>
      <span class="severity-badge ${severityClass}">${severityLabel}</span>
    </div>
  `;

  // Render Confidence Bars
  const fillClasses = ['fill-cyan', 'fill-purple', 'fill-pink', 'fill-dim'];
  let confidenceHTML = `<h3>DIFFERENTIAL DIAGNOSIS</h3>`;
  confidenceHTML += `
    <div class="confidence-item">
      <span class="confidence-label">${primary.name}</span>
      <div class="confidence-bar"><div class="confidence-fill ${fillClasses[0]}" data-width="${primaryConf}%"></div></div>
      <span class="confidence-value">${primaryConf}%</span>
    </div>
  `;
  others.forEach((o, i) => {
    confidenceHTML += `
      <div class="confidence-item">
        <span class="confidence-label">${o.disease.name}</span>
        <div class="confidence-bar"><div class="confidence-fill ${fillClasses[i + 1]}" data-width="${o.score}%"></div></div>
        <span class="confidence-value">${o.score}%</span>
      </div>
    `;
  });
  resultConfidence.innerHTML = confidenceHTML;

  // Render Details
  resultDetails.innerHTML = `
    <h3>CLINICAL DESCRIPTION</h3>
    <p>${primary.description}</p>
  `;

  // Render Recommendations
  let recsHTML = `<h3>RECOMMENDED ACTIONS</h3><ul>`;
  primary.recommendations.forEach(r => { recsHTML += `<li>${r}</li>`; });
  recsHTML += `</ul>`;
  resultRecommendations.innerHTML = recsHTML;

  // Show results
  resultsLoading.style.display = 'none';
  resultsData.style.display = 'block';

  // Animate confidence bars
  setTimeout(() => {
    document.querySelectorAll('.confidence-fill[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 100);
}

function resetAll() {
  // Reset upload
  uploadZone.style.display = 'block';
  previewArea.style.display = 'none';
  scanLine.classList.remove('active');
  fileInput.value = '';

  // Reset results
  resultsIdle.style.display = 'flex';
  resultsLoading.style.display = 'none';
  resultsData.style.display = 'none';
  loadingBarFill.style.width = '0%';
}
