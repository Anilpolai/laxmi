import React from 'react'
import Slider from '../component/slider/slider'
import Marktag from '../component/marketag/marktag'
import CategorySection from '../component/categories/categories'
import NewArrival from '../component/newarrival/newarrival'
import BestSellers from '../component/Bestsellers/bestselling'

function Home() {
  return (
    <>
      <Slider />
      <Marktag />
      <CategorySection />
      <BestSellers/>
      <NewArrival />
    </>
  )
}

export default Home