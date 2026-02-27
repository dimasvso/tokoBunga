import { CardProduct } from "../ui/CardProduct";

function CardDis({ cardData }) {
  return (
    <div className="card text-white bg-danger mb-3 px-10 py-5">
      <div className="grid grid-cols-4 gap-10 px-10 py-5">
        {cardData.map((card) => {
          let imageUrl = card.imageUrl || card.image;
          if (
            card.images &&
            Array.isArray(card.images) &&
            card.images.length > 0
          ) {
            imageUrl = card.images[0].image;
          }
          return (
            <CardProduct
              key={card.id}
              title={card.name}
              description={card.description}
              price={card.price}
              imageUrl={imageUrl}
              to={`/product/${card.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardDis;
