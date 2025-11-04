

        // === PART 1: Grabbing all the HTML elements ===
// We are giving JavaScript "memory" of all the important HTML tags
// so we can read from them (like inputs) or write to them (like displays).

// Get the text box where you type the bill amount
const billInput = document.getElementById('billAmount'); 
// Get the text box for a custom tip percentage
const customTipInput = document.getElementById('customTip');
// Get the text box for the number of people
const numPeopleInput = document.getElementById('numPeople');
// Get the <p> or <span> tag where we SHOW the calculated tip
const tipAmountDisplay = document.getElementById('tipAmount');
// Get the tag where we SHOW the total bill (bill + tip)
const totalAmountDisplay = document.getElementById('totalAmount');
// Get the tag where we SHOW the amount per person
const perPersonDisplay = document.getElementById('perPerson');
// Get ALL the buttons with the class "tip-btn" (this is a list!)
const tipButtons = document.querySelectorAll('.tip-btn');
// Get the single reset button
const resetBtn = document.getElementById('resetBtn');

// === PART 2: A variable to remember the chosen tip ===
// We create one variable to keep track of the tip percentage.
let selectedTipPercentage = 0; // It starts at 0

// === PART 3: Making the Tip Buttons (5%, 10%, etc.) work ===

// .forEach() is a loop. It means "Do this for EACH button in the tipButtons list"
tipButtons.forEach(btn => {
    // For each button, we "listen" for a "click" event.
    btn.addEventListener('click', () => {
        
        // --- When a button is clicked, do this: ---
        
        // 1. Loop through ALL buttons and remove the 'active' class
        //    (this un-highlights any button that was already clicked)
        tipButtons.forEach(b => b.classList.remove('active'));
        
        // 2. Add the 'active' class to the ONE button we just clicked
        //    (this highlights it)
        btn.classList.add('active');
        
        // 3. Get the tip percentage from the button's "data-tip" attribute
        //    parseFloat() turns text (like "15") into a number (15)
        selectedTipPercentage = parseFloat(btn.getAttribute('data-tip'));
        
        // 4. Clear the "custom tip" box, since we just clicked a preset button
        customTipInput.value = '';
        
        // 5. Run the main calculate function!
        calculate();
    });
});

// === PART 4: Making the "Custom Tip" input box work ===

// "listen" for an "input" event (this happens every time you type a key)
customTipInput.addEventListener('input', () => {
    
    // 1. Un-highlight ALL the preset buttons, since we are typing a custom tip
    tipButtons.forEach(b => b.classList.remove('active'));
    
    // 2. Set the tip percentage to whatever is in the box
    //    || 0 is a safety net. If the box is empty, use 0.
    selectedTipPercentage = parseFloat(customTipInput.value) || 0;
    
    // 3. Run the main calculate function!
    calculate();
});

// === PART 5: Making the "Bill" and "People" boxes work ===

// Any time you type in the bill or people box, just run the calculate function.
billInput.addEventListener('input', calculate);
numPeopleInput.addEventListener('input', calculate);

// === PART 6: The "Brain" - The Main Calculate Function ===

// We create a function (a re-usable block of code) that does all the math.
function calculate() {
    
    // 1. Get the values from the input boxes and turn them into numbers
    //    We use || 0 or || 1 as a safety net.
    const bill = parseFloat(billInput.value) || 0; // If box is empty, use 0
    const tipPercentage = selectedTipPercentage; // This was already set by our buttons
    const numPeople = parseFloat(numPeopleInput.value) || 1; // If box is empty, use 1 (to avoid dividing by zero!)

    // 2. Do the math
    const tipAmount = (bill * tipPercentage) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / numPeople;

    // 3. Display the results on the screen
    //    .toFixed(2) formats the number to 2 decimal places (e.g., 10.5 becomes 10.50)
    tipAmountDisplay.textContent = '₹' + tipAmount.toFixed(2);
    totalAmountDisplay.textContent = '₹' + totalAmount.toFixed(2);
    perPersonDisplay.textContent = '₹' + perPerson.toFixed(2);
}

// === PART 7: Making the "Reset" button work ===

resetBtn.addEventListener('click', () => {
    // 1. Clear all the input fields
    billInput.value = '';
    customTipInput.value = '';
    numPeopleInput.value = '1'; // Set people back to 1
    
    // 2. Un-highlight all tip buttons
    tipButtons.forEach(b => b.classList.remove('active'));
    
    // 3. Reset the tip variable back to 0
    selectedTipPercentage = 0;
    
    // 4. Run the calculate function to update the display (it will show all 0.00)
    calculate();
});

// === PART 8: Run the calculator once on page load ===
// This makes sure the display shows "₹0.00" when you first load the page.
calculate();
