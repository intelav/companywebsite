// Wait until the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // Find the containers in the HTML where we will inject our dynamic content.
    const coursesContainer = document.querySelector('#courses .card-container');
    const researchContainer = document.querySelector('#research .card-container');

    // Fetch the data from our JSON file.
    // The fetch() function returns a "Promise", which is a placeholder for a future value.
    fetch('data.json')
        .then(response => {
            // Check if the network response is successful.
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            // If successful, parse the JSON text into a JavaScript object.
            return response.json();
        })
        .then(data => {
            // Once we have the data, we call our functions to build the HTML.
            // We pass the data and the respective container to each function.
            loadCourses(data.courses, coursesContainer);
            loadResearch(data.research, researchContainer);
        })
        .catch(error => {
            // If anything goes wrong during the fetch process, log the error to the console.
            console.error('Error fetching or parsing data:', error);
            // You could also display an error message to the user on the page.
            coursesContainer.innerHTML = '<p>Could not load course data.</p>';
            researchContainer.innerHTML = '<p>Could not load research data.</p>';
        });
});

/**
 * Loads course cards into the specified container element.
 * @param {Array<Object>} courses - An array of course objects.
 * @param {HTMLElement} container - The container element to append cards to.
 */
function loadCourses(courses, container) {
    // Clear any existing content (like placeholder HTML).
    container.innerHTML = ''; 
    
    // Loop through each course object in the array.
    courses.forEach(course => {
        // Create a new card element.
        const card = document.createElement('div');
        card.className = 'card';
        
        // Set the inner HTML of the card using the data from the course object.
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
        `;
        
        // Add the newly created card to the container.
        container.appendChild(card);
    });
}

/**
 * Loads research paper cards into the specified container element.
 * @param {Array<Object>} papers - An array of research paper objects.
 * @param {HTMLElement} container - The container element to append cards to.
 */
function loadResearch(papers, container) {
    // Clear any existing content.
    container.innerHTML = '';

    // Loop through each paper object.
    papers.forEach(paper => {
        const card = document.createElement('div');
        // Add the "placeholder" class if the paper is marked as disabled.
        card.className = `card research-card ${paper.disabled ? 'placeholder' : ''}`;
        
        // Determine the button's text and state (disabled or not).
        const buttonText = paper.disabled ? 'Coming Soon' : 'Read Paper';
        const buttonDisabledClass = paper.disabled ? 'disabled' : '';
        
        // Set the inner HTML for the research card.
        card.innerHTML = `
            <i class="${paper.icon}"></i>
            <h4>${paper.title}</h4>
            <p>${paper.description}</p>
            <a href="${paper.url}" target="_blank" class="btn-secondary ${buttonDisabledClass}">${buttonText}</a>
        `;
        
        // Add the card to its container.
        container.appendChild(card);
    });
}
