window.onload = function() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
                const logo = "myImages/OIP-4278803273.jpg";
                document.getElementById("logo").src = logo;
            })
            .catch(err => console.error("Could not load navbar:", err));
    }
};

// Supabase client setup //
const SUPABASE_URL = 'https://zrgbbcrbmlpbwziyfjhn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZvMlt5toiMdUOn6fEmRAWQ_KuWmgFnw';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const mentorshipForm = document.getElementById('mentorship-form');

async function mentorshipFormSubmit(event) {
    event.preventDefault(); // This is the most important line!
    // Grab the values from your inputs
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const addressValue = document.getElementById('address').value;
    const countyValue = document.getElementById('county').value;
    const cityValue = document.getElementById('city').value;
    const zipValue = document.getElementById('zip').value;
    const supportTypeValue = Array.from(document.querySelectorAll('input[name="support_type"]:checked')).map(checkbox => checkbox.value);
    const requestTypeValue = document.querySelector('input[name="request_type"]:checked')?.value || "None Selected";
    const helpAreasValue = Array.from(document.querySelectorAll('input[name="areas"]:checked')).map(checkbox => checkbox.value);
    const interestedProgramValue = document.getElementById('program').value;
    const educationLevelValue = document.getElementById('level').value;
    const urgencyValue = document.querySelector('input[name="urgency"]:checked')?.value || "None Selected";
    const deadlineValue = document.getElementById('deadline').value;
    const referralValue = document.getElementById('referral').value;
    const commentValue = document.getElementById('comments').value;

    // Send the data to your "form_submissions" table
    const { data, error } = await supabaseClient
        .from('mentorshipForm') 
        .insert([{ 
            Name: nameValue,
            Email: emailValue,
            Address: addressValue,
            County: countyValue,
            City: cityValue,
            Zipcode: zipValue,
            Support_Type: supportTypeValue,
            Request_Type: requestTypeValue,
            Help_Areas: helpAreasValue,
            Interested_Program: interestedProgramValue,
            Education_Level: educationLevelValue,
            Urgency: urgencyValue,
            Deadline: deadlineValue,
            Referral: referralValue,
            Comment: commentValue


        }]);

    if (error) {
        console.error("Error sending to cloud:", error.message);
        alert("Upload failed.");
    } else {
        event.target.reset(); 
    }
}
document.addEventListener("DOMContentLoaded", () => {
  const choiceRows = document.querySelectorAll(".choice-row");
  const normalModeBtn = document.getElementById("normalMode");
  const brutalModeBtn = document.getElementById("brutalMode");
  const sliders = {
    training: document.getElementById("trainingSlider"),
    debt: document.getElementById("debtSlider"),
    care: document.getElementById("careSlider"),
  };

  if (!sliders.training || !sliders.debt || !sliders.care) return;

  const state = {
    speed: "fast",
    focus: "patient",
    tolerance: "low",
    brutal: false,
  };

  choiceRows.forEach((row) => {
    row.addEventListener("click", (e) => {
      const btn = e.target.closest(".choice-btn");
      if (!btn) return;

      row.querySelectorAll(".choice-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      state[row.dataset.group] = btn.dataset.value;
      updateDecisionLab();
    });
  });

  normalModeBtn?.addEventListener("click", () => {
    state.brutal = false;
    normalModeBtn.classList.add("active");
    brutalModeBtn.classList.remove("active");
    updateDecisionLab();
  });

  brutalModeBtn?.addEventListener("click", () => {
    state.brutal = true;
    brutalModeBtn.classList.add("active");
    normalModeBtn.classList.remove("active");
    updateDecisionLab();
  });

  Object.values(sliders).forEach((slider) => {
    slider.addEventListener("input", updateDecisionLab);
  });

  function scorePath(path) {
    let score = 50;

    const training = parseInt(sliders.training.value, 10);
    const debt = parseInt(sliders.debt.value, 10);
    const care = parseInt(sliders.care.value, 10);

    if (path === "PA") {
      score += training * 0.18 + debt * 0.16 + care * 0.12;
      if (state.speed === "fast") score += 8;
      if (state.focus === "patient") score += 10;
      if (state.tolerance === "low") score += 8;
    }

    if (path === "RN") {
      score += training * 0.14 + debt * 0.18 + care * 0.14;
      if (state.focus === "stability") score += 10;
      if (state.tolerance === "low") score += 10;
      if (state.speed === "fast") score += 4;
    }

    if (path === "EMT") {
      score += training * 0.2 + debt * 0.12 + care * 0.18;
      if (state.speed === "fast") score += 12;
      if (state.focus === "patient") score += 8;
      if (state.tolerance === "low") score += 4;
    }

    if (path === "MD") {
      score += (100 - training) * 0.18 + (100 - debt) * 0.18 + care * 0.1;
      if (state.speed === "long") score += 12;
      if (state.focus === "research") score += 10;
      if (state.tolerance === "high") score += 12;
    }

    return Math.max(1, Math.min(99, Math.round(score / 2)));
  }

  function updateDecisionLab() {
    const scores = {
      MD: scorePath("MD"),
      PA: scorePath("PA"),
      RN: scorePath("RN"),
      EMT: scorePath("EMT"),
    };

    Object.keys(scores).forEach((path) => {
      const scoreEl = document.getElementById(`score${path}`);
      if (scoreEl) scoreEl.textContent = `${scores[path]}%`;
    });

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topPath, topScore] = ranked[0];

    document.getElementById("topPath").textContent = `${topPath} looks strongest right now.`;
    document.getElementById("confidencePill").textContent = `${topScore}% match`;

    const summaries = {
      MD: state.brutal
        ? "Longest training, highest debt, and major attrition pressure — but highest long-term physician autonomy."
        : "Strong long-term upside, but longer training and higher debt.",
      PA: state.brutal
        ? "Good balance, but still competitive and not magically low-stress."
        : "Strong fit for direct care, shorter training, and lower debt than MD.",
      RN: state.brutal
        ? "Practical and stable, but emotionally demanding and often underestimated."
        : "Practical, stable, and patient-facing with multiple training routes.",
      EMT: state.brutal
        ? "Fast exposure, low barrier, intense realities. Great for testing fit; rough as a fantasy."
        : "Fast exposure and great for testing fit, but not always a long-term endpoint.",
    };

    ["MD", "PA", "RN", "EMT"].forEach((path) => {
      const summaryEl = document.getElementById(`summary${path}`);
      if (summaryEl) summaryEl.textContent = summaries[path];
    });

    const clusterTitle = document.getElementById("clusterTitle");
    const clusterText = document.getElementById("clusterText");
    const actionList = document.getElementById("actionList");
    const collisionBox = document.getElementById("collisionBox");

    if (topPath === "PA") {
      clusterTitle.textContent = "Most students with your profile explored PA first.";
      clusterText.textContent =
        "Students prioritizing direct patient care, lower debt, and shorter training often compare PA, RN, and EMT before committing.";
      actionList.innerHTML = `
        <li>Compare PA prerequisites at 2 California programs.</li>
        <li>Talk to one person in a patient-facing role this week.</li>
        <li>Write down whether you want autonomy, speed, or flexibility most.</li>
      `;
    }

    if (topPath === "RN") {
      clusterTitle.textContent = "Students like you often start by seriously considering nursing.";
      clusterText.textContent =
        "This cluster usually prioritizes stability, direct care, and a more immediate route into the workforce.";
      actionList.innerHTML = `
        <li>Look up RN program timelines near you.</li>
        <li>Compare ADN vs BSN routes.</li>
        <li>Note what kind of patient care environment appeals to you most.</li>
      `;
    }

    if (topPath === "EMT") {
      clusterTitle.textContent = "Students like you often test fit through EMT first.";
      clusterText.textContent =
        "This group usually wants fast exposure and a real-world sense of whether high-intensity care feels right.";
      actionList.innerHTML = `
        <li>Research one EMT program in California.</li>
        <li>Read about what EMT shifts actually look like.</li>
        <li>Decide whether you want exposure fast or training depth first.</li>
      `;
    }

    if (topPath === "MD") {
      clusterTitle.textContent = "Students like you often keep MD in the mix despite the long route.";
      clusterText.textContent =
        "This cluster usually tolerates longer timelines in exchange for broader physician training and long-term optionality.";
      actionList.innerHTML = `
        <li>Map the next 3 years of prerequisites and experiences.</li>
        <li>List what makes the MD path worth the cost to you personally.</li>
        <li>Talk to someone who took a gap year before med school.</li>
      `;
    }

    const training = parseInt(sliders.training.value, 10);
    const debt = parseInt(sliders.debt.value, 10);

    if (training > 75 && debt > 75 && state.speed === "fast") {
      collisionBox.textContent =
        "Path collision detected: you want a fast route and low debt, which narrows your strongest options sharply.";
    } else if (training < 35 && debt < 35 && state.tolerance === "high") {
      collisionBox.textContent =
        "You seem open to longer, more expensive training — that keeps paths like MD more viable.";
    } else {
      collisionBox.textContent =
        "These priorities mostly align. Your strongest-fit paths are staying fairly consistent.";
    }
  }

  updateDecisionLab();
});
const searchInput = document.getElementById("searchInput");
const items = document.querySelectorAll(".pathway-item");

searchInput.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(value) ? "block" : "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".searchable-item");

  let currentFilter = "all";

  function updateResults() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const category = item.dataset.category;

      const matchesSearch = text.includes(searchValue);
      const matchesFilter = currentFilter === "all" || category === currentFilter;

      if (matchesSearch && matchesFilter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateResults);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      updateResults();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".searchable-item");

  let currentFilter = "all";

  function updateResults() {
    const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const category = item.dataset.category;

      const matchesSearch = text.includes(searchValue);
      const matchesFilter = currentFilter === "all" || category === currentFilter;

      item.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", updateResults);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      updateResults();
    });
  });
});