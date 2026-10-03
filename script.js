/* =========================================
   E-RENEW
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MODAL FUNCTIONS
========================================= */

function showLogin() {

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    registerModal.classList.remove("active");
    loginModal.classList.add("active");
}


function showRegister() {

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    loginModal.classList.remove("active");
    registerModal.classList.add("active");
}


function closeModal() {

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener("click", function(event) {

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    if (event.target === loginModal) {
        loginModal.classList.remove("active");
    }

    if (event.target === registerModal) {
        registerModal.classList.remove("active");
    }

});


/* =========================================
   USER REGISTRATION
========================================= */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const mobile =
        document.getElementById("registerMobile").value.trim();

    const role =
        document.getElementById("registerRole").value;

    const password =
        document.getElementById("registerPassword").value;


    /* Basic validation */

    if (!name || !email || !mobile || !role || !password) {

        alert("Please fill all the fields.");

        return;
    }


    /* Password validation */

    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    /* Mobile validation */

    if (!/^[0-9]{10}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;
    }


    /* Get existing users */

    let users =
        JSON.parse(localStorage.getItem("eRenewUsers")) || [];


    /* Check existing email */

    const existingUser =
        users.find(user => user.email === email);


    if (existingUser) {

        alert("An account with this email already exists.");

        return;
    }


    /* Create user */

    const newUser = {

        id: Date.now(),

        name: name,

        email: email,

        mobile: mobile,

        role: role,

        password: password,

        createdAt: new Date().toLocaleString()

    };


    /* Save user */

    users.push(newUser);

    localStorage.setItem(
        "eRenewUsers",
        JSON.stringify(users)
    );


    alert(
        "Registration successful! You can now login."
    );


    /* Clear form */

    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerMobile").value = "";
    document.getElementById("registerRole").value = "";
    document.getElementById("registerPassword").value = "";


    /* Open login */

    showLogin();

}


/* =========================================
   USER LOGIN
========================================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const role =
        document.getElementById("loginRole").value;


    if (!email || !password || !role) {

        alert("Please enter all login details.");

        return;
    }


    /* Get users */

    let users =
        JSON.parse(localStorage.getItem("eRenewUsers")) || [];


    /* Find user */

    const user = users.find(
        u =>
            u.email === email &&
            u.password === password &&
            u.role === role
    );


    if (!user) {

        alert(
            "Invalid email, password or role."
        );

        return;
    }


    /* Save logged-in user */

    localStorage.setItem(
        "eRenewCurrentUser",
        JSON.stringify(user)
    );


    alert(
        "Welcome " + user.name + "!"
    );


    /*
        For now we will show
        role-based dashboards
        inside the same website.
    */

    closeModal();

    openDashboard(role);

}


/* =========================================
   ROLE BASED DASHBOARD
========================================= */

function openDashboard(role) {

    switch (role) {

        case "admin":

            showAdminDashboard();

            break;


        case "company":

            showCompanyDashboard();

            break;


        case "refurbisher":

            showRefurbishmentDashboard();

            break;


        case "customer":

            showCustomerDashboard();

            break;


        default:

            alert("Invalid user role.");

    }

}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function showAdminDashboard() {

    alert(
        "Admin Dashboard will be created in the next step."
    );

}


/* =========================================
   COMPANY DASHBOARD
========================================= */

function showCompanyDashboard() {

    alert(
        "Company Dashboard will be created in the next step."
    );

}


/* =========================================
   REFURBISHMENT DASHBOARD
========================================= */

function showRefurbishmentDashboard() {

    alert(
        "Refurbishment Dashboard will be created in the next step."
    );

}


/* =========================================
   CUSTOMER DASHBOARD
========================================= */

function showCustomerDashboard() {

    alert(
        "Customer Marketplace will be created in the next step."
    );

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "eRenewCurrentUser"
    );

    alert("You have been logged out.");

    window.location.reload();

}


/* =========================================
   GET CURRENT USER
========================================= */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("eRenewCurrentUser")
    );

}


/* =========================================
   INITIALIZE APP
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "E-ReNew Platform Loaded Successfully"
        );

    }
);