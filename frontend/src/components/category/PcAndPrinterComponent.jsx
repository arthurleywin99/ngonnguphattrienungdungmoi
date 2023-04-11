import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PC_AND_PRINTER } from '../../constants/categoryConstants'
import { getProductByCategory } from '../../actions/productActions'
import Brands from '../shared/Brands'
import ProductList from '../shared/ProductList'

function PcAndPrinterComponent() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.getProductByCategory)

  const [brands, setBrands] = useState([])

  useEffect(() => {
    dispatch(getProductByCategory({ category: PC_AND_PRINTER, order: 'discount' }))
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

export default PcAndPrinterComponent
