function renderPhones() {
  elResultList.innerHTML = null;

  products.forEach((phone) => {
    const templateCone = elTemplate.cloneNode(true).content;

    const { id, title, img, price, model, addedDate, benefits } = phone;

    const elIDBtn = templateCone.querySelector(".deleteBtn");
    elIDBtn.dataset.id = id;

    const elEditBtn = templateCone.querySelector(".editBtn");
    elEditBtn.dataset.id = id;

    const elImg = templateCone.querySelector(".phoneImg");
    elImg.src = img;

    const elPhoneTitle = templateCone.querySelector(".phoneTitle");
    elPhoneTitle.textContent = title;

    const elPhonePrice = templateCone.querySelector(".phonePrice");
    elPhonePrice.textContent = price;

    const elPhoneDiscountPrice = templateCone.querySelector(".phoneDiscount");
    const realPrice = Math.round(price + (price / 100) * 30);
    elPhoneDiscountPrice.textContent = realPrice;

    const elManufacturer = templateCone.querySelector(".phoneManufacturer");
    elManufacturer.textContent = model;

    const elDate = templateCone.querySelector(".phoneDate");
    elDate.textContent = addedDate;

    const elPhoneBenefits = templateCone.querySelector(".phoneBenefits");

    benefits.forEach((benefit) => {
      const benefitEl = document.createElement("li");
      benefitEl.className = "badge bg-primary me-1 mb-1";
      benefitEl.textContent = benefit;

      elPhoneBenefits.append(benefitEl);
    });
    elResultList.append(templateCone);
  });

  addMaufacturers();

  function addMaufacturers() {
    manufacturers.forEach((manufacturer) => {
      const manufacturerEl = document.createElement("option");
      manufacturerEl.value = manufacturer.name.toLowerCase();
      manufacturerEl.textContent = manufacturer.name;

      elManufacturer.append(manufacturerEl);
    });
  }
}

function newDATE() {
  const date = new Date();
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function addPhoneToArray() {
  if (elForm.dataset.type === "add") {
    let newPhone = {
      id: Math.floor(Math.random() * 1000),
      title: elTitleInput.value,
      img: "https://picsum.photos/id/103/300/200",
      price: +elPriceInput.value,
      model: elManufacturer.value,
      addedDate: newDATE(),
      benefits: elBenefitsInput.value.split(" "),
    };
    products.push(newPhone);
  }
}

function deleteOrAddCard(arr) {
  elResultList.addEventListener("click", (evt) => {
    if (evt.target.matches(".deleteBtn")) {
      const deleteBtnID = +evt.target.dataset.id;

      const deleteBtnIndex = arr.findIndex((delBtn) => {
        return delBtn.id === deleteBtnID;
      });

      arr.splice(deleteBtnIndex, 1);
      renderPhones();
    } else if (
      evt.target.matches(".editBtn") &&
      elForm.dataset.type !== "edit"
    ) {
      function putEditingValues(arr) {
        const editBtnID = +evt.target.dataset.id;
        const editingCard = arr.find((card) => card.id === editBtnID);
        const editingIndex = arr.findIndex((card) => card.id === editBtnID);
        editIndex = editingIndex;

        const {
          productTitle: elTitle,
          price: elPrice,
          productManufacturer: elManufacturer,
          benefits: elBenefits,
        } = elForm.elements;

        elTitle.value = editingCard.title;
        elPrice.value = editingCard.price;
        elManufacturer.value = editingCard.model;
        elBenefits.value = editingCard.benefits.join(" ");
      }
      putEditingValues(products);
      elForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        arr.splice(editIndex, 1, {
          id: Math.floor(Math.random() * 1000),
          title: elTitle.value,
          img: "https://picsum.photos/id/103/300/200",
          price: elPrice.value,
          model: elManufacturer.value,
          addedDate: newDATE(),
          benefits: elBenefits.value.split(" "),
        });
        renderPhones();
      });
    }
  });
}

function addTypeOfForm() {
  elBody.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (evt.target.matches(".addCardBtn")) {
      elForm.dataset.type = "add";
      elModalBtn.textContent = "Add product";

      elTitleInput.value = "";
      elPriceInput.value = "";
      elManufacturer.value = 0;
      elBenefitsInput.value = "";
      elModalFormTitle.textContent = "Add product";
    } else if (evt.target.matches(".editBtn")) {
      elForm.dataset.type = "edit";
      elModalBtn.textContent = "Edit product";
      elModalFormTitle.textContent = "Edit product";
    }
  });
}
