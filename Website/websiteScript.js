// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('benefits-form');
    const stateSelect = document.getElementById('state');
    const ratingSelect = document.getElementById('disability-rating');
    const outputDiv = document.getElementById('output');
    const stateError = document.getElementById('state-error');
    const ratingError = document.getElementById('rating-error');

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        stateError.textContent = '';
        ratingError.textContent = '';
        outputDiv.textContent = '';

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

            // Display the file content
            outputDiv.textContent = fileContent;
        } catch (error) {
            outputDiv.textContent = "Benefits data could not be retrieved. Please check your input or try again later.";
            console.error('Error:', error);
        }
    });
});
