document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('benefits-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const state = document.getElementById('state').value.trim();
        const rating = document.getElementById('disability-rating').value.trim();
        if (state === "None") {
            alert("Please select a valid state.");
            return;
        }
        const queryParams = new URLSearchParams({ state, rating });
        window.location.href = `results.html?${queryParams.toString()}`;
    });
});
