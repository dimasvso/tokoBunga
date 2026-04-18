import FlowerIcon from "../ui/FlowerIcon";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartModal from "../ui/CartModal";
import Button from "../ui/Button";

function Header({ navigate, user }) {
  const { totalItems,removeItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <FlowerIcon className="w-7 h-7 text-rose-500" />
            <span className="text-xl font-bold text-gray-800">BungaKu</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Halo, {user}</span>

            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-rose-500"
            >
              <i class="ri-shopping-cart-line text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <a href={navigate}>
              <Button variant="ghost">
                <i className="ri-account-circle-line text-2xl"></i>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default Header;