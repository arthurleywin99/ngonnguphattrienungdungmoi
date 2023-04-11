import React from 'react'
import Brands from '../shared/Brands'
import ProductList from '../shared/ProductList'

function LaptopComponent({ brands, products }) {
  return (
    <>
      <Brands brands={brands} />
      <ProductList products={products} />
    </>
  )
}

export default LaptopComponent
