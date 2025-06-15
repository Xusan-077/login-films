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
          <button class="history-btn private__btn">history</button>
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

let History = `
<section class="historypage">
  <div class="container">
    <div class="historypage__inner">
      <div class="historypage__top">
        <h1 class="page-title">Qidiruv Tarixi</h1>
        <button class="historypage__btn private__btn">Privatega qaytish</button>
      </div>
      <div class="table-wrapper">
        <table class="history-table">
          <div>
            <div class="history__title">
              <div class="history__item-title history__item-title--active">№</div>
              <div class="history__item-title history__item-title--active">film nomi</div>
              <div class="history__item-title history__item-title--active">Qidirilgan vaqt</div>
            </div>
          </div>
          <ul class="history-list"></ul>
        </table>
      </div>
    </div>
  </div>
</section>

`;

// -------------------- MAIN LOGIC --------------------
if (token) {
  document.body.innerHTML = private;
  initializePrivatePage();

  // === PRIVATE PAGE FUNCTIONALITY ===
  function initializePrivatePage() {
    const elForm = document.querySelector(".private__form");
    const elInput = document.querySelector(".private__input");
    const elList = document.querySelector(".page__list");

    updateFavoriteUI();
    elList.innerHTML = `<h1 class="list-title">Filimni qidiring!</h1>`;

    // === SEARCH FUNCTION ===
    elForm.onsubmit = (evt) => {
      evt.preventDefault();
      const name = elInput.value.trim();
      if (name) {
        elList.innerHTML = '<h1 class="list-title">loading...</h1>';
        render(name);
        elInput.value = "";
      }
    };

    // === LOGOUT ===
    logout();

    // === FAVORITE PAGE ===
    favoriteshow();

    // === HISTORY PAGE ===

    document.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key.toLowerCase() === "h") {
        event.preventDefault();

        clickhistory();
      }
    });

    if (document.querySelector(".history-btn")) {
      clickhistoryphone();
    }

    // === BURGER MENU ===
    burger();
  }

  // === render other function ===
  function clickhistory() {
    document.body.innerHTML = History;
    const history = JSON.parse(localStorage.getItem("history")) || [];

    const elHistoryList = document.querySelector(".history-list");
    renderHistory(history, elHistoryList);

    elHistoryList.onclick = (evt) => {
      function history() {
        document.querySelector(".history-btn").onclick = () => {
          document.body.innerHTML = History;
          const history = JSON.parse(localStorage.getItem("history")) || [];

          const elHistoryList = document.querySelector(".history-list");
          renderHistory(history, elHistoryList);

          elHistoryList.onclick = (evt) => {
            if (evt.target.closest(".history__item")) {
              document.body.innerHTML = private;
              render(evt.target.closest(".history__item").dataset.id);
              burger();
              favoriteshow();
            }
          };

          document.querySelector(".historypage__btn").onclick = () => {
            document.body.innerHTML = private;
            initializePrivatePage();
          };
        };
      }
      if (evt.target.closest(".history__item")) {
        document.body.innerHTML = private;
        render(evt.target.closest(".history__item").dataset.id);
        burger();
        favoriteshow();
        history();
        logout();
      }
    };

    document.querySelector(".historypage__btn").onclick = () => {
      document.body.innerHTML = private;
      initializePrivatePage();
    };
  }
  function clickhistoryphone() {
    document.querySelector(".history-btn").onclick = () => {
      document.body.innerHTML = History;
      const history = JSON.parse(localStorage.getItem("history")) || [];

      const elHistoryList = document.querySelector(".history-list");
      renderHistory(history, elHistoryList);

      elHistoryList.onclick = (evt) => {
        function history() {
          document.querySelector(".history-btn").onclick = () => {
            document.body.innerHTML = History;
            const history = JSON.parse(localStorage.getItem("history")) || [];

            const elHistoryList = document.querySelector(".history-list");
            renderHistory(history, elHistoryList);

            elHistoryList.onclick = (evt) => {
              if (evt.target.closest(".history__item")) {
                document.body.innerHTML = private;
                render(evt.target.closest(".history__item").dataset.id);
                burger();
                favoriteshow();
              }
            };

            document.querySelector(".historypage__btn").onclick = () => {
              document.body.innerHTML = private;
              initializePrivatePage();
            };
          };
        }
        if (evt.target.closest(".history__item")) {
          document.body.innerHTML = private;
          render(evt.target.closest(".history__item").dataset.id);
          burger();
          favoriteshow();
          history();
          logout();
        }
      };

      document.querySelector(".historypage__btn").onclick = () => {
        document.body.innerHTML = private;
        initializePrivatePage();
      };
    };
  }
  function logout() {
    const elModal = document.querySelector(".modal");
    const elLogout = document.querySelector(".log-out");

    elLogout.onclick = () => {
      elModal.classList.add("block");
      document.querySelector(".close-btn").onclick = () =>
        elModal.classList.remove("block");
      document.querySelector(".ok-btn").onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("favorite");
        window.location.reload();
      };
    };
  }
  function burger() {
    const elBurger = document.querySelector(".burger-btn");
    const elFavoriteShow = document.querySelector(".favorite-show");
    const elSearchDiv = document.querySelector(".search-div");
    const elLogoutBtn = document.querySelector(".log-out");
    const elSideClose = document.querySelector(".side-close");

    if (elBurger && elSideClose) {
      elBurger.addEventListener("click", () => {
        elBurger.classList.toggle("none");
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
        elBurger.classList.toggle("none");
        elFavoriteShow.classList.remove("burger-favorite-show");
        elLogoutBtn.classList.remove("burger-log-out");
      });
    }
  }
  function favoriteshow() {
    const elFavoriteShow = document.querySelector(".favorite-show");
    elFavoriteShow.onclick = () => {
      document.body.innerHTML = favoritepage;
      const elFavoriteList = document.querySelector(".favoritepage__list");
      const backBtn = document.querySelector(".favoritepage__btn");

      renderFavoriteList(favorite, elFavoriteList);

      backBtn.onclick = () => {
        document.body.innerHTML = private;
        initializePrivatePage();
      };
    };
  }

  // === RENDER FUNCTION ===
  async function render(filmname) {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${filmname}&apikey=5ab97502`
    );
    const data = await res.json();
    const elList = document.querySelector(".page__list");

    if (data.Response === "False") {
      elList.innerHTML = `<h1 class="list-title red">Bunday film topilmadi!</h1>`;
      return;
    }

    // Add to search history\

    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({
      title: data.Title,
      time: new Date().toLocaleString(),
    });
    localStorage.setItem("history", JSON.stringify(history));

    renderList(data, elList);
    updateFavoriteUI();
    setupFavoriteLogic(data);
  }

  // === FAVORITE BUTTON LOGIC ===
  function setupFavoriteLogic(data) {
    const elFavoriteBtn = document.querySelector(".favorite-btn");
    const elModal = document.querySelector(".second-modal");
    const elSuccessModal = document.querySelector(
      ".second-modal-muvaffaqiyatli"
    );
    const elAlreadySavedModal = document.querySelector(".second-modal-avval");

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

    document
      .querySelectorAll(
        ".second-yopish-btn, .second-yopish-btn--active, .second-yopish-btn-avval"
      )
      .forEach((btn) => {
        btn.onclick = () => {
          elModal.classList.remove("block");
          elSuccessModal.classList.remove("block");
          elAlreadySavedModal.classList.remove("block");
        };
      });
  }

  // === UPDATE FAVORITE COUNTER ===
  function updateFavoriteUI() {
    const elFavoriteNum = document.querySelector(".favorite-num");
    if (elFavoriteNum) {
      elFavoriteNum.innerHTML = favorite.length;
    }
  }

  // === RENDER MAIN FILM ITEM ===
  function renderList(obj, list) {
    list.innerHTML = `
    <li class="page__item">
      <img src="${obj.Poster}" alt="${obj.Title}" class="page__img" />
      <div class="page__text-div">
      <div>
      <h1 class="page__title"><span>Title:</span> ${obj.Title}</h1>
      <h1 class="page__title"><span>Released:</span> ${obj.Released}</h1>
      <h1 class="page__title"><span>Writer:</span> ${obj.Writer}</h1>
      <h1 class="page__title"><span>Language:</span> ${obj.Language}</h1>
      <h1 class="page__title"><span>Genre:</span> ${obj.Genre}</h1>
      <p class="page__title page__text"><span>Plot:</span> ${obj.Plot}</p>
      </div>
        <button class="favorite-btn">favorite ⭐</button>
      </div>
    </li>
  `;
  }

  // === RENDER FAVORITE LIST ===
  function renderFavoriteList(array, list) {
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

  // === RENDER SEARCH HISTORY ===
  function renderHistory(array, list) {
    list.innerHTML = "";
    array.forEach((el, index) => {
      list.innerHTML += `
      <div class="cliskhere">
      <li data-id=${el.title} class="history__item">
        <div class="history__item-title"><span class="history__item-span">№: </span>${
          index + 1
        }</div>
        <div class="history__item-title"><span class="history__item-span">film nomi: </span>${
          el.title
        }</div>
        <div class="history__item-title"><span class="history__item-span">Qidrilgan vaqt: </span>${
          el.time
        }</div>
      </li>
      </div>
    `;
    });
  }
} else {
  document.body.innerHTML = public;
}
