// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle creating a new account
    const createAccountForm = document.querySelector('#create-account form');
    createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = createAccountForm.querySelector('input[type="text"]').value;
        const email = createAccountForm.querySelector('input[type="email"]').value;
        const password = createAccountForm.querySelector('input[type="password"]').value;

        // Check if the account already exists
        if (localStorage.getItem(email)) {
            alert("Account already exists with this email. Please login or use a different email.");
        } else {
            // Store account details in localStorage (password should be hashed in a real application)
            const accountData = { fullName, email, password };
            localStorage.setItem(email, JSON.stringify(accountData));

            alert("Account created successfully! You can now login.");
            createAccountForm.reset();
        }
    });

    // Function to handle login
    const loginForm = document.querySelector('#login form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Retrieve account data from localStorage
        const storedAccount = localStorage.getItem(email);
        
        if (storedAccount) {
            const accountData = JSON.parse(storedAccount);

            // Verify password
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
