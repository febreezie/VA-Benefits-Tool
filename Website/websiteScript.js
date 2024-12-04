// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('benefits-form');
    const stateSelect = document.getElementById('state');
    const ratingSelect = document.getElementById('disability-rating');
    const stateError = document.getElementById('state-error');
    const ratingError = document.getElementById('rating-error');
    const benefitsList = document.getElementById('benefits-list'); // List display

    // Hide the benefits section initially
    const benefitsSection = document.getElementById('benefits-results');
    benefitsSection.style.display = 'none';

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages and results
        stateError.textContent = '';
        ratingError.textContent = '';
        benefitsList.innerHTML = ''; // Clear the list

        // Get user inputs
        const state = stateSelect.value.trim();
        const rating = ratingSelect.value.trim();

        // Validate state input
        if (state === "None") {
            stateError.textContent = "Please select a valid state.";
            return;
        }

        // File paths for the header (0.txt) and disability-specific benefits
        const headerFilePath = `/States/${state}/0/0.txt`;
        let benefitsFilePath = null;
        if (rating !== "None") {
            benefitsFilePath = `/States/${state}/${rating}/${rating}.txt`;
        }

        try {
            // Fetch and display the general benefits from 0.txt
            const headerResponse = await fetch(headerFilePath);
            if (!headerResponse.ok) {
                throw new Error('Header file not found');
            }
            const headerContent = await headerResponse.text();

            // Add the header as the first list item and make it bold
            const headerLines = headerContent.split('\n').filter(line => line.trim() !== '');
            if (headerLines.length > 0) {
                const headerItem = document.createElement('li');
                headerItem.innerHTML = `<strong>${headerLines[0]}</strong>`;
                benefitsList.appendChild(headerItem);

                // Add the rest of the header content
                headerLines.slice(1).forEach(line => {
                    if (line.trim() !== '') {
                        const li = document.createElement('li');
                        li.textContent = line.trim();
                        benefitsList.appendChild(li);
                    }
                });
            }

            // Fetch and display the disability-specific benefits if a rating is selected
            if (benefitsFilePath) {
                const benefitsResponse = await fetch(benefitsFilePath);
                if (!benefitsResponse.ok) {
                    throw new Error('Benefits file not found');
                }
                const benefitsContent = await benefitsResponse.text();

                const benefitsLines = benefitsContent.split('\n').filter(line => line.trim() !== '');
                if (benefitsLines.length > 0) {
                    // Add the disability rating header as bold
                    const ratingHeader = document.createElement('li');
                    ratingHeader.innerHTML = `<strong>${benefitsLines[0]}</strong>`;
                    benefitsList.appendChild(ratingHeader);

                    // Add the rest of the benefits content
                    benefitsLines.slice(1).forEach(line => {
                        if (line.trim() !== '') {
                            const li = document.createElement('li');
                            li.textContent = line.trim();
                            benefitsList.appendChild(li);
                        }
                    });
                }
            }
        } catch (error) {
            // Display an error message if file fetch fails
            const li = document.createElement('li');
            li.textContent = "Benefits data could not be retrieved. Please check your input or try again later.";
            li.style.color = "red";
            benefitsList.appendChild(li);
            console.error('Error:', error);
        }

        // Show the benefits section
        benefitsSection.style.display = 'block';
    });
});
