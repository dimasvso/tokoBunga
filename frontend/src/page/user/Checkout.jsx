import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import { useCart } from "../../context/CartContext";
import UserLayout from "../../components/layout/UserLayout";
import Button from "../../components/ui/Button";

export default function Checkout() {
  const { checkout, loading, error } = useOrders();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    if (!shippingAddress.trim()) {
      setSubmitError("Alamat pengiriman wajib diisi.");
      return;
    }
    setSubmitError("");
    try {
      await checkout(shippingAddress, note);
      navigate("/orders"); 
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3">
            {cart?.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-semibold text-gray-800">
                  Rp {Number(item.subtotal).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-rose-500">
              Rp {Number(cart?.total_price || 0).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          <h2 className="font-semibold text-gray-700">Detail Pengiriman</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat Pengiriman <span className="text-red-500">*</span>
            </label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows={3}
              placeholder="Masukkan alamat lengkap..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan (opsional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Contoh: Tolong dibungkus rapi..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </div>

          {(submitError || error) && (
            <p className="text-red-500 text-sm">{submitError || error}</p>
          )}

          <Button
            onClick={handleSubmit}
            disabled={loading || !cart?.items?.length}
            variant="primary"
              >
            {loading ? "Memproses..." : "Buat Pesanan"}
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}