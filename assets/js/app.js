const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

document.getElementById('loan-form').addEventListener('submit', function(e) {
   e.preventDefault();
   
   document.getElementById('submit-btn').disabled = true;
   document.getElementById('results').style.display = 'none';
   document.getElementById('loading').style.display = 'block';
   setTimeout(calculateLoan, 1500);
});

function calculateLoan() {
   
   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
   const calculatedPayments = parseFloat(years.value) * 12;

   // Compute monthly payment
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (principal*x*calculatedInterest)/(x-1);

   if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      
      document.getElementById('results').style.display = 'block';
      document.getElementById('loading').style.display = 'none';
      document.getElementById('submit-btn').disabled = false;

   } else {
      showError('Please check your numbers');
   }
}

function showError(error_message) {
   document.getElementById('submit-btn').disabled = false;
   document.getElementById('results').style.display = 'none';
   document.getElementById('loading').style.display = 'none';

   const errorDiv = document.createElement('div');
   errorDiv.className = 'alert alert-danger';
   errorDiv.appendChild(document.createTextNode(error_message));

   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   card.insertBefore(errorDiv, heading);

   setTimeout(()=>{
      document.querySelector('.alert').remove();
   }, 1500);
}