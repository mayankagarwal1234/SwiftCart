import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getcartamount } = useContext(ShopContext);
  const subtotal = getcartamount();
  const shippingFee = subtotal > 3000 || subtotal === 0 ? 0 : delivery_fee;
  const total = subtotal + shippingFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART '} text2={' TOTAL'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {shippingFee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {total}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
