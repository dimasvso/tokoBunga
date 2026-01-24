import { CardProduct } from "../ui/CardProduct";


function CardDis() {

const cardData = [
    {
        id: 1,
        title: "Buket Mawar Merah",
        description: "Buket mawar merah segar untuk momen spesial Anda.",
        price: 150000,
        imageUrl: "https://i.pinimg.com/1200x/72/33/1f/72331f84d926c2526eee73368ce3267b.jpg",
    },
    {
        id: 2,
        title: "Buket Mawar Merah",
        description: "Buket mawar merah segar untuk momen spesial Anda.",
        price: 150000,
        imageUrl: "https://i.pinimg.com/1200x/72/33/1f/72331f84d926c2526eee73368ce3267b.jpg ",
    },
    {
        id: 3,
        title: "Buket Mawar Merah",
        description: "Buket mawar merah segar untuk momen spesial Anda.",
        price: 150000,
        imageUrl: "https://i.pinimg.com/1200x/72/33/1f/72331f84d926c2526eee73368ce3267b.jpg",
    },
    {
        id: 4,
        title: "Buket Mawar Merah",
        description: "Buket mawar merah segar untuk momen spesial Anda.",
        price: 150000,
        imageUrl: "https://i.pinimg.com/1200x/72/33/1f/72331f84d926c2526eee73368ce3267b.jpg",
    },
    {
        id: 5,
        title: "Buket Mawar Merah",
        description: "Buket mawar merah segar untuk momen spesial Anda.",
        price: 150000,
        imageUrl: "https://i.pinimg.com/1200x/72/33/1f/72331f84d926c2526eee73368ce3267b.jpg",
    },
]


    return ( 
        <div className="card text-white bg-danger mb-3 px-10 py-5" >
            <div className="grid grid-cols-4 gap-10 px-10 py-5" >
                {cardData.map((card) => (
                    <CardProduct 
                        key={card.id}
                        title={card.title}
                        description={card.description}
                        price={card.price}
                        imageUrl={card.imageUrl}
                        to={"#"}
                    />
                ))}
            </div>
        </div>
     );
}

export default CardDis;