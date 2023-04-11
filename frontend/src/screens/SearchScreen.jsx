import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchProduct } from '../actions/searchActions'
import Brands from '../components/shared/Brands'
import ProductList from '../components/shared/ProductList'

function SearchScreen() {
  const dispatch = useDispatch()
  const { content, order } = useParams()

  const { products, loading, error } = useSelector((state) => state.searchProduct)

  const [brands, setBrands] = useState([])

  useEffect(() => {
    dispatch(searchProduct(content, order))
  }, [content, order, dispatch])

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

export default SearchScreen
