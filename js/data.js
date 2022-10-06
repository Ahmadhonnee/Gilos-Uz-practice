const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        id: 123,
        title: "Redmi Note 10 Pro",
        img: "https://picsum.photos/id/103/300/200",
        price: 4300000,
        model: "Xiaomi",
        addedDate: "09-02-2022",
        benefits: ["8gb", "128gb", "Waterproof"],
      },
      {
        id: 124,
        title: "Samgung Note 20 Ultra",
        img: "https://picsum.photos/id/120/300/200",
        price: 8300000,
        model: "Samsung",
        addedDate: "09-02-2022",
        benefits: ["32gb", "1tb"],
      },
    ];

const manufacturers = [
  {
    id: 1,
    name: "Xiaomi",
  },
  {
    id: 2,
    name: "Apple",
  },
  {
    id: 3,
    name: "Samsung",
  },
  {
    id: 3,
    name: "Oppo",
  },
  {
    id: 3,
    name: "Huawei",
  },
];
