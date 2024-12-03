// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('benefits-form');
    const stateSelect = document.getElementById('state');
    const ratingSelect = document.getElementById('disability-rating');
    const stateError = document.getElementById('state-error');
    const ratingError = document.getElementById('rating-error');
    const outputDiv = document.getElementById('output');
    const benefitsSection = document.getElementById('benefits-results');
    const benefitsList = document.getElementById('benefits-list'); // List display

    // Hide the benefits section initially
    benefitsSection.style.display = 'none';

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages and results
        stateError.textContent = '';
        ratingError.textContent = '';
        outputDiv.textContent = '';
        benefitsList.innerHTML = ''; // Clear the list

        // Get user inputs
        const state = stateSelect.value.trim();
        const rating = ratingSelect.value.trim();

        // Validate inputs
        if (state === "None") {
            stateError.textContent = "Please select a valid state.";
            return;
        }

        if (rating === "None") {
            ratingError.textContent = "Please select a valid disability rating.";
            return;
        }

        // Construct the file path
        const filePath = `../States/${state}/${rating}/${rating}.txt`;

        try {
            // Fetch the content of the file
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('File not found');
            }
            const fileContent = await response.text();

            // Convert file content to a list
            const lines = fileContent.split('\n');
            lines.forEach(line => {
                if (line.trim() !== '') { // Ignore empty lines
                    const li = document.createElement('li');
                    li.textContent = line.trim();
                    benefitsList.appendChild(li);
                }
            });

            // Show the benefits section
            benefitsSection.style.display = 'block';
        } catch (error) {
            // Display an error message if file fetch fails
            const li = document.createElement('li');
            li.textContent = "Benefits data could not be retrieved. Please check your input or try again later.";
            li.style.color = "red";
            benefitsList.appendChild(li);
            console.error('Error:', error);

            // Ensure the benefits section is visible even on error
            benefitsSection.style.display = 'block';
        }
    });
});
