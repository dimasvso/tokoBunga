import FlowerIcon from "../ui/FlowerIcon";
// import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Header({ navigate, user }) {
  // const { cart } = useCart();
  // const cartCount =
  //   cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  return (
    <>
      <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to = "/home" className="flex items-center gap-2">
            <FlowerIcon className="w-7 h-7 text-rose-500" />
            <span className="text-xl font-bold text-gray-800">BungaKu</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Halo, {user}</span>
            <a href="/cart" className="relative">
              <button className="text-sm text-rose-500 hover:underline">
                <i className="ri-shopping-cart-2-line text-2xl"></i>
                {/* {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )} */}
              </button>
            </a>
            <a href={navigate}>
              <button className="text-sm text-rose-500 hover:underline">
                <i className="ri-account-circle-line text-2xl"></i>
              </button>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
