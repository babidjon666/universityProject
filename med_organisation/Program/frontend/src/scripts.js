const authForm = document.getElementById('auth-form');
const registrationForm = document.getElementById('registration-form');
const showRegistration = document.getElementById('show-registration');
const showAuth = document.getElementById('show-auth');

showRegistration.addEventListener('click', (e) => {
    e.preventDefault();
    authForm.style.display = 'none';
    registrationForm.style.display = 'block';
});

showAuth.addEventListener('click', (e) => {
    e.preventDefault();
    registrationForm.style.display = 'none';
    authForm.style.display = 'block';
});
document.addEventListener("DOMContentLoaded", function () {
    const personalInfoBtn = document.getElementById("personal-info-btn");
    const myTestsBtn = document.getElementById("my-tests-btn");
    const myReferralsBtn = document.getElementById("my-referrals-btn");
    const myRequestsBtn = document.getElementById("my-requests-btn");
    const logoutBtn = document.getElementById("logout-btn");

    const personalInfoSection = document.getElementById("personal-info-section");
    const myTestsSection = document.getElementById("my-tests-section");
    const myReferralsSection = document.getElementById("my-referrals-section");
    const myRequestsSection = document.getElementById("my-requests-section");

    // Function to hide all sections
    function hideAllSections() {
        personalInfoSection.style.display = "none";
        myTestsSection.style.display = "none";
        myReferralsSection.style.display = "none";
        myRequestsSection.style.display = "none";
    }

    // Event listeners for navigation buttons
    personalInfoBtn.addEventListener("click", function () {
        hideAllSections();
        personalInfoSection.style.display = "block";
    });

    myTestsBtn.addEventListener("click", function () {
        hideAllSections();
        myTestsSection.style.display = "block";
    });

    myReferralsBtn.addEventListener("click", function () {
        hideAllSections();
        myReferralsSection.style.display = "block";
    });

    myRequestsBtn.addEventListener("click", function () {
        hideAllSections();
        myRequestsSection.style.display = "block";
    });

    // Event listener for logout button
    logoutBtn.addEventListener("click", function () {
        alert("You have been logged out.");
        // Redirect to login page or perform logout logic here
        window.location.href = "login.html"; // Example redirect to login page
    });
});
