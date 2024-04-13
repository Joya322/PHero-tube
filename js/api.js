// data fetch
const dataLoad = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;
  displayCategories(categories);
};

const displayCategories = (categories) => {
  // categories.map(category=>console.log(category.category))
  // console.log(categories);

  // get categories div
  const categoryDiv = document.getElementById("category");

  categories.forEach((category) => {
    // create button
    const button = document.createElement("button");

    button.classList = `btn bg-not-clicked-multiple font-semibold text-lg`;

    button.innerText = category.category;

    // append child
    categoryDiv.appendChild(button);
  });

  loadCardsDetails();
};

const loadCardsDetails = async (id = "1000") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const info = data.data;
  displayCards(info);
};

const displayCards = (info) => {
  // get cards div
  const cards = document.getElementById("cards");
  info.forEach((element) => {
    console.log(element);
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
                  <p id="name" class="flex-grow-0 font-normal text-sm text-[rgba(23,23,23,0.7)]">${element.authors[0].profile_name}</p>
                  <i class="fa-solid fa-certificate text-blue-500"></i>
                </div>
                <p class="font-normal text-sm text-[rgba(23,23,23,0.7)]">${element.others.views} views</p>
              </div>
            </div>
          </div>
        `;
      
      cards.appendChild(card);
  });
};

dataLoad();
