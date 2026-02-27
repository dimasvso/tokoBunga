import ImageLoader from "./ImageLoader";

function ProductsAdmin({
  images = [],
  alt,
  title,
  price,
  description,
  ButtonEdit,
  ButtonDelete,
}) {
  return (
    <section className="bg-rose-400 p-5 rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-2 mb-2">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <ImageLoader
                key={idx}
                src={img.image || img}
                alt={alt || title}
                className="rounded-2xl h-24 w-24 object-cover"
              />
            ))
          ) : (
            <ImageLoader
              src="/no-image.png"
              alt={alt || title}
              className="rounded-2xl h-24 w-24 object-cover"
            />
          )}
        </div>
        <h1 className="text-center text-xl mt-2">{title}</h1>
        <h1 className="text-center text-2xl">{price}</h1>
        <p className="text-center">{description}</p>
        <div className="flex flex-row gap-3 mt-3">
          {ButtonEdit}
          {ButtonDelete}
        </div>
      </div>
    </section>
  );
}

export default ProductsAdmin;
