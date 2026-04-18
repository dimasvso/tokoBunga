import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";


export default function CartModal({ isOpen, onClose }) {
  const { cart, loading, updateItem, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            {" "}
            <i class="ri-shopping-cart-line text-xl"></i> Keranjang
          </h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            <i class="ri-close-line"></i>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading && <p className="text-center text-gray-400">Loading...</p>}

          {!loading && cart?.items?.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4"><i class="ri-flower-fill"></i></p>
              <p>Keranjang masih kosong</p>
            </div>
          )}

          {cart?.items?.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          ))}
        </div>

        {cart?.items?.length > 0 && (
          <div className="border-t p-5 space-y-3">
            <div className="flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-rose-500">
                Rp {Number(cart.total_price).toLocaleString("id-ID")}
              </span>
            </div>
            <Link to="/checkout">
              <Button>Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({ item, onUpdate, onRemove }) {
  const [loading, setLoading] = useState(false);

  const handleQuantity = async (newQty) => {
    if (newQty < 1) return;
    setLoading(true);
    try {
      await onUpdate(item.id, newQty);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await onRemove(item.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm">
          {item.product.name}
        </p>
        <p className="text-rose-500 text-sm font-bold">
          Rp {Number(item.product.price).toLocaleString("id-ID")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantity(item.quantity - 1)}
          disabled={loading}
          className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          −
        </button>
        <span className="text-sm font-semibold w-5 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantity(item.quantity + 1)}
          disabled={loading}
          className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-500">
          Rp {Number(item.subtotal).toLocaleString("id-ID")}
        </p>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-xs text-red-400 hover:text-red-600 mt-1"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
