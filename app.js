let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

const public = `
  <header class="page-header">
    <div class="container">
      <div class="page-header__inner">
        <h1 class="page-title">films</h1>
        <a href="./login.html" class="page-link">login</a>
      </div>
    </div>
  </header>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <h1 class="hero__title">Eng so‘nggi filmlarni tomosha qiling</h1>
        <p class="hero__text">Kino olamidagi yangiliklar, treylerlar va ko‘proq!</p>
      </div>
    </div>
  </section>
`;

const private = `
  <section class="private">
    <div class="container">
      <div class="private__inner">
        <div class="private__top">
          <h1 class="private__top-title page-title">private</h1>
          <div class="search-div">
            <form action="#" class="private__form">
              <input placeholder="qidirish" type="text" class="private__input" />
              <button class="private__btn">qidirish</button>
            </form>
            <div class="favorite__show-div">
              <div class="favorite-num"></div>
              <button class="favorite-show private__btn">favorite</button>
            </div>
            <button class="log-out private__btn">log out</button>
          </div>
        </div>
        <ul class="page__list"></ul>
      </div>
    </div>
  </section>
  <div class="modal">
    <div class="modal-content">
      <h1 class="modal__title">log out qilishni hohlaysizmi?</h1>
      <div class="modal-rozilik">
        <button class="close-btn">yoq</button>
        <button class="ok-btn">ha</button>
      </div>
    </div>
  </div>
  <div class="second-modal">
    <div class="second-modal-content">
      <h1 class="second-modal__title">filmni favoritega saqlashni hohlaysizmi?</h1>
      <div class="second-modal-rozilik">
        <button class="second-saqlash-btn">saqlash</button>
        <button class="second-yopish-btn">yopish</button>
      </div>
    </div>
  </div>
  <div class="second-modal-muvaffaqiyatli second-modal">
    <div class="second-modal-content">
      <h1 class="second-modal__title second-modal__title--active">film favoritga muvaffaqiyatli saqlandi</h1>
      <div class="second-modal-rozilik">
        <button class="second-yopish-btn--active second-yopish-btn">yopish</button>
      </div>
    </div>
  </div>
  <div class="second-modal-avval second-modal">
    <div class="second-modal-content">
      <h1 class="second-modal__title second-modal__title--active">film allaqachon favoritga saqlangan</h1>
      <div class="second-modal-rozilik">
        <button class="second-yopish-btn second-yopish-btn-avval">yopish</button>
        <button class="second-ochirish-btn second-saqlash-btn color">favoritdan ochirish</button>
      </div>
    </div>
  </div>
`;

const favoritepage = `
  <section class="favoritepage">
    <div class="container">
      <div class="favoritepage__inner">
        <div class="favoritepage__top">
          <h1 class="favoritepage__title page-title">favorite</h1>
          <button class="favoritepage__btn private__btn">privatega qaytish</button>
        </div>
        <div class="favoritepage__bottom">
          <h1 class="page-title page-title--active">Sizning sevimli filmlaringiz</h1>
          <ul class="favoritepage__list"></ul>
        </div>
      </div>
    </div>
  </section>
`;

let token = localStorage.getItem("token");

if (token) {
  document.body.innerHTML = private;
  initializePrivatePage();
} else {
  document.body.innerHTML = public;
}

function initializePrivatePage() {
  let elform = document.querySelector(".private__form");
  let elinput = document.querySelector(".private__input");
  let ellist = document.querySelector(".page__list");
  let elmodal = document.querySelector(".modal");
  let ellogout = document.querySelector(".log-out");
  let favoriteshow = document.querySelector(".favorite-show");

  updateFavoriteUI();
  ellist.innerHTML = `<h1 class="list-title">filimni qidiring!</h1>`;

  elform.onsubmit = (evt) => {
    evt.preventDefault();
    ellist.innerHTML = '<h1 class="list-title">loading...</h1>';
    render(elinput.value.trim());
    elinput.value = "";
  };

  ellogout.onclick = () => {
    elmodal.classList.add("block");
    document.querySelector(".close-btn").onclick = () =>
      elmodal.classList.remove("block");
    document.querySelector(".ok-btn").onclick = () => {
      localStorage.removeItem("token");
      window.location.reload();
    };
  };

  favoriteshow.onclick = () => {
    document.body.innerHTML = favoritepage;
    let elfavoritelist = document.querySelector(".favoritepage__list");
    let backBtn = document.querySelector(".favoritepage__btn");
    renderfavoritelist(favorite, elfavoritelist);
    backBtn.onclick = () => {
      document.body.innerHTML = private;
      initializePrivatePage();
    };
  };
}

