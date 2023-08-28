const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phonesGottenFromApi = data.data;
  displayPhones(phonesGottenFromApi, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const cardContainer = document.getElementById("cards-container");

  //   Clearing Previously loaded data
  cardContainer.textContent = "";

  //   display showAll button if there is more than 12 phones

  const showAllBtn = document.getElementById("show-all-button");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  //   Show a specific amount of phone
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    // let phoneId = phone.slug;
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure>
            <img
            src=${phone.image}
            alt="Shoes" class="bg-[#0d6efd0d] " />
        </figure>
        <div class="card-body">
            <h2 class="text-center text-4xl font-bold mt-6">${phone.phone_name}</h2>
            <p></p>
            <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details </button>
            </div>
        </div>
    `;
    cardContainer.appendChild(phoneCard);
  });

  //   Stop loader
  loader(false);
};

// Handle search

const handleSearch = (isShowAll) => {
  loader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const loader = (isLoading) => {
  const loadingRing = document.getElementById("loading");
  if (isLoading) {
    loadingRing.classList.remove("hidden");
  } else {
    loadingRing.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const showDetails = async (id) => {
  //   console.log("clicked", id);

  //   load phone details
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  show_details_modal.showModal();
  const dialog = document.getElementById("show_details_modal");
  dialog.innerHTML = `
    <form method="dialog" class="modal-box">
        <div class="flex justify-center bg-[#0d6efd0d] py-9">
            <img src="${phone.image}" alt="">
        </div>
        <h3 class="font-bold text-lg mt-10">${phone.name}</h3>
        <p><span class="font-semibold">Storage : </span>${phone.mainFeatures.storage}</p>
        <p><span class="font-semibold">Display Size : </span>${phone.mainFeatures.displaySize}</p>
        <p><span class="font-semibold">Chipset : </span>${phone.mainFeatures.chipSet}</p>
        <p><span class="font-semibold">Memory : </span>${phone.mainFeatures.memory}</p>
        <p><span class="font-semibold">Slug : </span>${phone.slug}</p>
        <p><span class="font-semibold">Release Date : </span>${phone.releaseDate}</p>
        <p><span class="font-semibold">Brand : </span>${phone.brand}</p>
        <p><span class="font-semibold">GPS : </span>${phone?.others?.GPS}</p>

        <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </div>
    </form>
  `;
};

loadPhone("iphone");
