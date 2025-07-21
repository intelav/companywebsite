// Wait until the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Content Loading for Blogs ---
    const blogsContainer = document.querySelector('#blogs .card-container, #blogs-page .card-container');

    // Fetch the data from our JSON file, only if the container exists on the page
    if (blogsContainer) {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.blogs) {
                    loadBlogs(data.blogs, blogsContainer);
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing data:', error);
                blogsContainer.innerHTML = '<p>Could not load blog data.</p>';
            });
    }
});

/**
 * Loads blog category cards into the specified container element.
 * @param {Array<Object>} blogs - An array of blog objects.
 * @param {HTMLElement} container - The container element to append cards to.
 */
function loadBlogs(blogs, container) {
    container.innerHTML = ''; // Clear existing content
    blogs.forEach(blog => {
        // Create a link element that will wrap the card content
        const link = document.createElement('a');
        link.href = blog.link;
        link.className = 'card-link';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
        `;

        // Append the card to the link, and the link to the container
        link.appendChild(card);
        container.appendChild(link);
    });
}
