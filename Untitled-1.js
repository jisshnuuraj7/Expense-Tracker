document.addEventListener('DOMContentLoaded', () => {
    
    // Login Logic
    const loginBtn = document.getElementById("loginBtn");
    const loginPage = document.getElementById("loginPage");
    const dashboard = document.getElementById("dashboard");
    const logoutBtn = document.getElementById("logoutBtn");

    loginBtn.addEventListener("click", function() {
        let user = document.getElementById("username").value;
        let pass = document.getElementById("password").value;

        // Simple auth for demo
        if (user === "admin" && pass === "1234") {
            loginPage.style.display = "none";
            dashboard.style.display = "flex";
            populateTable();
            animateStats();
        } else {
            alert("Invalid Username or Password (use admin/1234)");
        }
    });

    // Add enter key support for login
    document.getElementById("password").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            loginBtn.click();
        }
    });

    // Logout Logic
    logoutBtn.addEventListener("click", function() {
        dashboard.style.display = "none";
        loginPage.style.display = "flex";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    });

    // Mock Data for Table
    const recentTransactions = [
        { description: "Salary Deposit", category: "Income", date: "Oct 24, 2023", type: "Income", amount: 4500.00 },
        { description: "Grocery Store", category: "Food & Dining", date: "Oct 23, 2023", type: "Expense", amount: 154.20 },
        { description: "Monthly Rent", category: "Housing", date: "Oct 21, 2023", type: "Expense", amount: 1200.00 },
        { description: "Electric Bill", category: "Utilities", date: "Oct 20, 2023", type: "Expense", amount: 85.50 },
        { description: "Freelance Work", category: "Income", date: "Oct 19, 2023", type: "Income", amount: 850.00 }
    ];

    function populateTable() {
        const tbody = document.getElementById("transaction-table-body");
        tbody.innerHTML = "";
        
        recentTransactions.forEach((transaction, index) => {
            // Add a small delay for animation effect
            setTimeout(() => {
                const tr = document.createElement("tr");
                const typeClass = transaction.type === "Income" ? "type-income" : "type-expense";
                const amountPrefix = transaction.type === "Income" ? "+" : "-";
                
                tr.innerHTML = `
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:32px; height:32px; border-radius:50%; background:var(--glass-bg); display:flex; justify-content:center; align-items:center; color:white;">
                                <ion-icon name="${transaction.type === 'Income' ? 'arrow-down-outline' : 'arrow-up-outline'}"></ion-icon>
                            </div>
                            ${transaction.description}
                        </div>
                    </td>
                    <td>${transaction.category}</td>
                    <td>${transaction.date}</td>
                    <td><span class="type-badge ${typeClass}">${transaction.type}</span></td>
                    <td style="font-weight:600;" class="${typeClass}">${amountPrefix}$${transaction.amount.toFixed(2)}</td>
                `;
                tr.style.animation = `fadeIn 0.3s ease forwards`;
                tbody.appendChild(tr);
            }, index * 100);
        });
    }

    // Number Counter Animation for Stats
    function animateStats() {
        const counters = [
            { id: 'total-balance', target: 12450.50, isCurrency: true },
            { id: 'monthly-income', target: 5350.00, isCurrency: true },
            { id: 'monthly-expenses', target: 2145.75, isCurrency: true },
            { id: 'savings-goal', target: 8000.00, isCurrency: true }
        ];

        counters.forEach(counter => {
            const el = document.getElementById(counter.id);
            let count = 0;
            const inc = counter.target / 50; // 50 steps
            
            const timer = setInterval(() => {
                count += inc;
                if(count >= counter.target) {
                    el.innerText = '$' + counter.target.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    clearInterval(timer);
                } else {
                    el.innerText = '$' + count.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                }
            }, 30);
        });
    }
});