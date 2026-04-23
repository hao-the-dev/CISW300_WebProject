# Via Health

This project was developed collaboratively as part of CISW300.

A decision-first mentorship platform that helps students navigate healthcare careers by making tradeoffs, risks, and next steps clear.

---

## 🚀 Overview

Via Health helps students make informed decisions about healthcare careers by combining:

- Interactive decision tools  
- Real mentor insights  
- Actionable next steps  

Instead of overwhelming users with information, the platform focuses on **decision-making at key inflection points**.

---

## 🧩 Problem

Students exploring healthcare careers often face:

- Too much information, not enough guidance  
- Conflicting advice from different sources  
- Unclear tradeoffs between paths (time, cost, lifestyle)  

Via Health is designed to reduce that uncertainty by focusing on **decisions—not just information**.

---

## ⚙️ Features

### Core
- Pathway exploration (EMT, PA, Pre-Med, Nursing, etc.)
- Decision-focused prompts (apply now vs. gain experience)
- Mentor preview cards (experience-based, not just titles)

### Interactive Elements
- Decision Lab (user input → recommended paths)
- Tradeoff sliders (income, time, lifestyle)
- Path collision detection (identifies conflicting goals)
- Decision confidence scoring

### UX Focus
- Clean, minimal interface
- Card-based layout for clarity
- Mobile-responsive design
- Multi-path navigation (users choose their own flow)

---

## 🧠 Design Philosophy

Most platforms give information.

Via Health focuses on:
> “What should I do next?”

The system is designed to:
- Prioritize decisions over content  
- Surface tradeoffs clearly  
- Reduce ambiguity at key decision points  
- Connect users with people who recently made similar choices  

---

## 🛠️ Tech Stack

- HTML  
- CSS (custom, no framework)  
- JavaScript (vanilla)  
- Supabase (for form data storage)

---

## 📁 Structure
myImages/ → assets (logos, images)
Index.html → landing page
About.html → mission + team
Program.html → pathways + decision lab
Resources.html → recommendation system
Mentorship.html → mentorship intake form
navbar.html → reusable navigation component
style.css → global + page styles
script.js → interactivity


---

## 🔧 Running Locally

1. Open project in VS Code  
2. Right-click `Index.html`  
3. Select **"Open with Live Server"**  
4. Navigate through pages using the navbar  

---

## 📌 Status

In active development:

- Refining decision tools  
- Expanding pathway depth  
- Improving recommendation logic  
- Connecting all navigation routes across pages  

---

## ✨ Future Improvements

- “Regret Simulator” (compare real tradeoffs between paths like MD vs PA)  
- Decision-stage mentor matching (match users to mentors based on *where they are in the decision process*)  
- Personalized pathway timelines (visualizing years, cost, and milestones)  
- Full backend integration for dynamic recommendations  

---

## 👥 Team Contributions

### Sarah Y.
- Led overall product direction and UX strategy  
- Designed full-site visual system (color, layout, typography)  
- Created initial design mockups in Canva (included in repository)  
- Built the **landing page (Index.html)** including:
  - Multi-path navigation structure  
  - “Explore Pathways” and “Find Mentorship” sections  
  - Decision-focused layout guiding users to next steps  
- Developed the **Programs page**, including:
  - Pathway exploration UI  
  - Decision Lab (interactive recommendation system)  
  - Mentor guidance entry points  
- Implemented key interactive features:
  - Tradeoff sliders  
  - Path collision detection  
  - Confidence scoring system  
- Refactored and organized CSS for scalability and consistency  

---

### Pratham
- Contributed to landing page structure and navigation flow  
- Implemented multi-option user pathways for exploration  
- Built sections linking users to deeper content (Explore Pathways, Mentorship)  
- Developed foundational structure for Programs page:
  - Pathway application flow  
  - Mentor request functionality  
- Designed user journey flow across pages  
- Note: Some linked pages and navigation routes are still in progress and will be fully connected as development continues  

---

### Hao
- Designed and implemented the **shared navigation bar component**  
  - Modularized into `navbar.html` for reuse across pages  
- Set up **Supabase cloud database integration**  
  - Connected mentorship form to backend storage  
  - Ensured form submissions are captured in a database table  
- Handled backend research and system integration decisions  

---

## 📌 Notes

- Some features and page links are still under development  
- Navigation buttons will be fully connected as additional pages are completed  
- Canva design mockups are included in the repository for reference  