const elBody = document.querySelector("body");
const elForm = document.querySelector("#productForm");

const elTitleInput = document.querySelector("#productTitle");
const elPriceInput = document.querySelector("#price");
const elManufacturer = document.querySelector("#productManufacturer");
const elBenefitsInput = document.querySelector("#benefits");

const elModalBtn = document.querySelector("#addBtn");
const elModalFormTitle = document.querySelector("#editStudentModalLabel");
// const elAddCardBtn = document.querySelector("#addCardBtn")

const counter = document.querySelector("#counter");
const elTemplate = document.querySelector("#cardTemplate");

const elResultList = document.querySelector("#productList");
var editIndex;

const myModal = new bootstrap.Modal(
  document.getElementById("add-student-modal")
);

const elFilterForm = document.querySelector("#filterForm");
const elFilterManufacturers = document.querySelector("#manufacturer");

addTypeOfForm();
addManufacturersTo(manufacturers);
addManufacturersTo(manufacturers, elFilterManufacturers);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (elForm.dataset.type == "edit") {
    const editingID = elForm.dataset.editing;
    const editingIndex = products.findIndex((phone) => phone.id === +editingID);
    console.log(editingIndex);

    products.splice(editingIndex, 1, {
      id: editingID,
      title: elTitleInput.value,
      img: "https://picsum.photos/id/103/300/200",
      price: elPriceInput.value,
      model: elManufacturer.value,
      addedDate: newDATE(),
      benefits: elBenefitsInput.value.split(" "),
    });
    renderPhones(products);
  } else if (elForm.dataset.type == "add") {
    addPhoneToArray();
    renderPhones(products);
  }
  myModal.hide();
});
deleteCard(products);
renderPhones(products);

elFilterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const {
    search: { value: elSearchValue },
    from: { value: elFromValue },
    to: { value: elToValue },
    manufacturer: { value: elManufacturerValue },
    sortby: { value: elSortbyValue },
  } = elFilterForm.elements;

  const filtredProducts = products.filter((phone) => {
    return (
      phone.title.toLowerCase().includes(elSearchValue.toLowerCase()) &&
      phone.price >= elFromValue &&
      phone.price <= elToValue &&
      phone.model.toLowerCase().includes(elManufacturerValue.toLowerCase())
    );
  });
  renderPhones(filtredProducts);
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function renderPhones(arr) {
  elResultList.innerHTML = null;

  arr.forEach((phone) => {
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
  localStorage.setItem("products", products);
}
function addManufacturersTo(manufacturers, selectTag = elManufacturer) {
  manufacturers.forEach((manufacturer) => {
    const manufacturerEl = document.createElement("option");
    manufacturerEl.value = manufacturer.name;
    manufacturerEl.textContent = manufacturer.name;

    selectTag.append(manufacturerEl);
  });
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
    localStorage.setItem("products", products);
  }
}

function deleteCard(arr) {
  elResultList.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target.matches(".deleteBtn")) {
      const deleteBtnID = +evt.target.dataset.id;

      const deleteBtnIndex = arr.findIndex((delBtn) => {
        return delBtn.id === deleteBtnID;
      });

      arr.splice(deleteBtnIndex, 1);
      renderPhones(products);
    } else if (target.matches(".editBtn")) {
      elForm.dataset.editing = target.dataset.id;
      const editingID = +target.dataset.id;
      // const editingIndex = products.findIndex((card) => card.id === editingID);
      const editingCard = products.find((card) => card.id === editingID);

      const {
        productTitle: elTitleValue,
        price: elPriceValue,
        productManufacturer: elManufacturerValue,
        benefits: elBenefitsValue,
      } = elForm.elements;

      elTitleValue.value = editingCard.title;
      elPriceValue.value = editingCard.price;
      elManufacturerValue.value = editingCard.model;
      elBenefitsValue.value = editingCard.benefits.join(" ");
      console.log(elTitleValue.value);
    }
  });
}

function addTypeOfForm() {
  elBody.addEventListener("click", (evt) => {
    if (evt.target.matches(".addCardBtn")) {
      elForm.dataset.type = "add";
      elModalBtn.textContent = "Add product";

      elModalFormTitle.textContent = "Add product";

      const {
        productTitle: elTitleValue,
        price: elPriceValue,
        productManufacturer: elManufacturerValue,
        benefits: elBenefitsValue,
      } = elForm.elements;

      elTitleValue.value = "";
      elPriceValue.value = "";
      elManufacturerValue.value = 0;
      elBenefitsValue.value = "";
      console.log(elTitleValue.value);
    } else if (evt.target.matches(".editBtn")) {
      elForm.dataset.type = "edit";
      elModalBtn.textContent = "Edit product";
      elModalFormTitle.textContent = "Edit product";
    }
  });
}
