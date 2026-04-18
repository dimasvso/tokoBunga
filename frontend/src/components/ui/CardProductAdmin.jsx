import ImageLoader from "./ImageLoader";
import Button from "./Button";
import { useState } from "react";

function ProductsAdmin({
  id,
  images = [],
  alt,
  title,
  price,
  description,
  ButtonEdit,
  ButtonDelete,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const hasImages = images.length > 0;
  const totalImages = images.length;
  const showSwipeButtons = totalImages > 5;

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 group">
      <div className="flex flex-col items-center">
        {/* Images Gallery */}
        <div className="relative w-full mb-4">
          {hasImages ? (
            <>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                <ImageLoader
                  src={images[currentImage]?.image || images[currentImage]}
                  alt={alt || title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {currentImage + 1} / {totalImages}
                </div>

                {showSwipeButtons && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 transition opacity-0 group-hover:opacity-100"
                    >
                      <i class="ri-arrow-right-double-line text-3xl text-red-500"></i>
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 transition opacity-0 group-hover:opacity-100"
                    >
                      <i class="ri-arrow-left-double-fill"></i>
                    </button>
                  </>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              <div className="relative">
                <div className="flex gap-2 justify-center overflow-x-auto pb-1 px-1 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`relative flex-shrink-0 rounded-md overflow-hidden w-12 h-12 border-2 transition cursor-pointer ${
                        currentImage === idx
                          ? "border-rose-500 ring-2 ring-rose-200"
                          : "border-gray-200 hover:border-rose-300"
                      }`}
                    >
                      <ImageLoader
                        src={img.image || img}
                        alt={`${alt || title} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {totalImages > 5 && (
                  <div className="text-center mt-1">
                    <span className="text-xs text-gray-400">
                      ← geser untuk lihat semua →
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 flex flex-col items-center justify-center border-2 border-dashed border-rose-200">
              <svg
                className="w-16 h-16 text-rose-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-rose-400 text-sm font-medium">
                No Image
              </span>
            </div>
          )}
        </div>

        <h3 className="text-center font-semibold text-gray-800 text-base mb-1 line-clamp-2 px-1">
          {title}
        </h3>
        <p className="text-center text-rose-500 font-bold text-lg mb-2">
          {price}
        </p>
        <p className="text-center text-gray-500 text-sm line-clamp-2 mb-4 px-2">
          {description}
        </p>

        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
            onClick={() =>
              ButtonEdit({ id, title, price, description, images })
            }
          >
            Edit
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-200 text-red-500 hover:bg-red-50"
            onClick={() => ButtonDelete({ id, title, price })}
          >
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductsAdmin;
