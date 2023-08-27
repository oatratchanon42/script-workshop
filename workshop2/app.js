const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateText = document.getElementById('rate');
const futureExpectation = document.getElementById('future-expectation');
const swap = document.getElementById('btn');

// Store previous rate for comparison
let previousRate = 0;

// Event listeners
currency_one.addEventListener('change', calculateMoney);
currency_two.addEventListener('change', calculateMoney);
amount_one.addEventListener('input', calculateMoney);
amount_two.addEventListener('input', calculateMoney);

// Calculate currency conversion
function calculateMoney() {
    const one = currency_one.value;
    const two = currency_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[two];
            const formattedRate = rate.toFixed(2);
            
            // Check for rate changes
            if (previousRate !== 0) {
                const rateChange = rate > previousRate ? 'up' : 'down';
                showRateChangeNotification(rateChange);
            }
            
            rateText.innerText = `1 ${one} = ${formattedRate} ${two}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
            
            previousRate = rate;
        });
}

// Calculate average rate
function calculateAverageRate(ratesArray) {
    const sum = ratesArray.reduce((total, rate) => total + rate, 0);
    return sum / ratesArray.length;
}

// Show future exchange rate expectations
function showFutureExpectation() {
    // ... (your existing code)
}

// Show rate change notification
function showRateChangeNotification(changeDirection) {
    const notification = document.createElement('div');
    notification.className = `rate-change-notification ${changeDirection}`;
    notification.innerText = `Rate went ${changeDirection}!`;
    
    document.body.appendChild(notification);
    
    // Remove notification after a short delay
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Swap currencies
swap.addEventListener('click', () => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney();
    showFutureExpectation();
});
// Calculate currency conversion
function calculateMoney() {
    const one = currency_one.value;
    const two = currency_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[two];
            const formattedRate = rate.toFixed(2);
            
            // Check for rate changes
            if (previousRate !== 0) {
                const rateChange = calculateRateChange(previousRate, rate);
                showRateChangeNotification(rateChange);
                
                // Check for suitable buying condition
                if (isSuitableToBuy(rateChange)) {
                    showBuyingOpportunityNotification();
                }
            }
            
            rateText.innerText = `1 ${one} = ${formattedRate} ${two}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
            
            previousRate = rate;
        });
}

// Calculate rate change
function calculateRateChange(previousRate, currentRate) {
    const rateChange = currentRate - previousRate;
    if (rateChange > 0) {
        return 'up';
    } else if (rateChange < 0) {
        return 'down';
    } else {
        return 'stable';
    }
}

// Check if suitable to buy
function isSuitableToBuy(rateChange) {
    // Adjust the condition based on your criteria
    // For example, if rateChange is 'down', consider buying
    return rateChange === 'down';
}

// Show buying opportunity notification
function showBuyingOpportunityNotification() {
    const notification = document.createElement('div');
    notification.className = 'buying-opportunity-notification';
    notification.innerText = 'Great time to buy!';
    
    document.body.appendChild(notification);
    
    // Remove notification after a short delay
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 5000);
}


// Load initial data
calculateMoney();
showFutureExpectation();
