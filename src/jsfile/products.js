// Import Kurti images
import k1 from '../img/kurti/blue1.jpg';
import k2 from '../img/kurti/light1.jpg';
import k3 from '../img/kurti/blue2.jpg';
import k4 from '../img/kurti/pink1.jpg';



import ks1 from '../img/kurti/blue1.jpg';
import ks2 from '../img/kurti/light1.jpg';
import ks3 from '../img/kurti/blue2.jpg';
// Import Kurti Set images
// import ks1 from '../img/kurtiset/set1.jpg';
// import ks2 from '../img/kurtiset/set2.jpg';
// import ks3 from '../img/kurtiset/set3.jpg';

// Import Tunics images
// import t1 from '../img/tunics/t1.jpg';
// import t2 from '../img/tunics/t2.jpg';
import t1 from '../img/kurti/blue1.jpg';
import t2 from '../img/kurti/light1.jpg';

// Import Co-Ord images
// import c1 from '../img/coord/c1.jpg';
// import c2 from '../img/coord/c2.jpg';
import c1 from '../img/kurti/blue2.jpg';
import c2 from '../img/kurti/pink1.jpg';

/* -------------------------------
   Kurti Products
---------------------------------*/
export const kurti = [
  {
    id: "kurti-1",
    category: "kurti",
     bestSelling: true ,
    name: "Embroidered Kurti",
    price: 1299,
    stock: 10,
    discount: 10,
    fabric: "Cotton",
    image: k1,
    hoverimage: k3,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description: "A beautifully embroidered cotton kurti, perfect for casual and festive wear.",
    images: [k1, k3],
    video: "/videos/kurti-1.mp4",
    descriptionDetails: [
      { label: "Fabric", value: "Kurti : Cotton Linen | Bottom :" },
      { label: "Color", value: "Kurti : Pink | Bottom :" },
      { label: "Occasion", value: "Festival Casual Women Wear" },
      { label: "Work", value: "Embroidered" },
      {
        label: "Do note",
        value: "Accessories shown are for shooting purpose. Color variation may occur.",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Priya Sharma",
        avatar: "/avatars/user1.jpg",
        rating: 5,
        comment: "Loved the fabric quality! Perfect fit.",
        date: "2025-08-28",
      },
      {
        id: 2,
        name: "Anjali Verma",
        avatar: "/avatars/user2.jpg",
        rating: 4,
        comment: "Very comfortable, but color is slightly different.",
        date: "2025-08-30",
      },
    ],
  },
  {
    id: "kurti-2",
    category: "kurti",
    name: "Light Cotton Kurti",
    price: 999,
    stock: 15,
    discount: 5,
    fabric: "Cotton",
    image: k2,
    hoverimage: k4,
    sizes: ["M", "L", "XL"],
    description: "Soft light cotton kurti, ideal for everyday wear in summer.",
    images: [k2, k4],
    video: "/videos/kurti-2.mp4",
    reviews: [
      {
        id: 1,
        name: "Riya Kapoor",
        avatar: "/avatars/user3.jpg",
        rating: 5,
        comment: "Super light and airy. Great for hot days!",
        date: "2025-08-25",
      },
    ],
  },
];

/* -------------------------------
   Kurti Set Products
---------------------------------*/
export const kurtiSet = [
  {
    id: "kurtiSet-1",
    category: "kurtiSet",
      bestSelling: true ,
    name: "Blue Kurti Set",
    price: 1899,
    stock: 12,
    discount: 15,
    fabric: "Silk Blend",
    image: ks1,
    hoverimage: ks2,
    sizes: ["S", "M", "L", "XL"],
    description: "Elegant blue kurti set with matching bottom & dupatta.",
    images: [ks1, ks2, ks3],
    video: "/videos/kurtiset-1.mp4",
    reviews: [],
  },
];

/* -------------------------------
   Tunics Products
---------------------------------*/
export const tunics = [
  {
    id: "tunics-1",
    category: "tunics",
    name: "Casual Tunic Top",
    price: 799,
    stock: 20,
    discount: 0,
    fabric: "Rayon",
    image: t1,
    hoverimage: t2,
    sizes: ["S", "M", "L"],
    description: "Trendy rayon tunic top for daily wear.",
    images: [t1, t2],
    reviews: [],
  },
];

/* -------------------------------
   Co-Ord Products
---------------------------------*/
export const coord = [
  {
    id: "coord-1",
    category: "coord",
    name: "Stylish Co-Ord Set",
    price: 2199,
    stock: 8,
    discount: 20,
    fabric: "Poly Cotton",
    image: c1,
    hoverimage: c2,
    sizes: ["M", "L", "XL"],
    description: "Modern co-ord set for party & casual outings.",
    images: [c1, c2],
    reviews: [],
  },
];
export const products = [
  ...kurti,
  ...kurtiSet,
  ...tunics,
  ...coord,
];

