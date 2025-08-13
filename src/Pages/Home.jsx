import React from 'react'
import Slider from '../component/slider/slider'
import Marktag from '../component/marketag/marktag'
import CategorySection from '../component/categories/categories'
import BestSellers from '../component/Bestsellers/bestSellers'
import NewArrival from '../component/newarrival/newarrival'

function Home() {
  return (
    <>
      <Slider />
      <Marktag />
      <CategorySection />
      <BestSellers />
      <NewArrival />
    </>
  )
}

export default Home