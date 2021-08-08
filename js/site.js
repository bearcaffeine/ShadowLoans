function getValues(){
    document.getElementById("tableResults").classList.add("invisible");

    let loanAmount = document.getElementById("loanAmount").value;
    let paymentMonths = document.getElementById("paymentMonths").value;
    let rateAmount = document.getElementById("rateAmount").value;

    loanAmount = parseInt(loanAmount);
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
    let totalMonthlyPayments = (lAmount * (rAmount/1200)) / (1 - ((1+(rAmount/1200))**-pAmount));

    let loanData = {
        Principal : lAmount,
        Payments : pAmount,
        Rate : rAmount,
        Monthly : totalMonthlyPayments,
        Payments : []
    };

    let balance = lAmount;

    loanData.totalInterest = 0;

    for (let i = 0; i < pAmount; i++) {
        let interest = lAmount * rAmount / 1200;
        let payment = totalMonthlyPayments - interest

        loanData.totalInterest += interest;

        let interestPaid = loanData.totalInterest;

        balance -= payment;

        let current = {
            Interest : interest,
            InterestPaid : interestPaid,
            PrincipalPaid : payment,
            Balance : balance
        }
        lAmount -= payment;

        loanData.Payments.push(current);
    }

    return loanData;

}

function displayMonthyInfo(){

}

function displayMonthlyBreakDown(loanData){

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    document.getElementById("totalMonthlyPayments").innerHTML = `${formatter.format(loanData.Monthly)}`;
    document.getElementById("totalPrinicpal").innerHTML = `${formatter.format(loanData.Principal)}`;
    document.getElementById("interest").innerHTML = `${formatter.format(loanData.totalInterest)}`;
    document.getElementById("totalCost").innerHTML = `<strong>${formatter.format(loanData.Principal+loanData.totalInterest)}</strong>`;

    let tableBody = document.getElementById("results");
    let templateRow = document.getElementById("monthlyBreakDown");

    tableBody.innerHTML = "";

    for (let i = 0; i < loanData.Payments.length; i++){
        const tableRow = document.importNode(templateRow.content, true);

        rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = i + 1;
        rowCols[1].textContent = loanData.Monthly.toFixed(2);
        rowCols[2].textContent = loanData.Payments[i].PrincipalPaid.toFixed(2);
        rowCols[3].textContent = loanData.Payments[i].Interest.toFixed(2);
        rowCols[4].textContent = loanData.Payments[i].InterestPaid.toFixed(2);
        rowCols[5].textContent = loanData.Payments[i].Balance.toFixed(2);

        tableBody.appendChild(tableRow);
    }

    document.getElementById("tableResults").classList.remove("invisible");
}