// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Bagde";
import FlowerIcon from "../../components/ui/FlowerIcon";
import QuantityStepper from "../../components/ui/QuantityStepper";
import UserLayout from "../../components/layout/UserLayout";
import { getProductById } from "../../api/product";

export default function DetailProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  const currentVariant = product.variants?.find(
    (v) => v.id === selectedVariant,
  );

  return (
    <UserLayout>
      <div className="pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-sm w-full max-w-md">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images?.[selectedImage]?.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

            

                {product.discount > 0 && (
                  <Badge className="absolute top-3 left-3 bg-rose-500 text-white">
                    -{product.discount}%
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx
                        ? "border-rose-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h1>

              {currentVariant && (
                <div className="mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-rose-500">
                      {formatPrice(currentVariant.price)}
                    </span>

                    {product.original_price > currentVariant.price && (
                      <span className="text-gray-400 line-through text-sm">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {currentVariant && (
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-sm text-gray-600">Jumlah:</span>

                  <QuantityStepper
                    initial={1}
                    min={1}
                    max={currentVariant.stock}
                    onChange={setQuantity}
                  />

                  <span className="text-sm text-gray-400">
                    Stok: {currentVariant.stock}
                  </span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick>
                  Keranjang
                </Button>

                <Button className="flex-1 bg-rose-500 hover:bg-rose-600">
                  Beli Sekarang
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Deskripsi Produk</h3>
              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
