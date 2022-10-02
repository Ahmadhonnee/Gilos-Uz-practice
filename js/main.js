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
addTypeOfForm();
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addPhoneToArray();
  renderPhones();

  myModal.hide();
});
deleteOrAddCard(products);
renderPhones();
