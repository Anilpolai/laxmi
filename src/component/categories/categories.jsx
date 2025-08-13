import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './categories.css';

export default function CategorySection() {
  const categories = useSelector((state) => state.categories.list);

  // Use window width to conditionally show Swiper only on mobile
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className="categories-container">
      {isMobile ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={'auto'}
          grabCursor={true}
        >
          {categories.map((cat, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: 130,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div className="category-item" onClick={() => alert(`Clicked ${cat.name}`)}>
                <div className="category-image">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p className="category-name">{cat.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Desktop/grid view
        <div className="categories-row">
          {categories.map((cat, index) => (
            <div className="category-item" key={index} onClick={() => alert(`Clicked ${cat.name}`)}>
              <div className="category-image">
                <img src={cat.img} alt={cat.name} />
              </div>
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
