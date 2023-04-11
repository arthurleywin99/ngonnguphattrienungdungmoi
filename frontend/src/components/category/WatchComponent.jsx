import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCategory } from '../../actions/productActions'
import { WATCH } from '../../constants/categoryConstants'
import { Brands, ProductList } from '../shared/index'
function WatchComponent() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.getProductByCategory)

  const [brands, setBrands] = useState([])

  useEffect(() => {
    dispatch(getProductByCategory({ category: WATCH, order: 'discount' }))
  }, [dispatch])

  useEffect(() => {
    if (products) {
      const data = products
        .map((item) => item.brand)
        .reduce((accumulator, current) => {
          if (!accumulator.some((x) => x._id === current._id)) {
            accumulator.push(current)
          }
          return accumulator
        }, [])
      setBrands(data)
    }
  }, [products])

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div>
      {brands && <Brands brands={brands} />}
      {products && <ProductList products={products} />}
    </div>
  )
}

export default WatchComponent
