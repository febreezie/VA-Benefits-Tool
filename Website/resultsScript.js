document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const rating = params.get('rating');
    const benefitsList = document.getElementById('benefits-list');

    try {
        // Fetch the header (general benefits)
        const headerResponse = await fetch(`/States/${state}/0/0.txt`);
        const headerContent = await headerResponse.text();
        const headerLines = headerContent.split('\n').filter(line => line.trim());
        headerLines.forEach(line => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${line}</strong>`;
            benefitsList.appendChild(li);
        });

        // Fetch the disability-specific benefits if a rating is provided
        if (rating !== "None") {
            const benefitsResponse = await fetch(`/States/${state}/${rating}/${rating}.txt`);
            const benefitsContent = await benefitsResponse.text();
            const benefitsLines = benefitsContent.split('\n').filter(line => line.trim());
            benefitsLines.forEach(line => {
                const li = document.createElement('li');
                li.textContent = line;
                benefitsList.appendChild(li);
            });
        }
    } catch (error) {
        const li = document.createElement('li');
        li.textContent = "Error retrieving benefits. Please try again.";
        li.style.color = "red";
        benefitsList.appendChild(li);
    }
});
