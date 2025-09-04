// src/jsfile/size.js

export const SizeChart = {
  id: "p1",
  name: "Kurti",
  price: 1200,
  sizes: ["S", "M", "L", "XL"], // ✅ For Kurti size buttons
  sizeChart: [ // ✅ Kurti size table
    { label: "S", chest: "36\"", waist: "30\"", length: "26\"" },
    { label: "M", chest: "38\"", waist: "32\"", length: "27\"" },
    { label: "L", chest: "40\"", waist: "34\"", length: "28\"" },
    { label: "XL", chest: "42\"", waist: "36\"", length: "29\"" },
  ],
  pantSizes: ["28", "30", "32", "34", "36"], // ✅ For Pant size buttons
  pantChart: [ // ✅ Pant size table
    { label: "S", waist: "28\"", hips: "36\"", length: "38\"" },
    { label: "M", waist: "30\"", hips: "38\"", length: "39\"" },
    { label: "L", waist: "32\"", hips: "40\"", length: "40\"" },
    { label: "XL", waist: "34\"", hips: "42\"", length: "41\"" },
    { label: "XXL", waist: "36\"", hips: "44\"", length: "42\"" },
  ],
  images: ["/img1.jpg", "/img2.jpg"],
};
