const myButton = document.getElementById('myButton');
const outputDiv = document.getElementById('output');

myButton.addEventListener('click', () => {
    outputDiv.textContent = "Button clicked!";
});

myButton.addEventListener('mouseover', () => {
    myButton.style.backgroundColor = '#004085';
});

myButton.addEventListener('mouseout', () => {
    myButton.style.backgroundColor = '#007bff';
});
