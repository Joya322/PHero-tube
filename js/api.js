// get header section
const header = document.getElementById("header");
header.classList = `max-w-[1300px] mx-auto mt-6`;
header.innerHTML = `
  <nav class="flex justify-between">
        <!-- logo -->
        <img src="./pictures/Logo.png" alt="logo" />
        <button class="btn bg-not-clicked-one font-medium text-lg">
          Sort by view
        </button>
        <button onclick="blogPage()" id = "blogBtn" class="btn bg-clicked text-white font-medium text-lg">
          Blog
        </button>
      </nav>
      <div class="border border-[rgba(23,23,23,0.2)] my-7"></div>
`;

// data fetch
const dataLoad = async () => {
  toggleLoadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;
  displayCategories(categories);
};

const displayCategories = (categories) => {
  // get categories div
  const categoryDiv = document.getElementById("category");

  categories.forEach((category) => {
    // create button
    const button = document.createElement("button");

    if (category.category === "All") {
      button.classList = `categoryBtn btn bg-clicked font-semibold text-lg text-white`;
    } else {
      button.classList = `categoryBtn btn bg-not-clicked-multiple font-semibold text-lg`;
    }
    button.setAttribute("onclick", `loadCardsDetails(${category.category_id})`);
    button.setAttribute("id", `c${category.category_id}`);
    button.innerText = category.category;

    // append child
    categoryDiv.appendChild(button);
  });

  toggleLoadingSpinner(false);
  loadCardsDetails();
};

const loadCardsDetails = async (id = "1000") => {
  toggleLoadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const info = data.data;
  displayCards(info);
};

const displayCards = (info) => {
  console.log(info);
  // button active status
  const room = document.querySelector(".categoryBtns");
  const btns = document.querySelectorAll(".categoryBtn");

  room.addEventListener("click", (event) => {
    btns.forEach((btn) => {
      if (btn.getAttribute("id") === event.target.getAttribute("id")) {
        btn.classList.add("bg-clicked", "text-white");
        btn.classList.remove("bg-not-clicked-multiple");
      } else {
        btn.classList.remove("bg-clicked", "text-white");
        btn.classList.add("bg-not-clicked-multiple");
      }
    });
  });

  
  // get cards div
  const cards = document.getElementById("cards");
  // clear previous cards content
  cards.textContent = "";
  
  if (info.length === 0) {
    cards.textContent = "";
    cards.classList = `flex flex-col gap-8 justify-center h-[500px] items-center`;
    cards.innerHTML = `<img src="./pictures/Icon.png" alt="">
    <p class = "font-bold text-3xl">Oops!! Sorry, There is no content here</p>
    `;
  } else {
    cards.textContent = "";
    cards.classList = `my-10 grid grid-cols-4 gap-5`;
    info.forEach((element) => {
      // create a div
      const card = document.createElement("div");
      card.classList = `card bg-base-100 shadow-xl`;

      card.innerHTML = `
            
            <figure>
              <img class="w-[312px] h-[200px]"
                src="${element.thumbnail}"
                alt=""
              />
            </figure>
            <div class="card-body p-0 py-5 pl-2 flex flex-row gap-3">
              <img
                class="w-[40px] h-[40px] rounded-full"
                src="${element.authors[0].profile_picture}"
                alt=""
              />
              <div class="">
                <h2 class="card-title font-bold text-base">
                  ${element.title}
                </h2>
                <div class="flex gap-2 items-center my-2">
                  <p id="name" class="flex-grow-0 font-normal text-sm text-[rgba(23,23,23,0.7)]">${
                    element.authors[0].profile_name
                  }</p>
                  ${
                    element.authors[0].verified === true ? (
                      `<i class="verify fa-solid fa-certificate text-blue-500"></i>`
                    ) : (
                      `<i class="verify fa-solid fa-certificate text-blue-500 hidden"></i>`
                    )
                  }
                  
                </div>
                <p class="font-normal text-sm text-[rgba(23,23,23,0.7)]">${
                  element.others.views
                } views</p>
              </div>
            </div>
          </div>
        `;
      cards.appendChild(card);
    });


  }
  toggleLoadingSpinner(false);

};

const toggleLoadingSpinner = (isLoading) => {
  // get spinner div
  const spinner = document.getElementById("spinner");

  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// create navbar

const blogPage = () => {
  const url = `blog.html`;
  window.open(url);
};

dataLoad();
