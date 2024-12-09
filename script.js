
const formTitle = document.getElementById("form-title");
const authForm = document.getElementById("auth-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const toggleAuth = document.getElementById("toggle-auth");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");

let isLogin = true;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const shortPassword = (password) => password.length >= 6;
const LongPassword=(password)=>password.length<=10; 


toggleAuth.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Register";
  submitBtn.textContent = isLogin ? "Login" : "Register";
  toggleAuth.innerHTML = isLogin
    ? `Don't have an account? <a href="#" class="text-decoration-none text-primary">Register</a>`
    : `Already have an account? <a href="#" class="text-decoration-none text-primary">Login</a>`;
  errorMessage.textContent = "";
  successMessage.textContent = "";
  authForm.reset();
});


authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";
  successMessage.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!isValidEmail(email)) {
    emailInput.classList.add("is-invalid");
    return;
  } else {
    emailInput.classList.remove("is-invalid");
  }

  if (!shortPassword(password) || !LongPassword(password)) {
    passwordInput.classList.add("is-invalid");
    errorMessage.textContent = "Password must be between 6 and 10 characters.";
    return;
  } else {
    passwordInput.classList.remove("is-invalid");
  }
  

  if (isLogin) {
 
    const storedPassword = localStorage.getItem(email);
    if (!storedPassword) {
      errorMessage.textContent = "Email not registered. Please register first.";
    } else if (storedPassword !== password) {
      errorMessage.textContent = "Incorrect password. Please try again.";
    } else {
      successMessage.textContent = "Login successful! Redirecting to Home...";
      setTimeout(() => goToHome(email), 1500);
    }
  } else {

    if (localStorage.getItem(email)) {
      errorMessage.textContent = "Email already registered. Please log in.";
    } else {
      localStorage.setItem(email, password);
      successMessage.textContent = "Registration successful! Redirecting to Login...";
      setTimeout(() => toggleAuth.click(), 1500);
    }
  }
});


const goToHome = (email) => {
  document.body.innerHTML = `
    <div class="container text-center mt-5">
      <h2>Welcome, ${email}!</h2>
      <button class="btn btn-secondary mt-3" onclick="logout()">Logout</button>
    </div>
  `;
};


const logout = () => {
  location.reload();
};
