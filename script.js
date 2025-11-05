const billInput = document.getElementById('billAmount');
const customTipInput = document.getElementById('customTip');
const numPeopleInput = document.getElementById('numPeople');
const tipAmountDisplay = document.getElementById('tipAmount');
const totalAmountDisplay = document.getElementById('totalAmount');
const perPersonDisplay = document.getElementById('perPerson');
const tipButtons = document.querySelectorAll('.tip-btn');
const resetBtn = document.getElementById('resetBtn');

let selectedTipPercentage = 0;

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        
        tipButtons.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        selectedTipPercentage = parseFloat(btn.getAttribute('data-tip'));
        
        customTipInput.value = '';
        
        calculate();
    });
});

customTipInput.addEventListener('input', () => {
    
    tipButtons.forEach(b => b.classList.remove('active'));
    
    selectedTipPercentage = parseFloat(customTipInput.value) || 0;
    
    calculate();
});

billInput.addEventListener('input', calculate);
numPeopleInput.addEventListener('input', calculate);

function calculate() {
    
    const bill = parseFloat(billInput.value) || 0;
    const tipPercentage = selectedTipPercentage;
    const numPeople = parseFloat(numPeopleInput.value) || 1;

    const tipAmount = (bill * tipPercentage) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / numPeople;

    tipAmountDisplay.textContent = '₹' + tipAmount.toFixed(2);
    totalAmountDisplay.textContent = '₹' + totalAmount.toFixed(2);
    perPersonDisplay.textContent = '₹' + perPerson.toFixed(2);
}

resetBtn.addEventListener('click', () => {
    
    billInput.value = '';
    customTipInput.value = '';
    numPeopleInput.value = '1';
    
    tipButtons.forEach(b => b.classList.remove('active'));
    
    selectedTipPercentage = 0;
    
    calculate();
});

calculate();