function updateFavoriteUI() {
  let elfavoritenum = document.querySelector(".favorite-num");
  if (favorite.length > 0) {
    elfavoritenum.style.display = "block";
    elfavoritenum.textContent = favorite.length;
  } else {
    elfavoritenum.style.display = "none";
  }
}

async function render(filmname) {
  let res = await fetch(
    `https://www.omdbapi.com/?t=${filmname}&apikey=5ab97502`
  );
  let data = await res.json();
  let ellist = document.querySelector(".page__list");

  if (data.Response === "False") {
    ellist.innerHTML = `<h1 class="list-title red">Bunday film topilmadi!</h1>`;
    return;
  }

  renderlist(data, ellist);

  let elModal = document.querySelector(".second-modal");
  let elSuccessModal = document.querySelector(".second-modal-muvaffaqiyatli");
  let elAlreadySavedModal = document.querySelector(".second-modal-avval");
  let elFavoriteBtn = document.querySelector(".favorite-btn");
  let elSaveBtn = document.querySelector(".second-saqlash-btn");
  let elFavoriteremove = document.querySelector(".second-ochirish-btn");
  let elCloseBtn = document.querySelector(".second-yopish-btn");
  let elSuccessCloseBtn = document.querySelector(".second-yopish-btn--active");
  let elAlreadySavedCloseBtn = document.querySelector(
    ".second-yopish-btn-avval"
  );

  elFavoriteBtn.onclick = () => {
    if (favorite.some((item) => item.Title === data.Title)) {
      elAlreadySavedModal.classList.add("block");
    } else {
      elModal.classList.add("block");
    }
  };

  elSaveBtn.onclick = () => {
    if (!favorite.some((item) => item.Title === data.Title)) {
      favorite.push(data);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      updateFavoriteUI();
    }
    elModal.classList.remove("block");
    elSuccessModal.classList.add("block");
  };

  elFavoriteremove.onclick = () => {
    let index = favorite.findIndex((item) => item.Title === data.Title);
    if (index !== -1) {
      favorite.splice(index, 1);
      localStorage.setItem("favorite", JSON.stringify(favorite));
      updateFavoriteUI();
      elAlreadySavedModal.classList.remove("block");
      alert(`${data.Title} favoritlardan o‘chirildi!`);
    }
  };

  elCloseBtn.onclick = () => elModal.classList.remove("block");
  elSuccessCloseBtn.onclick = () => elSuccessModal.classList.remove("block");
  elAlreadySavedCloseBtn.onclick = () =>
    elAlreadySavedModal.classList.remove("block");
}

function renderlist(obj, list) {
  list.innerHTML = `
    <li class="page__item">
      <img src="${obj.Poster}" alt="${obj.Title}" class="page__img" />
      <div class="page__text-div">
        <h1 class="page__title"><span>Title:</span> ${obj.Title}</h1>
        <h1 class="page__title"><span>Year:</span> ${obj.Year}</h1>
        <h1 class="page__title"><span>Released:</span> ${obj.Released}</h1>
        <h1 class="page__title"><span>Writer:</span> ${obj.Writer}</h1>
        <h1 class="page__title"><span>Language:</span> ${obj.Language}</h1>
        <h1 class="page__title"><span>Genre:</span> ${obj.Genre}</h1>
        <p class="page__title page__text"><span>Plot:</span> ${obj.Plot}</p>
        <button class="favorite-btn">favorite ⭐</button>
      </div>
    </li>
  `;
}

function renderfavoritelist(array, list) {
  list.innerHTML = "";
  array.forEach((el) => {
    list.innerHTML += `
      <li class="page__item--active">
        <img src="${el.Poster}" alt="${el.Title}" class="page__img" />
        <div class="page__text-div">
          <h1 class="page__title page__title--active"><span>Title:</span> ${el.Title}</h1>
          <h1 class="page__title page__title--active"><span>Released:</span> ${el.Released}</h1>
          <h1 class="page__title page__title--active"><span>Language:</span> ${el.Language}</h1>
          <h1 class="page__title page__title--active"><span>Genre:</span> ${el.Genre}</h1>
        </div>
      </li>
    `;
  });
}

render("spider-man");