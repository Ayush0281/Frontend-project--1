let total = 0;

function addItem(name, price) {

 
  const li = document.createElement("li");

  const text = document.createElement("span");
  text.textContent = name + " - ₹" + price;

  const btn = document.createElement("button");
  btn.textContent = "❌";

  btn.onclick = function () {
    li.remove();
    total -= price;
    updateTotal();
  };

  li.appendChild(text);
  li.appendChild(btn);

  document.getElementById("cartItems").appendChild(li);

  total += price;
  updateTotal();
}
function updateTotal() {
  document.getElementById("total").textContent = total;
}

function bookNow() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    showToast("Please fill all details");
    return;
  }

  if (total === 0) {
    showToast("Please add at least one service");
    return;
  }

  const btn = document.querySelector(".form-box button");

  // ✅ SHOW LOADER
  btn.innerHTML = '<span class="loader"></span>';
  btn.disabled = true;

  // ✅ SEND EMAIL
  emailjs.send("service_5lpj7kg", "template_32gi9fm", {
    name, email, phone, total
  })
  .then(function(response) {
    showMessage();
    showToast("Booking successful!");

    btn.innerHTML = "Book Now";
    btn.disabled = false;
  })
  .catch(function(error) {
    showToast("Failed to send email");

    btn.innerHTML = "Book Now";
    btn.disabled = false;
  });
}

function scrollToBooking() {
  document.querySelector(".booking-service").scrollIntoView({
    behavior: "smooth"
  });
}


function showMessage() {
  document.getElementById("successMsg").style.display = "block";

  const line = document.querySelector(".bottom-line");
  line.classList.add("show-line");

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  // Clear cart
  document.getElementById("cartItems").innerHTML = "";
  total = 0;
  updateTotal();
}


function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


function subscribe() {
  const name = document.getElementById("subName").value;
  const email = document.getElementById("subEmail").value;

  if (!name || !email) {
    showToast("Please fill all fields");
    return;
  }

  showToast("Subscribed successfully!");
}


function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}