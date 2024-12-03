
// Import necessary modules for backend functionality
const express = require("express");
const fs = require("fs");
const sql = require("mssql");
const path = require("path");

const app = express();

// Database configuration (No username/password for local development)
const dbConfig = {
    server: "localhost",
    database: "benefitsdb",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// API to handle benefit requests
app.get("/api/getBenefits", async (req, res) => {
    const { state, rating } = req.query;

    // Validate query parameters
    if (!state || !rating) {
        return res.status(400).json({ error: "State and rating are required." });
    }

    try {
        // Read the SQL query template
        const queryTemplate = fs.readFileSync(
            path.join(__dirname, "../database/website_handle.sql"),
            "utf-8"
        );

        // Safely replace placeholders in the SQL query
        const query = queryTemplate
            .replace(/@state/g, `'${state.replace(/'/g, "''")}'`)
            .replace(/@rating/g, `${parseInt(rating, 10)}`);

        // Connect to the database and execute the query
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(query);

        // Handle no results case
        if (result.recordset.length === 0) {
            return res.json({ benefits: "No data available for the selected state and rating." });
        }

        // Return the results
        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Database query failed." });
    }
});

// Serve the frontend files
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// Frontend logic for form handling
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("benefits-form");
        const stateInput = document.getElementById("state");
        const ratingInput = document.getElementById("disability-rating");
        const errorMessage = document.getElementById("error-message");
        const outputDiv = document.getElementById("output");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const state = stateInput.value;
            const rating = ratingInput.value;

            // Validate inputs
            if (state === "None" && rating === "None") {
                errorMessage.textContent = "No selections made, please select at least one option.";
                return;
            }

            // Clear any previous errors
            errorMessage.textContent = "";

            try {
                // Fetch data from the backend API
                const response = await fetch(`/api/getBenefits?state=${state}&rating=${rating}`);

                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }

                const data = await response.json();

                // Display results or fallback message
                outputDiv.textContent =
                    data.benefits || "No data available for the selected state and disability rating.";
            } catch (error) {
                console.error("Error fetching data:", error);
                errorMessage.textContent = "An error occurred while fetching the data. Please try again.";
            }
        });

        document.getElementById("go-back").addEventListener("click", () => {
            // Reset form and hide results
            form.reset();
            outputDiv.textContent = "";
            errorMessage.textContent = "";
        });
    });
}
