let chart;

function calculateEMI() {
  const P = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("interestRate").value);
  const years = parseFloat(document.getElementById("loanTenure").value);

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / 
              (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  document.getElementById("emi").innerText = emi.toFixed(2);
  document.getElementById("totalInterest").innerText = totalInterest.toFixed(2);
  document.getElementById("totalPayment").innerText = totalPayment.toFixed(2);

  generateChart(P, totalInterest);
  generateSchedule(P, r, n, emi);
}

function generateChart(principal, interest) {
  const ctx = document.getElementById("emiChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ["#007bff", "#ff4d4d"]
      }]
    }
  });
}

function generateSchedule(P, r, n, emi) {
  let balance = P;
  const tbody = document.querySelector("#scheduleTable tbody");
  tbody.innerHTML = "";

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;

    const row = `
      <tr>
        <td>${month}</td>
        <td>${principal.toFixed(2)}</td>
        <td>${interest.toFixed(2)}</td>
        <td>${balance > 0 ? balance.toFixed(2) : 0}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  }
}

document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});