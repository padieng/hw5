const searchBtn = document.getElementById('searchBtn');
const repoGallery = document.getElementById('repo-gallery');

searchBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        fetchRepos(username);
    }
});

async function fetchRepos(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=20`;
    try {
        const response = await fetch(url);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}

function displayRepos(repos) {
    repoGallery.innerHTML = ''; // Clear previous results
    repos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');

        repoCard.innerHTML = `
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description || 'No description available'}</p>
            <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
            <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
        `;

        repoGallery.appendChild(repoCard);
    });
}


fetchRepos('your-github-username');
