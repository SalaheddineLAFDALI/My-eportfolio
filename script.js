document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------------------------------
    // 1. Logic for MAIN Navigation Tabs (Global sections)
    // ------------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Désactivation des onglets principaux
            tabContents.forEach(content => { content.classList.remove('active'); });
            navButtons.forEach(btn => { btn.classList.remove('active'); });

            // Activation de l'onglet cliqué
            const activeContent = document.getElementById(targetTab);
            if (activeContent) { activeContent.classList.add('active'); }
            this.classList.add('active');
            
            // --- Logique Spécifique pour la section "Engineering Course" ---
            if (targetTab === 'engineering') {
                 // S'assurer que S5 est actif par défaut lorsqu'on arrive sur "Engineering Course"
                 const s5Content = document.getElementById('s5');
                 if (s5Content) s5Content.classList.add('active');
                 
                 const s5Button = document.querySelector('.sub-nav-button[data-semester="s5"]');
                 if (s5Button) s5Button.classList.add('active');
            }
        });
    });

    // Activation par défaut du tab "Welcome" au chargement
    const initialWelcomeTab = document.getElementById('welcome');
    if (initialWelcomeTab && !document.querySelector('.nav-button.active')) {
        initialWelcomeTab.classList.add('active');
        const welcomeButton = document.querySelector('.nav-button[data-tab="welcome"]');
        if (welcomeButton) welcomeButton.classList.add('active');
    }
    
    // ------------------------------------------------------------------
    // 2. Logic for SEMESTER Sub-Tabs (Inside Engineering Course)
    // ------------------------------------------------------------------
    const subNavButtons = document.querySelectorAll('.sub-nav-button');
    const semesterContents = document.querySelectorAll('.semester-content');
    
    subNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSemester = this.getAttribute('data-semester');
            
            // 1. Désactiver tous les boutons de semestre
            subNavButtons.forEach(btn => { btn.classList.remove('active'); });
            
            // 2. Désactiver tout le contenu de semestre
            semesterContents.forEach(content => { content.classList.remove('active'); });
            
            // 3. Activer le bouton cliqué et le contenu correspondant
            this.classList.add('active');
            const activeSemesterContent = document.getElementById(targetSemester);
            if (activeSemesterContent) {
                activeSemesterContent.classList.add('active');
            }
        });
    });

    // ------------------------------------------------------------------
    // 3. Logic for Module Accordion (Inside Semesters)
    // ------------------------------------------------------------------
    const moduleTitles = document.querySelectorAll('.module-title');

    moduleTitles.forEach(title => {
        title.addEventListener('click', function() {
            const detailsId = this.getAttribute('data-module');
            const details = document.getElementById(detailsId);
            const isExpanded = this.classList.contains('expanded');

            // Fermer tous les autres modules dans le même semestre
            const parentSemester = this.closest('.semester-content');
            parentSemester.querySelectorAll('.module-title').forEach(t => {
                t.classList.remove('expanded');
                const currentDetails = document.getElementById(t.getAttribute('data-module'));
                if (currentDetails) {
                    currentDetails.style.display = 'none';
                }
            });
            
            // Si l'élément n'était pas déjà ouvert, l'ouvrir
            if (!isExpanded) {
                this.classList.add('expanded');
                if (details) {
                    details.style.display = 'block'; 
                }
            }
        });
    });


    // ------------------------------------------------------------------
    // 4. Generation of Digital Rain Lines
    // ------------------------------------------------------------------
    const numberOfLines = 50;
    const screenWidth = window.innerWidth;
    const bodyElement = document.body;

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.left = Math.random() * screenWidth + "px";
        line.style.animationDelay = Math.random() * 5 + "s";
        line.style.animationDuration = 2.5 + Math.random() * 2 + "s";
        bodyElement.appendChild(line);
    }
});
// ------------------------------------------------------
// 🌟 Image Click → Open Fullscreen Modal
// ------------------------------------------------------
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});
