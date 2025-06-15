let elEmail = document.querySelector(".email");
let elPassword = document.querySelector(".password");
let elForm = document.querySelector(".form");
let elinputtext1 = document.querySelector(".input-text1");
let elinputtext2 = document.querySelector(".input-text2");
let elinputtext3 = document.querySelector(".input-text3");

elForm.onkeyup = () => {
  // Email tekshiruv
  if (elEmail.value === "") {
    elinputtext1.innerHTML = "Iltimos, email kiriting";
    elinputtext1.style.color = "red";
    elinputtext3.innerHTML = "";
  } else if (!elEmail.value.includes("@reqres.in")) {
    elinputtext1.innerHTML = "Email formati noto‘g‘ri (@reqres.in)";
    elinputtext1.style.color = "red";
    elinputtext3.innerHTML = "";
  } else {
    elinputtext1.innerHTML = "To‘g‘ri email";
    elinputtext1.style.color = "green";
  }

  // Parol tekshiruv
  if (elPassword.value === "") {
    elinputtext2.innerHTML = "Iltimos, parol kiriting";
    elinputtext2.style.color = "red";
    elinputtext3.innerHTML = "";
  } else if (elPassword.value.length < 6) {
    elinputtext2.innerHTML = "Parol juda qisqa";
    elinputtext2.style.color = "red";
    elinputtext3.innerHTML = "";
  } else {
    elinputtext2.innerHTML = "Ajoyib parol";
    elinputtext2.style.color = "green";
  }

  if (
    elinputtext1.innerHTML === "To‘g‘ri email" &&
    elinputtext2.innerHTML === "Ajoyib parol"
  ) {
    elinputtext1.innerHTML = "";
    elinputtext2.innerHTML = "";

    elinputtext3.innerHTML = "Tizimga kirdingiz mumkun";
    elinputtext3.style.color = "green";
  } else {
    elinputtext3.innerHTML = "";
  }
};

elForm.onsubmit = (evt) => {
  evt.preventDefault();

  if (elEmail.value === "") {
    elinputtext1.innerHTML = "Iltimos, email kiriting";
    elinputtext1.style.color = "red";
  }

  if (elPassword.value === "") {
    elinputtext2.innerHTML = "Iltimos, parol kiriting";
    elinputtext2.style.color = "red";
  }

  if (elEmail.value.includes("@reqres.in") && elPassword.value.length >= 6) {
    fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: JSON.stringify({
        email: elEmail.value.trim(),
        password: elPassword.value.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
          elEmail.value = "";
          elPassword.value = "";
        } else {
          elinputtext3.innerHTML = "Bunday foydalanuvchi topilmadi!";
          elinputtext3.style.color = "red";
        }
      });
  }
};

let users = [
  "george.bluth@reqres.in",
  "janet.weaver@reqres.in",
  "emma.wong@reqres.in",
  "eve.holt@reqres.in",
  "charles.morris@reqres.in",
  "tracey.ramos@reqres.in",
];
let ellist = document.querySelector(".login-list");
ellist.innerHTML = "";
users.forEach((el) => {
  ellist.innerHTML += `
    <li data-id=${el} class="login-item">${el}</li>
  `;
});

ellist.onclick = (evt) => {
  if (evt.target.classList.contains("login-item")) {
    elEmail.value = evt.target.dataset.id;
    console.log("click");
  }
};