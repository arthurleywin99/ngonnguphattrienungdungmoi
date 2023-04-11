import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ShippingAddressComponent,
  PaymentComponent,
  OrderConfirmationComponent,
} from '../components/checkout/index'
import NotFound from '../components/shared/NotFound'

function CheckoutScreen() {
  const [searchParams] = useSearchParams()

  const stepQuery = searchParams.get('step')

  const step =
    stepQuery === 'shipping-address'
      ? 1
      : stepQuery === 'payment'
      ? 2
      : stepQuery === 'order-confirmation'
      ? 3
      : 0

  return (
    <div className='container mx-auto mt-[10px]'>
      <div className='w-full border border-solid border-[#ccc] rounded-[10px]'>
        <div
          className={`${
            step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
          } bg-red-500 h-[18px] text-[13px] rounded-[10px] text-center text-white font-bold`}
        >
          Bước {step}/3
        </div>
      </div>
      {step === 1 ? (
        <ShippingAddressComponent />
      ) : step === 2 ? (
        <PaymentComponent />
      ) : step === 3 ? (
        <OrderConfirmationComponent />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default CheckoutScreen
