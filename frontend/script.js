document.addEventListener("DOMContentLoaded", function() {
    const createAccountForm = document.querySelector('#create-account form');
    createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = createAccountForm.querySelector('input[type="text"]').value;
        const email = createAccountForm.querySelector('input[type="email"]').value;
        const password = createAccountForm.querySelector('input[type="password"]').value;

        if (localStorage.getItem(email)) {
            alert("Account already exists with this email. Please login or use a different email.");
        } else {
            const accountData = { fullName, email, password };
            localStorage.setItem(email, JSON.stringify(accountData));

            alert("Account created successfully! You can now login.");
            createAccountForm.reset();
        }
    });

    const loginForm = document.querySelector('#login form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const storedAccount = localStorage.getItem(email);
        
        if (storedAccount) {
            const accountData = JSON.parse(storedAccount);

            if (accountData.password === password) {
                alert(`Welcome, ${accountData.fullName}! You are now logged in.`);
                loginForm.reset();
            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("Account not found. Please create an account.");
        }
    });
});
