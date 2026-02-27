import Button from "./Button";
import { Link } from "react-router-dom";
import Badge from "./Bagde";

export const CardProduct = ({
  imageUrl,
  title,
  price,
  badge,
  description,
  to,
}) => (
  <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
    <div className="relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover object-center group-hover:scale-105 transition duration-500"
      />
      {badge && (
        <span className="absolute top-3 left-3">
          <Badge>{badge}</Badge>
        </span>
      )}
    </div>

    <div className="p-4">
      <h3 className="font-bold text-gray-800 truncate">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-extrabold text-rose-500">{price}</span>
        <Button size="sm" >
          <Link to={to}>Details</Link>
        </Button>
      </div>
    </div>
  </div>
);