import React, { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Spinner } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show();
      setProduct(response.data);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Destructuring product
  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_urls: imageUrls,
    image_url: imageUrl,
  } = product;

  // Calculating discount percentage
  const discountPercentage = (((mrp - offerPrice) / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <h1 className="py-2 text-4xl font-bold">{name}</h1>
        <hr className="border-3 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: ${mrp}</p>
          <p className="font-semibold">Offer price: ${offerPrice}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
