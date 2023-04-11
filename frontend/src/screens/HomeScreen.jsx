import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProductDiscount,
  getSamsungDiscount,
} from '../actions/productActions'
import { getWebInfo } from '../actions/webInfoActions'
import {
  MainDeal,
  MiddleBanner,
  SamsungDeal,
  Slider,
} from '../components/home/index'

function HomeScreen() {
  const dispatch = useDispatch()

  const {
    data,
    loading: getWebInfoLoading,
    error: getWebInfoError,
  } = useSelector((state) => state.getWebInfo)
  const {
    products: topDealProducts,
    loading: getTopDiscountLoading,
    error: getTopDiscountError,
  } = useSelector((state) => state.getProductTopDiscount)
  const {
    products: samsungDealProducts,
    loading: getSamsungTopDiscountLoading,
    error: getSamsungTopDiscountError,
  } = useSelector((state) => state.getSamsungTopDiscount)

  useEffect(() => {
    dispatch(getWebInfo())
    dispatch(getProductDiscount())
    dispatch(getSamsungDiscount())
  }, [dispatch])

  return getWebInfoLoading ||
    getTopDiscountLoading ||
    getSamsungTopDiscountLoading ? (
    <div>Loading</div>
  ) : getWebInfoError || getTopDiscountError || getSamsungTopDiscountError ? (
    <div>Error</div>
  ) : (
    <main>
      {data && (
        <>
          <Slider
            banner={data.filter((item) => item.name === 'Big Banner')[0].image}
            data={data}
          />
          <div className='w-full mt-[120px]'>
            <MiddleBanner
              image={
                data.filter((item) => item.name === 'Medium Banner')[0].image
              }
            />

            {topDealProducts && (
              <MainDeal
                dealBanner={
                  data.filter((item) => item.name === 'Deal Banner')[0].image
                }
              />
            )}

            {samsungDealProducts && <SamsungDeal />}
          </div>
        </>
      )}
    </main>
  )
}

export default HomeScreen
