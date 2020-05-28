const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransaction = [
//   { id: 1, text: 'Comida', amount: -20},
//   { id: 2, text: 'Sueldo', amount: 400},
//   { id: 3, text: 'Curso', amount: -10},
//   { id: 4, text: 'Laptop', amount: -300},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];




// Agregar Transaccion 

function addTransaction(e) {
  e.preventDefault();

  if(text.Value.trim() === '' || amounts.value.trim() === '') {
    alert('Favor de Ingresar texto y monto')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amounts: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues()

    updateLocalStorage();

    text.value = '';
    amount.value= '';

  }
}

// Generar ID aleatorea 
function generateID() {
  return Math.floor(Math.random()* 10000000);
}

//Agrega las transacciones al DOM list

function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  //Agregar las clases segun valor

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
    </span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Refresca el los movimientos, gastos y ingresos
function updateValues() {
  const amounts = transactions.map(transaction=>transaction.amount);
  
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
     .reduce((acc, item) => (acc +=item), 0)
      .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc +=item), 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;


}

// Remover las transacciones por id 
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Actualiza el local storage

function updateLocalStorage() {
  localStorage.setItem('transaction', JSON.stringify(transactions));
}

//Iniciando App

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);