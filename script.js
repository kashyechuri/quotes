// Collection of inspiring quotes with categories
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "success"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "life"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "success"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",  
        author: "John Lennon",
        category: "life"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "success"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "motivation"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "wisdom"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "motivation"
    },
    {
        text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
        category: "wisdom"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "success"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
        category: "life"
    },
    {
        text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        author: "Unknown",
        category: "wisdom"
    },
    {
        text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
        author: "Steve Jobs",
        category: "motivation"
    },
    {
        text: "Experience is a hard teacher because she gives the test first, the lesson afterward.",
        author: "Vernon Law",
        category: "wisdom"
    },
    {
        text: "To handle yourself, use your head; to handle others, use your heart.",
        author: "Eleanor Roosevelt",
        category: "life"
    },
    {
        text: "Too many of us are not living our dreams because we are living our fears.",
        author: "Les Brown",
        category: "motivation"
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "success"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "life"
    },
    {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
        category: "life"
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
        category: "wisdom"
    },
    {
        text: "May you live all the days of your life.",
        author: "Jonathan Swift",
        category: "life"
    },
    {
        text: "Life is a succession of lessons which must be lived to be understood.",
        author: "Ralph Waldo Emerson",
        category: "wisdom"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
    }
];

// DOM elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const quoteCategory = document.getElementById('quote-category');
const newQuoteBtn = document.getElementById('new-quote-btn');
const quoteBox = document.querySelector('.quote-box');
const categorySelect = document.getElementById('category-select');
const themeToggle = document.getElementById('theme-toggle');
const historyToggle = document.getElementById('history-toggle');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

// State management
let lastQuoteIndex = -1;
let currentCategory = 'all';
let quoteHistory = JSON.parse(localStorage.getItem('quoteHistory')) || [];
let isDarkTheme = localStorage.getItem('theme') === 'dark';

// Initialize theme
function initializeTheme() {
    if (isDarkTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

// Toggle theme
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    initializeTheme();
}

// Get filtered quotes based on category
function getFilteredQuotes() {
    if (currentCategory === 'all') {
        return quotes;
    }
    return quotes.filter(quote => quote.category === currentCategory);
}

// Get a random quote from filtered quotes
function getRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    
    if (filteredQuotes.length === 0) {
        return null;
    }
    
    let randomIndex;
    
    // Ensure we don't get the same quote twice in a row
    do {
        randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    } while (randomIndex === lastQuoteIndex && filteredQuotes.length > 1);
    
    lastQuoteIndex = randomIndex;
    return filteredQuotes[randomIndex];
}

// Add quote to history
function addToHistory(quote) {
    const historyItem = {
        ...quote,
        timestamp: new Date().toLocaleString()
    };
    
    // Add to beginning of array
    quoteHistory.unshift(historyItem);
    
    // Keep only last 20 quotes
    if (quoteHistory.length > 20) {
        quoteHistory = quoteHistory.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('quoteHistory', JSON.stringify(quoteHistory));
    
    // Update history display
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (quoteHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No quotes in history yet</p>';
        return;
    }
    
    quoteHistory.forEach((quote, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-item-text">"${quote.text}"</div>
            <div class="history-item-author">— ${quote.author} | ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}</div>
        `;
        
        // Click to display this quote
        historyItem.addEventListener('click', () => {
            displaySpecificQuote(quote);
            toggleHistorySection();
        });
        
        historyList.appendChild(historyItem);
    });
}

// Display a specific quote
function displaySpecificQuote(quote) {
    quoteBox.classList.remove('fade-in');
    
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        quoteCategory.textContent = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);
        quoteBox.classList.add('fade-in');
    }, 50);
}

// Display a new random quote
function displayQuote() {
    const quote = getRandomQuote();
    
    if (!quote) {
        quoteText.textContent = "No quotes available for this category.";
        quoteAuthor.textContent = "";
        quoteCategory.textContent = "";
        return;
    }
    
    // Add fade-in animation
    quoteBox.classList.remove('fade-in');
    
    // Small delay to ensure the animation class is removed
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        quoteCategory.textContent = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);
        quoteBox.classList.add('fade-in');
        
        // Add to history
        addToHistory(quote);
    }, 50);
}

// Handle category change
function handleCategoryChange() {
    currentCategory = categorySelect.value;
    lastQuoteIndex = -1; // Reset to allow new quotes
    displayQuote();
}

// Toggle history section
function toggleHistorySection() {
    historySection.classList.toggle('hidden');
    historyToggle.textContent = historySection.classList.contains('hidden') 
        ? 'Show History' 
        : 'Hide History';
}

// Clear history
function clearHistory() {
    if (confirm('Are you sure you want to clear all quote history?')) {
        quoteHistory = [];
        localStorage.removeItem('quoteHistory');
        updateHistoryDisplay();
    }
}

// Event listeners
newQuoteBtn.addEventListener('click', displayQuote);
categorySelect.addEventListener('change', handleCategoryChange);
themeToggle.addEventListener('click', toggleTheme);
historyToggle.addEventListener('click', toggleHistorySection);
clearHistoryBtn.addEventListener('click', clearHistory);

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        displayQuote();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateHistoryDisplay();
    
    // Wait a moment for the page to fully load
    setTimeout(displayQuote, 500);
}); 