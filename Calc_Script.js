
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
        const keyContent = key.textContent;
        const presentString = display.textContent;

        const length = display.textContent.length;
        const MAX_DISPLAY_LENGTH = 10;

        /**
         * The function adds a number to a display if certain conditions are met.
         * @returns If the length is greater than or equal to MAX_DISPLAY_LENGTH, nothing is done and
         * the function returns nothing.
         */
        function numbers() {
            if (length >= MAX_DISPLAY_LENGTH) {
                return; // don't do anything if max length is reached
            }

            if (presentString === '0' || presentString === ' 0') {
                display.textContent = keyContent;
            } else if (display.textContent.includes('ERROR')) {
                display.textContent = keyContent;
            } else if (subDisplay.textContent.includes('=')) {
                subDisplay.textContent = ' '
                display.textContent = keyContent;
            } else {
                display.textContent = presentString + keyContent
            }
        }

        /**
         * The function adds a decimal point to the display if certain conditions are met.
         * @returns If the length of the display content is greater than or equal to the maximum
         * display length, nothing will be done and the function will return.
         */
        function decimal() {
            if (length >= MAX_DISPLAY_LENGTH) {
                return; // don't do anything if max length is reached
            }

            if (subDisplay.textContent.includes('=') || presentString == 'ERROR' || presentString == '∞') {
                subDisplay.textContent = ' ';
                display.textContent = ' 0.'
            } else if (presentString.includes('.')) {
                display.textContent = presentString;
            } else if (presentString == ' ') {
                display.textContent = '0.'
            } else {
                display.textContent = presentString + '.';
            }
        }

        /**
         * The function performs various calculations and operations based on the input operator key and updates the
         * display and sub-display accordingly.
         */
        function operator() {
            display.textContent += ' ' + keyContent;

            const temp = subDisplay.textContent.split(" ");
            let firstVal = temp[0];
            let lastVal = presentString;

            if (presentString == ' ' && (subDisplay.textContent.includes('+') || subDisplay.textContent.includes('-') || subDisplay.textContent.includes('*') || subDisplay.textContent.includes('/'))) {
                subDisplay.textContent = firstVal + ' ' + keyContent;
                display.textContent = ' ';
            } else if (display.textContent.includes('ERROR') || display.textContent.includes('∞')) {
                subDisplay.textContent = ' ';
                display.textContent = 'ERROR';
            } else if (subDisplay.textContent.includes('=')) {
                display.textContent = ' ';
                subDisplay.textContent = lastVal + ' ' + keyContent;
            } else if (lastVal.includes('.')) {
                console.log('here')
                subDisplay.textContent = lastVal + '0' + ' ' + keyContent;
                display.textContent = ' '
            } else if ((firstVal) && (subDisplay.textContent.includes('+') || subDisplay.textContent.includes('-') || subDisplay.textContent.includes('*') || subDisplay.textContent.includes('/'))) {

                const temp = subDisplay.textContent + lastVal;

                try {

                    display.textContent = eval(temp);
                    subDisplay.textContent = display.textContent + ' ' + keyContent;
                    display.textContent = ' ';

                    const stringTemp = subDisplay.textContent.toString();
                    const length = stringTemp.length;
                    if (length >= 10) {
                        throw Error;
                    }

                    if (subDisplay.textContent.includes('Infinity')) {
                        subDisplay.textContent = ' '
                        display.textContent = '∞'
                    }

                } catch (error) {
                    subDisplay.textContent = ' ';
                    display.textContent = 'ERROR'
                }
            } else {
                subDisplay.textContent = presentString + ' ' + keyContent + ' ';
                display.textContent = ' ';
            }
        }

        /**
         * The function calculates the result of a mathematical expression entered by the user and
         * displays it on the screen, while also handling errors and limiting the length of the result.
         */
        function calculate() {
            if (!(subDisplay.textContent.includes('+') || subDisplay.textContent.includes('-') || subDisplay.textContent.includes('*') || subDisplay.textContent.includes('/'))) {
                display.textContent = display.textContent;
            } else if (subDisplay.textContent.includes('=')) {
                subDisplay.textContent = subDisplay.textContent;
                display.textContent = display.textContent;
            } else {

                display.textContent += keyContent;

                try {

                    subDisplay.textContent += presentString;

                    const result = eval(subDisplay.textContent);
                    const stringTemp = result.toString();
                    const length = stringTemp.length;
                    if (length >= 10) {
                        throw Error;
                    }

                    subDisplay.textContent += ' = ';
                    display.textContent = result;

                    if (display.textContent == 'Infinity') {
                        display.textContent = '∞'
                    }

                } catch (e) {
                    subDisplay.textContent = ' ';
                    display.textContent = 'ERROR';
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
                subDisplay.textContent = ' ';
                display.textContent = '0';
                break;

            /* This code is used to delete the last character from the display. */
            case 'delete':
                display.textContent = display.textContent.slice(0, -1);
                break;
        }
    }
})

