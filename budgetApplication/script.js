function toBalance(event) {
  event.preventDefault()
  document.getElementById('balance').style.display = 'block'
  document.getElementById('income').style.display = 'none'
  document.getElementById('expenses').style.display = 'none'
}

function toIncome(event) {
  event.preventDefault()
  let tableLength = document.getElementById('table-income').tBodies.length
  if(tableLength === 2) fetchData('income')
  document.getElementById('income').style.display = 'block'
  document.getElementById('expenses').style.display = 'none'
  document.getElementById('balance').style.display = 'none'
}

function toExpense(event) {
  event.preventDefault()
  let tableLength = document.getElementById('table-expenses').tBodies.length
  if(tableLength === 2) fetchData('expenses')
  document.getElementById('income').style.display = 'none'
  document.getElementById('expenses').style.display = 'block'
  document.getElementById('balance').style.display = 'none'
}

async function balance() {
  let totalIncome = 0
  let totalExpenses = 0
  const income = await fetch('http://localhost:3000/income')
  const incomeResults = await income.json()
  incomeResults.forEach(result => {
    totalIncome += result.total
  });

  const expenses = await fetch('http://localhost:3000/expenses')
  const expensesResults = await expenses.json()
  expensesResults.forEach(result => {
    totalExpenses += result.total
  });
  let text = ''
  let color = ''
  if(totalIncome > totalExpenses) {
    text = 'Good finances. Currently income is greater than expenses!'
    color = 'green'
  } else if(totalIncome < totalExpenses) {
    text = 'Oh no... The income is less than the expenses'
    color = 'red'
  } else {
    text = 'income and expenses are balanced'
    color = 'black'
  }
  let balanceTotal = `
    <div>
      <h1 style="font-size: 3rem; color: green;">Rp. ${totalIncome}</h1>
      <h3 class="info">Income</h3>
    </div>
    <div>
      <h1 style="font-size: 3rem; color: red;">Rp. ${totalExpenses}</h1>
      <h3 class="info">Expenses</h3>
    </div>
  `
  document.getElementById('text').innerHTML = text
  document.getElementById('text').style.color = color
  document.querySelector('#overal').insertAdjacentHTML('afterbegin', balanceTotal)
}
balance()

function fetchData(type) {
  fetch(`http://localhost:3000/${type}`)
  .then(response => {
    return response.json()
  })
  .then(results => {
    const datas = results.map(data => {
      return `
        <tr>
          <td>${data.title}</td>
          <td>Rp. ${data.total}</td>
          <td>${data.date}</td>
          <td><a href="#delete" onclick="destroy(event, ${data.id}, '${type}')">Delete</a></td>
        </tr>
      `
    })
    if(datas) {
      document.querySelector(`#body-${type}`).insertAdjacentHTML("afterend", datas)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

function add(event, type) {
  event.preventDefault()
  let title = document.getElementById(`title-${type}`).value
  let total = Number(document.getElementById(`total-${type}`).value)
  const day = new Date().getDate()
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  const date = day + '/' + month + '/' + year
  fetch(`http://localhost:3000/${type}`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({title, total, date})
  })
  .then(_ => {
    console.log('Add new data done')
  })
  .catch(err => {
    console.log(err)
  })
}

function destroy(event, id, type) {
  event.preventDefault()
  fetch(`http://localhost:3000/${type}/${id}`, {
    method: 'DELETE'
  })
  .then(_ => {
    console.log('Delete done')
  })
  .catch(err => {
    console.log(err)
  })
}

