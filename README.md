# VA-Benefits-Tool

## Discord

https://github.com/febreezie/VA-Benefits-Tool

---

## Project Overview

The **VA-Benefits-Tool** is a platform designed to simplify the process of determining veteran benefits based on state and disability ratings. It combines a web interface, a database-backed backend, and a scraping tool to consolidate relevant benefits information, making it easier for veterans to access the resources they qualify for.

---

## Features

1. **Dynamic Web Interface**: Allows users to select their state and disability rating to receive benefit information.
2. **Backend Automation**: Dynamically populates the database with state and disability-specific data from text files.
3. **Scraping Tool**: Gathers additional benefit data from relevant government websites.
4. **Validation Logic**: Ensures that users provide valid inputs for accurate results.



## Installation Instructions

### Prerequisites

-**Integrated Development Enviroment**
  -This was run using Visual Code 2024.

- **Operating System**: Tested on:
  - Ubuntu 20.04 LTS
  - Windows 10/11
  - macOS 11 (Big Sur) or newer

- **Python**: Version 3.7 or higher is required.

- **Hardware Recommendations**:
  - GPU: NVIDIA GPU with CUDA support (e.g., GTX 1060 or better) for faster NLP processing.
  - RAM: At least 8GB (16GB recommended).
  - Disk Space: 5GB free for model files and datasets.


### Steps to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/febreezie/VA-Benefits-Tool
   cd VA-Benefits-Tool

2. **To Run/Ensure the WebScrapper is functional**
   Install the following libraries:
   ```bash
   pip install requests beautifulsoup4
   ```
   Note: The Webscrapper is set for a specific website currently.

3. **Run the html file to view the website**
	Right click on the main.html in the Solution Explorer.
	Select "Copy Path".
	Paste the path into the search bar of your web browser of choice.

  --------------------------------------------------------------------------------------------------------------------------------

# **Future Development and Contributions**

Thank you for your interest in this project! If you’d like to contribute or use this project as a base for your own work, here are some guidelines and instructions to help you get started.

---

## **Forking the Repository**

To fork this repository and set it up for your own use:

1. **Fork the repository**:
   - Click the **Fork** button in the top-right corner of this repository on GitHub.
   - This creates a copy of the repository under your GitHub account.

2. **Clone your forked repository**:
   ```bash
   git clone https://github.com/<your-username>/VA-Benefits-Tool.git
   cd VA-Benefits-Tool

   ****Set Up the upstream remote: To keep your fork updated with the original repository:  

```bash
git remote add upstream https://github.com/<original-repo-owner>/VA-Benefits-Tool.git
git fetch upstream
```      
##**Contributing**

We welcome contributions! To contribute:

1. **Create a feature branch**

```bash
git checkout -b feature/<feature-name>
``` 

2. **Make your changes**

-Update code, documentation, or anything relevant to your contribution.

3. **Commit your changes**

```bash
git commit -m "Add <description of your changes>"
``` 
4. **Push to your forked repository**

```bash
git push origin feature/<feature-name>
``` 

5. **Submit a pull request**
-Navigate to the original repository on GitHub.
-Click New Pull Request and provide details about your changes.