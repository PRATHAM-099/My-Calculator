
/* This code that is used to select the elements from the HTML file. */
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-display');
const subDisplay = calculator.querySelector('.sub-display');

/* Listening for a click event on the keys. */
keys.addEventListener('click', e => {

    /* Checking if the target of the event is a button. */
    if (e.target.matches('button')) {

        /* This code selects the elements from the HTML file. */
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;// here
        const presentString = display.value;

        /**
         * The function adds a number to the display value based on certain conditions.
         */
        function numbers() {
            if (presentString === '0') {
                display.value = keyContent;
            } else if (display.value.includes('ERROR')) {
                display.value = keyContent;
            } else if (subDisplay.value.includes('=')) {
                subDisplay.value = ' '
                display.value = keyContent;
            } else {
                display.value += keyContent
            }
            console.log('display val :'+display.value)
        }

       
       /**
        * The function adds a decimal point to the current number displayed on a calculator.
        */
        function decimal() {
            if (subDisplay.value.includes('=') || presentString == 'ERROR' || presentString == '∞') {
                subDisplay.value = ' ';
                display.value = ' 0.'
            } else if (presentString.includes('.')) {
                display.value = presentString;
            } else if (presentString == ' ') {
                display.value = '0.'
            } else {
                display.value = presentString + '.';
            }
        }

        /**
         * The function performs various calculations and operations based on the input operator key and updates the
         * display and sub-display accordingly.
         */
        function operator() {
            display.value += keyContent;

            const temp = subDisplay.value.split(" ");
            let firstVal = temp[0];
            let lastVal = presentString;

            if (presentString == ' ' && (subDisplay.value.includes('+') || subDisplay.value.includes('-') || subDisplay.value.includes('*') || subDisplay.value.includes('/'))) {
                subDisplay.value = firstVal + ' ' + keyContent;
                display.value = ' ';
            } else if (display.value.includes('ERROR') || display.value.includes('∞')) {
                subDisplay.value = ' ';
                display.value = 'ERROR';
            } else if (subDisplay.value.includes('=')) {
                display.value = ' ';
                subDisplay.value = lastVal + ' ' + keyContent;
            } else if (lastVal.includes('.')) {
                subDisplay.value = lastVal + '0' + ' ' + keyContent;
                display.value = ' '
            } else if ((firstVal) && (subDisplay.value.includes('+') || subDisplay.value.includes('-') || subDisplay.value.includes('*') || subDisplay.value.includes('/'))) {

                const temp = subDisplay.value + lastVal;

                try {

                    display.value = eval(temp);
                    subDisplay.value = display.value + ' ' + keyContent;
                    display.value = ' ';                

                    if (subDisplay.value.includes('Infinity')) {
                        subDisplay.value = ' '
                        display.value = '∞'
                    }

                } catch (error) {
                    subDisplay.value = ' ';
                    display.value = 'ERROR'
                }
            } else {
                subDisplay.value = presentString + ' ' + keyContent;
                display.value = ' ';
            }
        }

        /**
         * The function calculates the result of a mathematical expression entered by the user and
         * displays it on the screen.
         */
        function calculate() {
            const temp = subDisplay.value.split(" ");
            let firstVal = temp[0];
            let lastVal = presentString;

            console.log('first val :' + firstVal);
            console.log('last val :' + lastVal);

            if (!(subDisplay.value.includes('+') || subDisplay.value.includes('-') || subDisplay.value.includes('*') || subDisplay.value.includes('/'))) {
                display.value = display.value;
            } else if (subDisplay.value.includes('=')) {
                subDisplay.value = subDisplay.value;
                display.value = display.value;
            } else {
                if (lastVal.includes('.')) {
                    display.value = presentString + '0';
                    console.log("display " + display.value);
                }

                console.log('display val : ' + display.value)

                try {

                    subDisplay.value += display.value;
                    console.log('subdisplay ' + subDisplay.value)
                    console.log('sub display val : ' + subDisplay.value)
                    const result = eval(subDisplay.value);
                    subDisplay.value += ' = ';
                    display.value = result;

                    if (display.value == 'Infinity') {
                        display.value = '∞'
                    }

                } catch (e) {
                    subDisplay.value = ' ';
                    display.value = 'ERROR';
                }
            }
        }

        /* The `switch` statement is used to determine which function to call based on the `action`
        value of the clicked button. If the `action` value is `undefined`, the `numbers()` function
        is called. If the `action` value is `'decimal'`, the `decimal()` function is called. If the
        `action` value is `'add'`, `'subtract'`, `'multiply'`, or `'divide'`, the `operator()`
        function is called. If the `action` value is `'calculate'`, the `calculate()` function is
        called. If the `action` value is `'clear'`, the display and sub-display are cleared. If the
        `action` value is `'delete'`, the last character from the display is deleted. */
        switch (action) {

            case undefined:
                numbers();
                break;

            case 'decimal':
                decimal();
                break;

            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                operator();
                break;

            case 'calculate':
                calculate();
                break;

            /* This code is used to clear the display and sub-display. */
            case 'clear':
                subDisplay.value = ' ';
                display.value = '0';
                break;

            /* This code is used to delete the last character from the display. */
            case 'delete':
                display.value = display.value.slice(0, -1);
                break;
        }
    }
})

