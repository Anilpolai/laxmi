import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate, useLocation } from 'react-router-dom';
import './categories.css';

export default function CategorySection() {
  const categories = useSelector((state) => state.categories.list);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  const categoryLinks = {
    'kurti': '/kurti',
    'kurti-set': '/kurti-set',
    'tunics': '/tunics',
    'co-ord': '/co-ord',
  };

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const goToCategory = (cat) => {
    const link = categoryLinks[cat.name.toLowerCase()];
    if (link) navigate(link);
  };

  return (
    <div className="categories-container">
      {isMobile ? (
        <Swiper spaceBetween={30} slidesPerView={'auto'} grabCursor={true}>
          {categories.map((cat, index) => (
            <SwiperSlide
              key={index}
              style={{ width: 130, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div
                className={`category-item ${location.pathname === categoryLinks[cat.name.toLowerCase()] ? 'active' : ''}`}
                onClick={() => goToCategory(cat)}
              >
                <div className="category-image">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p className="category-name">{cat.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="categories-row">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-item ${location.pathname === categoryLinks[cat.name.toLowerCase()] ? 'active' : ''}`}
              onClick={() => goToCategory(cat)}
            >
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
