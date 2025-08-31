// src/data/kurti.js

import p1 from '../img/kurti/blue1.jpg';
import p2 from '../img/kurti/light1.jpg';
import p3 from '../img/kurti/blue2.jpg';
import p4 from '../img/kurti/pink1.jpg';

export const kurti = [
  {
    id: "kurti-1",
    name: "Embroidered Kurti",
    price: 1299,
    stock: 10,
    discount: 10,
    fabric: "Cotton",
    image: p1,
    hoverimage: p3,
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "A beautifully embroidered cotton kurti, perfect for casual and festive wear.",
    images: [p1, p3, p4], // product gallery
    video: "/videos/kurti-1.mp4", // optional product video
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
    name: "Light Cotton Kurti",
    price: 999,
    stock: 15,
    discount: 5,
    fabric: "Cotton",
    image: p2,
    hoverimage: p4,
    sizes: ["M", "L", "XL"],
    description:
      "Soft light cotton kurti, ideal for everyday wear in summer.",
    images: [p2, p4],
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

  // You can keep adding more products here with new IDs: "kurti-3", "kurti-4", etc.
];
