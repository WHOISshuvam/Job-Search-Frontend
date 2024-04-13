  document.getElementById('jobSearchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    var query = document.getElementById('query').value;
    var location = document.getElementById('location').value;

    // Fetch job listings
    fetchJobListings(query, location);
});

function fetchJobListings(query, location) {
    // API endpoint
    var url = `https://api.jobsearch.suvamadhikari.com.np:8000/?query=${query}&location=${location}`;

    // Fetch job listings
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayJobListings(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayJobListings(jobListings) {
    var jobResultsDiv = document.getElementById('jobResults');
    jobResultsDiv.innerHTML = ''; // Clear previous results

    if (jobListings.length === 0) {
        jobResultsDiv.innerHTML = '<p>No job listings found.</p>';
        return;
    }

    var jobListingsHTML = '<div class="list-group">';
    jobListings.forEach(job => {
        jobListingsHTML += `
            <a href="${job.jobLink}" class="list-group-item list-group-item-action">
                <h5 class="mb-1">${job.jobTitle}</h5>
                <p class="mb-1">${job.companyName}</p>
                <small>${job.companyLocation}</small>
            </a>`;
    });
    jobListingsHTML += '</div>';

    jobResultsDiv.innerHTML = jobListingsHTML;
}
