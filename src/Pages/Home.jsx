import React from 'react'
import Slider from '../component/slider/slider'
import Marktag from '../component/marketag/marktag'
import CategorySection from '../component/categories/categories'
import Bestsellers from '../component/Bestsellers/bestselling'
import NewArrival from '../component/newarrival/newarrival'

function Home() {
  return (
    <>
      <Slider />
      <Marktag />
      <CategorySection />
      <Bestsellers/>
      <NewArrival />
    </>
  )
}

export default Home