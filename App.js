const products = [
  { id: "1", brand: "M1", title: "Lager", price: 3 },
  { id: "2", brand: "C6", title: "IPA", price: 5 },
  { id: "3", brand: "T0", title: "M", price: 4 },
  { id: "4", brand: "M2", title: "DM", price: 5 },
  { id: "5", brand: "S1", title: "Lager", price: 3 },
  { id: "6", brand: "G1", title: "Stout", price: 6 },
  { id: "7", brand: "BC", title: "Rye", price: 5 },
  { id: "8", brand: "P1", title: "Lager", price: 2.5 },
];

const brands = [
  { id: "M1", name: "Moretti" },
  { id: "C6", name: "Ceres" },
  { id: "T0", name: "Tennents" },
  { id: "M2", name: "Menabrea" },
  { id: "S1", name: "Sagres" },
  { id: "G1", name: "Guinness" },
  { id: "BC", name: "Bock" },
  { id: "P1", name: "Peroni" },
];

const bundles = [
  { id: "B_1", name: "Box da 4", products: ["1", "3", "6", "8"], price: "E11" },
  {
    id: "B_2",
    name: "Box da 6",
    products: ["4", "5", "6", "7", "1", "8"],
    price: "E12",
  },
];

const prices = [
  {
    id: "E11",
    type: "SUBS",
    steps: [
      { period: "W", discount: 10 }, //week
      { period: "M", discount: 20 },
    ],
  },

  {
    id: "E12",
    type: "SUBS",
    steps: [
      { period: "W", discount: 15 }, //week
      { period: "M", discount: 25 },
    ],
  },
];

const orders = [];

const getBundleById = (id) => {
  let totalPrice = 0;
  const currentBundle = bundles.find((item) => item.id == id);
  const currentProducts = currentBundle.products.map((product_id) => {
    const _product = JSON.parse(
      JSON.stringify(products.find((prod) => prod.id == product_id))
    );
    const _brand = brands.find((brand) => brand.id == _product.brand);
    _product.brand = _brand;
    totalPrice += _product.price;
    return _product;
  });
  const currentPrice = prices.find((price) => (price.id = currentBundle.price));
  currentPrice.steps.forEach((item) => {
    item.prevPrice = totalPrice;
    item.finalPrice = totalPrice - (totalPrice * item.discount) / 100;
  });
  return {
    ...currentBundle,
    products: currentProducts,
    price: currentPrice,
  };
};
const getAllBundles = () => {
  return bundles.map((bundle) => getBundleById(bundle.id));
};

const result = JSON.stringify(getAllBundles(), null, 2);

console.log(result);
