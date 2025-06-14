let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
let token = localStorage.getItem("token");

let public = `
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

let private = `
  <section class="private">
    <div class="container">
      <div class="private__inner">
        <div class="private__top">
          <h1 class="private__top-title page-title">private</h1>
          <div class="top">
            <form action="#" class="private__form">
              <input placeholder="qidirish" type="text" class="private__input" />
              <button class="private__btn">qidirish</button>
            </form>
            <button class="burger-btn">
              <div class="open">
                <span class="open-span"></span>
                <span class="open-span"></span>
                <span class="open-span"></span>
              </div>
            </button>
          </div>
          <div class="search-div">
          <div class="btn-div">
          <h1 class="page-title">navbar</h1>
          <button class="side-close">
            <span class="close-span"></span>
            <span class="close-span"></span>
            <span class="close-span"></span>
            </button>
          
          </div>
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

  <!-- Modal dialogs -->
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
      <button class="second-yopish-btn">yopish</button>
        <button class="second-saqlash-btn">saqlash</button>
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

let favoritepage = `
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

// -------------------- MAIN LOGIC --------------------
if (token) {
  // alert("Siz tizimga kirdingiz!!!");
  document.body.innerHTML = private;
  initializePrivatePage();

  // -------------------- FUNCTIONS --------------------
  function initializePrivatePage() {
    let elform = document.querySelector(".private__form");
    let elinput = document.querySelector(".private__input");
    let ellist = document.querySelector(".page__list");
    let elmodal = document.querySelector(".modal");
    let ellogout = document.querySelector(".log-out");
    let favoriteshow = document.querySelector(".favorite-show");
    let elburger = document.querySelector(".burger-btn");

    updateFavoriteUI();
    ellist.innerHTML = `<h1 class="list-title">Filimni qidiring!</h1>`;

    // Submit qidiruv
    elform.onsubmit = (evt) => {
      evt.preventDefault();
      let name = elinput.value.trim();
      if (name.length === 0) return;

      ellist.innerHTML = '<h1 class="list-title">loading...</h1>';
      render(name);
      elinput.value = "";
    };

    // Logout
    ellogout.onclick = () => {
      elmodal.classList.add("block");
      document.querySelector(".close-btn").onclick = () =>
        elmodal.classList.remove("block");
      document.querySelector(".ok-btn").onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favorite");
        window.location.reload();
      };
    };

    // Favorites sahifasiga o'tish
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

    let elSearchDiv = document.querySelector(".search-div");
    let elFavoriteShow = document.querySelector(".favorite-show");
    let elLogoutBtn = document.querySelector(".log-out");
    let elSideClose = document.querySelector(".side-close");

    if (elburger && elSideClose) {
      elburger.addEventListener("click", () => {
        elburger.classList.toggle("none");
        elSearchDiv.classList.toggle("block");
        elSearchDiv.classList.toggle("burger-div");
        elSearchDiv.classList.toggle("burger-search-div");
        elFavoriteShow.classList.toggle("burger-favorite-show");
        elLogoutBtn.classList.toggle("burger-log-out");
      });

      elSideClose.addEventListener("click", () => {
        elSearchDiv.classList.remove(
          "block",
          "burger-div",
          "burger-search-div"
        );
        elburger.classList.toggle("none");

        elFavoriteShow.classList.remove("burger-favorite-show");
        elLogoutBtn.classList.remove("burger-log-out");
      });
    }
  }

  function updateFavoriteUI() {
    let elfavoritenum = document.querySelector(".favorite-num");
    if (elfavoritenum) {
      elfavoritenum.textContent = favorite.length;
    }
  }

  async function render(filmname) {
    try {
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
      updateFavoriteUI();

      // Favorite tugma logikasi
      let elFavoriteBtn = document.querySelector(".favorite-btn");
      let elModal = document.querySelector(".second-modal");
      let elSuccessModal = document.querySelector(
        ".second-modal-muvaffaqiyatli"
      );
      let elAlreadySavedModal = document.querySelector(".second-modal-avval");

      elFavoriteBtn.onclick = () => {
        if (favorite.some((item) => item.Title === data.Title)) {
          elAlreadySavedModal.classList.add("block");
        } else {
          elModal.classList.add("block");
        }
      };

      document.querySelector(".second-saqlash-btn").onclick = () => {
        if (!favorite.some((item) => item.Title === data.Title)) {
          favorite.push(data);
          localStorage.setItem("favorite", JSON.stringify(favorite));
          updateFavoriteUI();
        }
        elModal.classList.remove("block");
        elSuccessModal.classList.add("block");
      };

      document.querySelector(".second-ochirish-btn").onclick = () => {
        favorite = favorite.filter((item) => item.Title !== data.Title);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        updateFavoriteUI();
        elAlreadySavedModal.classList.remove("block");
        alert(`${data.Title} favoritlardan o‘chirildi!`);
      };

      document.querySelector(".second-yopish-btn").onclick = () =>
        elModal.classList.remove("block");
      document.querySelector(".second-yopish-btn--active").onclick = () =>
        elSuccessModal.classList.remove("block");
      document.querySelector(".second-yopish-btn-avval").onclick = () =>
        elAlreadySavedModal.classList.remove("block");
    } catch (error) {
      console.error("Xatolik:", error);
    }
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
      <li class="page__item--active page__item">
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
} else {
  document.body.innerHTML = public;
}
