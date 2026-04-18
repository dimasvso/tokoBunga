import { useEffect } from "react";
import { useOrders } from "../../context/OrderContext";
import UserLayout from "../../components/layout/UserLayout";

const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function Orders() {
  const { orders, loading, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Pesanan</h1>

        {loading && <p className="text-gray-400 text-center">Memuat pesanan...</p>}

        {!loading && orders.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-5xl mb-4">🌸</p>
            <p>Belum ada pesanan</p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-5">
              {/* Header order */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-gray-800">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product_name} × {item.quantity}
                    </span>
                    <span className="text-gray-800 font-medium">
                      Rp {Number(item.subtotal).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-rose-500">
                  Rp {Number(order.total_price).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}