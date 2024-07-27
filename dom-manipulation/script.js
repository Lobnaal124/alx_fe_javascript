// const quotes = [
//     { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
//     { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
//     { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Positivity" }
// ];

// function showRandomQuote() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     const quoteDisplay = document.getElementById('quoteDisplay');
//     quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
// }

// function createAddQuoteForm() {
//     const newQuoteText = document.getElementById('newQuoteText').value;
//     const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
//     if (newQuoteText.trim() && newQuoteCategory.trim()) {
//         const newQuote = { text: newQuoteText, category: newQuoteCategory };
//         quotes.push(newQuote);
//         alert('New quote added successfully!');
//         document.getElementById('newQuoteText').value = '';
//         document.getElementById('newQuoteCategory').value = '';
//     } else {
//         alert('Please fill in both fields.');
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('newQuote').addEventListener('click', showRandomQuote);
//     document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);
// });


// Quotes array
let quotes = [];

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes
        quotes = [
            { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
            { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Positivity" }
        ];
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Function to create and add a new quote form
function createAddQuoteForm() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText.trim() && newQuoteCategory.trim()) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        alert('New quote added successfully!');
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to export quotes to JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);

    // Show last viewed quote if available in session storage
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastViewedQuote) {
        const quote = JSON.parse(lastViewedQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
    }
});
