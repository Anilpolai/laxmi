import React from 'react'
import Slider from '../component/slider/slider'
import Marktag from '../component/marketag/marktag'
import CategorySection from '../component/categories/categories'
import NewArrival from '../component/newarrival/newarrival'
import BestSellers from '../component/newseller/bestselling'
import ShopSwiper from '../component/shoplook/shopswiper'

function Home() {
  return (
    <>
      <Slider />
      <Marktag />
      <CategorySection />
      <BestSellers/>
      <NewArrival />
      <ShopSwiper/>
    </>
  )
}

export default Home