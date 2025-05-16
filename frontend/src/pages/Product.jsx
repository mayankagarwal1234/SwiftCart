import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addtocart} = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setsize] = useState("");

  useEffect(() => {
    const matchedProduct = products.find((item) => item._id === productId);
    if (matchedProduct) {
      setProductData(matchedProduct);
      setImage(matchedProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                src={img}
                key={index}
                onClick={() => setImage(img)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border ${
                  image === img ? "border-black" : "border-transparent"
                }`}
                alt={`thumbnail-${index}`}
              />
            ))}
          </div>

          {/* Main image display */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="Selected product"
              className="w-full h-auto "
            />
          </div>
        </div>
        {/* produts info */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(107)</p>
          </div>
          <p className="mt-2 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-6 ">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addtocart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-4 sm:w-4/5"></hr>
          <div className="text-sm text-gray-500 mt-3 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and Exchange Policy within 10 Days.</p>
          </div>
        </div>
      </div>
      {/* DESCRIPTION AND REVIEW SYSTEM */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (107)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            SwiftCart is a modern e-commerce platform offering a seamless
            shopping experience. It features intuitive navigation, dynamic
            product filtering, and secure checkout. With responsive design and
            real-time updates, SwiftCart enhances both user convenience and
            performance. Ideal for businesses aiming to grow their digital
            presence.
          </p>
          <p>
            SwiftCart empowers retailers with customizable storefronts and
            smooth inventory management. Built with scalability in mind, it
            supports high-traffic performance and mobile-first experiences.
            Smart filters, quick previews, and personalized recommendations
            boost user engagement. It integrates easily with payment gateways
            and shipping APIs for effortless operations. Whether you're a
            startup or an established brand, SwiftCart scales to fit your
            growth.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0">Loading product...</div>
  );
};

export default Product;
