const STORAGE_KEY = "cached_zen_quote";
const URL = "https://zenquotes.io/api/quotes";

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const copyButtonElement = document.getElementById('copy');
const copiedButtonElement = document.getElementById('copied');
const shuffleButtonElement = document.getElementById('shuffle');

const setRandomQuote = () => {
  currentQuote = quotes[Math.floor(Math.random()*quotes.length)];

  quoteElement.textContent = currentQuote.q;
  authorElement.textContent = currentQuote.a;
}

let quotes = null;
let currentQuote = null;

addEventListener("load", () => {
  quotes = localStorage.getItem(STORAGE_KEY);

  if(quotes) {
    quotes = JSON.parse(quotes);
    setRandomQuote();
    return;
  }

  fetch('https://corsproxy.io/?' + encodeURIComponent(URL))
    .then((response) => response.json())
    .then((data) => {
      quotes = data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));

      setRandomQuote();
    })
    .catch((err) => alert(`Error fetching quotes: ${err}`))
})

shuffleButtonElement.addEventListener("click", () => {
  setRandomQuote();
});

copyButtonElement.addEventListener("click", () => {
  const text = [currentQuote.q, currentQuote.a].join(' - ');

  navigator.clipboard.writeText(text);

  copyButtonElement.style.display = 'none';
  copiedButtonElement.style.display = 'block';

  const timeoutId = setTimeout(() => {
    copyButtonElement.style.display = 'block';
    copiedButtonElement.style.display = 'none';

    clearTimeout(timeoutId);
  }, 1800)
})


