function getValues(){
    document.getElementById("tableResults").classList.add("invisible");

    let loanAmount = document.getElementById("inputLoanAmount").value;
    let paymentMonths = document.getElementById("paymentMonths").value;
    let rateAmount = document.getElementById("rateAmount").value;

    loanAmount = parseFloat(loanAmount).toFixed(2);
    paymentMonths = parseInt(paymentMonths);
    rateAmount = parseInt(rateAmount);

    if (Number.isInteger(loanAmount) && Number.isInteger(paymentMonths) && Number.isInteger(rateAmount)){
        let loanData = loanCalc(loanAmount, paymentMonths, rateAmount);

        displayMonthlyBreakDown(loanData);
    }else {
        alert("You must enter valid numbers.");
    }

}

function loanCalc(lAmount, pAmount, rAmount){

}

function displayMonthyInfo(){

}

function displayMonthlyBreakDown(){

}