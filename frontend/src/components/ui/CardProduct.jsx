import Button from "./Button";
import { Link } from "react-router-dom";
import Badge from "./Bagde";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const CardProduct = ({
  id, // ← tambah prop id
  imageUrl,
  title,
  price,
  badge,
  description,
  to,
}) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Login dulu ya!");
      return;
    }
    setAdding(true);
    setErrorMsg(""); // reset error sebelumnya
    try {
      await addItem(id, 1);
    } catch (error) {
      setErrorMsg(error.message); // ← tangkap pesan dari provider
    } finally {
      setAdding(false);
    }
  };

  return (
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
          <div className="flex gap-2">
            {/* Tombol Add to Cart */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "..." : <i class="ri-shopping-cart-line"></i>}
            </Button>
            {/* Tombol Detail */}
            <Button size="sm">
              <Link to={to}>Details</Link>
            </Button>
          </div>
        </div>
        {errorMsg && <p className="text-xs text-red-500 mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
};
