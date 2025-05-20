// User Registration
function registerUser() {
    let name = document.getElementById('regName').value;
    let email = document.getElementById('regEmail').value;
    let password = document.getElementById('regPassword').value;

    if (name === "" || email === "" || password === "") {
        document.getElementById('authMessage').textContent = "❌ Please fill all fields!";
        return;
    }

    let user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById('authMessage').textContent = "✅ Registration successful!";
}

// User Login
function loginUser() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
        document.getElementById('authMessage').textContent = "❌ Invalid login!";
    } else {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    }
}

// Display Profile Data
function displayProfile() {
    let storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        document.getElementById('profileData').textContent = `Name: ${storedUser.name} | Email: ${storedUser.email}`;
    }
}

// Update Profile
function updateProfile() {
    let name = document.getElementById('profileName').value;
    let email = document.getElementById('profileEmail').value;

    if (name === "" || email === "") return;

    let user = { name, email, password: JSON.parse(localStorage.getItem('user')).password };
    localStorage.setItem('user', JSON.stringify(user));
    displayProfile();
}

// Delete Profile
function deleteProfile() {
    localStorage.removeItem('user');
    document.getElementById('profileData').textContent = "❌ Profile deleted!";
}

// Logout
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = "index.html";
}

// Auto-load profile if logged in
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem('loggedIn')) {
        displayProfile();
    } else {
        window.location.href = "index.html";
    }
}