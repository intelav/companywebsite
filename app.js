// Wait until the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Content Loading ---
    const coursesContainer = document.querySelector('#courses .card-container');
    const researchContainer = document.querySelector('#research .card-container');

    // Fetch the data from our JSON file, only if the containers exist on the page
    if (coursesContainer || researchContainer) {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (coursesContainer) {
                    loadCourses(data.courses, coursesContainer);
                }
                if (researchContainer) {
                    loadResearch(data.research, researchContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
                if (coursesContainer) {
                    coursesContainer.innerHTML = '<p>Could not load course data.</p>';
                }
                if (researchContainer) {
                    researchContainer.innerHTML = '<p>Could not load research data.</p>';
                }
            });
    }
});

/**
 * Loads course cards into the specified container element.
 * @param {Array<Object>} courses - An array of course objects.
 * @param {HTMLElement} container - The container element to append cards to.
 */
function loadCourses(courses, container) {
    container.innerHTML = '';
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
        `;
        container.appendChild(card);
    });
}

/**
 * Loads research paper cards into the specified container element.
 * @param {Array<Object>} papers - An array of research paper objects.
 * @param {HTMLElement} container - The container element to append cards to.
 */
function loadResearch(papers, container) {
    container.innerHTML = '';
    papers.forEach(paper => {
        const card = document.createElement('div');
        card.className = `card research-card ${paper.disabled ? 'placeholder' : ''}`;
        const buttonText = paper.disabled ? 'Coming Soon' : 'Read Paper';
        const buttonDisabledClass = paper.disabled ? 'disabled' : '';
        card.innerHTML = `
            <i class="${paper.icon}"></i>
            <h4>${paper.title}</h4>
            <p>${paper.description}</p>
            <a href="${paper.url}" target="_blank" class="btn-secondary ${buttonDisabledClass}">${buttonText}</a>
        `;
        container.appendChild(card);
    });
}
