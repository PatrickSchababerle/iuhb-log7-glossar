/**
 * Main JavaScript-Datei für das Log7-Consult GmbH Online-Glossar
 * Enthält alle Funktionalitäten für alle Seiten des Glossars
 */

// Wird ausgeführt, wenn die Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Letzte Aktualisierung anzeigen (auf allen Seiten)
    updateLastModified();

    // Back-to-Top Button Funktionalität (auf allen Detailseiten)
    setupBackToTop();

    // Suchfunktion (nur auf der Startseite)
    setupSearch();
});

/**
 * Zeigt das Datum der letzten Aktualisierung im Footer an
 */
function updateLastModified() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `Letzte Aktualisierung: ${new Date().toLocaleString('de-DE')}`;
    }
}

/**
 * Richtet die Back-to-Top Button Funktionalität ein
 */
function setupBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Button nur anzeigen, wenn der Nutzer nach unten scrollt
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '0.7';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
}

/**
 * Richtet die Suchfunktion für das Glossar ein
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchResults) {
        // Glossar-Begriffe und Pfade (im echten Projekt würde dies dynamisch geladen)
        const glossaryTerms = [
            { term: 'Supply Chain Management', path: 'supply-chain-management.html', category: 'Logistik',
                description: 'Strategische Koordination und Optimierung aller Prozesse entlang der Wertschöpfungskette' },
            { term: 'Just-in-Time', path: 'just-in-time.html', category: 'Logistik',
                description: 'Produktionsstrategie zur Minimierung der Lagerbestände durch zeitgenaue Anlieferung' },
            { term: 'API', path: 'api.html', category: 'IT',
                description: 'Schnittstelle zur Anwendungsprogrammierung, die Interaktionen zwischen Softwarekomponenten ermöglicht' },
            { term: 'Cloud Computing', path: 'cloud-computing.html', category: 'IT',
                description: 'Bereitstellung von IT-Ressourcen über das Internet ohne lokale Infrastruktur' },
            { term: 'Customer Journey', path: 'customer-journey.html', category: 'Marketing',
                description: 'Der Weg eines Kunden über alle Berührungspunkte mit einem Unternehmen hinweg' },
            { term: 'Cross Docking', path: '#', category: 'Logistik',
                description: 'Umschlagkonzept, bei dem Waren ohne Zwischenlagerung direkt vom Wareneingang zum Warenausgang transferiert werden' },
            { term: 'Incoterms', path: '#', category: 'Logistik',
                description: 'Internationale Handelsklauseln, die Rechte und Pflichten zwischen Käufer und Verkäufer regeln' },
            { term: 'Last Mile Delivery', path: '#', category: 'Logistik',
                description: 'Der letzte Abschnitt des Lieferprozesses zum Endkunden' },
            { term: 'ERP-System', path: '#', category: 'IT',
                description: 'Software zur integrierten Verwaltung interner und externer Ressourcen eines Unternehmens' },
            { term: 'Business Intelligence', path: '#', category: 'IT',
                description: 'Methoden und Prozesse zur systematischen Analyse von Geschäftsdaten' },
            { term: 'IoT in der Logistik', path: '#', category: 'IT',
                description: 'Einsatz vernetzter Geräte und Sensoren in logistischen Prozessen' },
            { term: 'Content Marketing', path: '#', category: 'Marketing',
                description: 'Marketingstrategie, die auf die Erstellung wertvoller Inhalte zur Kundengewinnung setzt' },
            { term: 'SEO', path: '#', category: 'Marketing',
                description: 'Maßnahmen zur Verbesserung der Sichtbarkeit in Suchmaschinen' },
            { term: 'Conversion Rate', path: '#', category: 'Marketing',
                description: 'Verhältnis zwischen Besuchern und gewünschten Aktionen auf einer Website' },
            { term: 'KPI', path: '#', category: 'Marketing',
                description: 'Kennzahlen zur Messung des Erfolgs von Aktivitäten und Prozessen' }
        ];

        // Suchfunktionalität
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();

            if (searchTerm.length < 2) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
                return;
            }

            const filteredTerms = glossaryTerms.filter(item =>
                item.term.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );

            searchResults.innerHTML = '';

            if (filteredTerms.length > 0) {
                const resultList = document.createElement('ul');

                filteredTerms.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${item.path}">${item.term}</a> <span>(${item.category})</span>: ${item.description}`;
                    resultList.appendChild(listItem);
                });

                searchResults.appendChild(resultList);
            } else {
                searchResults.innerHTML = '<p class="no-results">Keine Ergebnisse gefunden.</p>';
            }

            searchResults.classList.add('active');
        });

        // Klick außerhalb des Suchergebnisses schließt dieses
        document.addEventListener('click', function(event) {
            if (!searchResults.contains(event.target) && event.target !== searchInput) {
                searchResults.classList.remove('active');
            }
        });
    }
}

/**
 * Erweiterte Funktionen für zukünftige Implementierungen
 */

// Funktion für einen einfachen Lightbox-Effekt für Bilder/Diagramme
function setupLightbox() {
    const diagrams = document.querySelectorAll('.scm-process-diagram, .cloud-diagram, .api-diagram, .journey-map');

    diagrams.forEach(diagram => {
        diagram.addEventListener('click', function() {
            // Hier könnte eine Lightbox-Implementierung erfolgen
            console.log('Lightbox für Diagramm geöffnet');
        });
    });
}

// Funktion zur Speicherung des letzten besuchten Begriffs
function saveLastVisitedTerm() {
    // Aktuelle Seite speichern
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html' && currentPage !== '') {
        localStorage.setItem('lastVisitedTerm', currentPage);
    }

    // Link zur letzten besuchten Seite anzeigen
    const lastTermContainer = document.getElementById('lastVisitedTerm');
    if (lastTermContainer) {
        const lastTerm = localStorage.getItem('lastVisitedTerm');
        if (lastTerm) {
            lastTermContainer.innerHTML = `<a href="${lastTerm}">Zuletzt besucht</a>`;
        }
    }
}

// Funktion für Text-to-Speech Vorlesefunktion
function setupTextToSpeech() {
    const readButtons = document.querySelectorAll('.read-aloud');

    if ('speechSynthesis' in window) {
        readButtons.forEach(button => {
            button.addEventListener('click', function() {
                const textToRead = this.getAttribute('data-text') ||
                    document.querySelector(this.getAttribute('data-target')).textContent;

                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'de-DE';
                window.speechSynthesis.speak(utterance);
            });
        });
    } else {
        readButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}

// Funktion für Print-freundliche Version
function setupPrintVersion() {
    const printButton = document.getElementById('printButton');

    if (printButton) {
        printButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
}

// Funktion für Feedback-Formular
function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const termName = document.querySelector('h2').textContent;
            const feedbackText = document.getElementById('feedbackText').value;

            // Hier könnte eine Funktion zum Senden des Feedbacks implementiert werden
            console.log(`Feedback zu "${termName}": ${feedbackText}`);

            alert('Vielen Dank für Ihr Feedback!');
            this.reset();
        });
    }
}