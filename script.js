//inputFields

let billInput = document.querySelector('.billInput');
let peopleNum = document.querySelector('.People-Num');
let customTip = document.querySelector('.tip-custom');

//radios

let radioButtons = document.querySelectorAll('.tip-radios');
let radioDef = document.querySelector('.tip-0');

//buttons

let resetButton = document.querySelector('.resetButton');

//finalInfo

let tipResult = document.querySelector('.tipResult');
let totalResult = document.querySelector('.totalResult');

//infoBlocks

let errorText = document.querySelector('.error');

for (let i = 0; i < 6; i++) {
    let radioButton = radioButtons[i];
    radioButton.addEventListener('change', function () {
        customTip.value = '';
        customTip.classList.replace('tip-custom-selected', 'tip-custom-unselected');
    })

    customTip.addEventListener('change', function () {
        if (radioButton.checked) {
            radioButton.checked = false;
        }

        if (customTip.value == '') {
            radioDef.checked = true;
        }

        if (!customTip.value == '') {
            customTip.classList.replace('tip-custom-unselected', 'tip-custom-selected');
        } else {
            customTip.classList.replace('tip-custom-selected', 'tip-custom-unselected');
        }

        if (!customTip.value.includes('%') && !customTip.value == '') {
            customTip.value = customTip.value + '%';
        }

        if (customTip.value == '%') {
            customTip.value = '';
            customTip.classList.replace('tip-custom-selected', 'tip-custom-unselected');
        }

    })

    resetButton.addEventListener('click', function () {
        radioButton.checked = false;
        radioDef.checked = true;

        customTip.value = '';
        customTip.classList.replace('tip-custom-selected', 'tip-custom-unselected');

        billInput.value = '';
        peopleNum.value = '';

        tipResult.textContent = '$0.00';
        tipResult.classList.replace('result-mini', 'result-standart');
        totalResult.textContent = '$0.00';
        totalResult.classList.replace('result-mini', 'result-standart')
    })

    radioButton.addEventListener('change', function () {
        calcHelper();
    })
}

billInput.addEventListener('change', function () {
    calcHelper();
})

peopleNum.addEventListener('change', function() {
    if (peopleNum.value == '00' | peopleNum.value == '000') {
        peopleNum.value = '';
    }
    if (peopleNum.value == '0') {
        errorText.classList.remove('dis');
        peopleNum.classList.add('error-border');
    }
    else {
        errorText.classList.add('dis');
        peopleNum.classList.remove('error-border');
    }
    calcHelper();
})

customTip.addEventListener('change', function () {
    calcHelper();
})

let calcHelper = function() {
    let activeRadio = document.querySelector('input[type=radio]:checked');
    if (activeRadio) {
        if (!(peopleNum.value == '0') && !peopleNum.value == '') {
            calc(activeRadio.value);
        }
        else {
            calcToStandart();
        }
    }
    else if (!customTip.value == ''){
        if (!(peopleNum.value == '0') && !peopleNum.value == '') {
            calc(customTip.value.slice(0, -1));
        }
        else {
            calcToStandart();
        }
    }
}

let calcToStandart = function (){
    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
}

let calc = function(tips) {
    let tip = (billInput.value * (tips / 100) / peopleNum.value).toFixed(2);
    let total = (billInput.value/peopleNum.value + parseFloat(tip)).toFixed(2);

    tipResult.textContent = '$' + tip;
    totalResult.textContent = '$' + total;

    if (tipResult.textContent.length == 9) {
        tipResult.classList.replace('result-standart', 'result-mini')
    } else {
        tipResult.classList.replace('result-mini', 'result-standart')
    }

    if (totalResult.textContent.length == 10) {
        totalResult.classList.replace('result-standart', 'result-mini')
    } else {
        totalResult.classList.replace('result-mini', 'result-standart')
    }

        }

if (screen.width < 500) {
    billInput.type = 'number';
    billInput.pattern = '[0-9]{5}';
    peopleNum.type = 'number';
    peopleNum.pattern = '[0-9]{5}';
    customTip.type = 'number';
    customTip.pattern = '^[0-9][0-9]?[/%]?$|^100[/%]?$|^$|^%$';
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.querySelector('.billInput'), function(value) {
    return /^\d{0,5}(\.\d{0,2})?$/.test(value);
});

setInputFilter(document.querySelector('.People-Num'), function(value) {
    return /^\d*$/.test(value);
});

setInputFilter(customTip, function(value) {
    return /^[0-9][0-9]?[/%]?$|^100[/%]?$|^$|^%$/.test(value);
});