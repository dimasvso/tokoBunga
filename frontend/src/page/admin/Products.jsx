import AdminLayout from "../../components/layout/AdminLayout";
import CrudModal from "../../components/ui/CrudModal";
import Button from "../../components/ui/Button";
import CardProductsAdmin from "../../components/ui/CardProductAdmin";
import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/product";

function Products() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productFields = [
    {
      name: "name",
      label: "Nama Produk",
      type: "text",
      required: true,
      placeholder: "Contoh: Buket Bunga Ulang Tahun",
    },
    // {
    //   name: "category",
    //   label: "Kategori",
    //   type: "select",
    //   required: true,
    //   options: [
    //     { value: "buket", label: "Buket Bunga" },
    //     { value: "tangkai", label: "Bunga Per Tangkai" },
    //     { value: "papan", label: "Papan Ucapan" },
    //   ],
    // },
    {
      name: "price",
      label: "Harga",
      type: "number",
      required: true,
      placeholder: "280000",
    },
    // {
    //   name: "stock",
    //   label: "Stok",
    //   type: "number",
    //   default: 0,
    // },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      rows: 3,
      placeholder: "Deskripsi produk...",
    },
    {
      name: "images",
      label: "Images",
      type: "file",
      multiple: true,
    },
  ];

  const handleSubmit = async (data, mode) => {
    try {
      setError("");
      let formData = null;
      // Cek jika ada field images (array file)
      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "images" && Array.isArray(value)) {
            value.forEach((file) => formData.append("images", file));
          } else {
            formData.append(key, value);
          }
        });
      }
      if (mode === "create") {
        await createProduct(formData || data);
      } else if (mode === "edit" && selectedProduct && selectedProduct.id) {
        await updateProduct(selectedProduct.id, formData || data);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      setError("Gagal menyimpan produk");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Hapus produk ${product.name}?`)) return;
    try {
      setError("");
      await deleteProduct(product.id);
      fetchProducts();
    } catch (err) {
      setError("Gagal menghapus produk");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      console.log("Data produk:", data);
      setProducts(data);
    } catch {
      setError("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const openView = (product) => {
    setModalMode("view");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <AdminLayout title="Products">
      <div className="flex flex-col justify-center items-center px-10 gap-5 w-full">
        <div className="flex justify-end w-full">
          <Button onClick={openCreate}>Add +</Button>
        </div>
        {/* {error && <div className="text-red-600">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full bg-rose-600 text-white rounded-lg overflow-hidden">
            <thead className="border border-white">
              <tr>
                <th className="text-2xl text-center py-2">Name</th>
                <th className="text-2xl text-center py-2">Price</th>
                <th className="text-2xl text-center py-2">Description</th>
                <th className="text-2xl text-center py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-rose-400">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-3 text-center">{product.name}</td>
                  <td className="py-3 text-center">
                    Rp {product.price?.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 text-center">{product.description}</td>
                  <td className="py-3 text-center space-x-2">
                    <Button size="sm" onClick={() => openEdit(product)}>
                      <i className="ri-pencil-line"></i>
                    </Button>
                    <Button size="sm" onClick={() => handleDelete(product)}>
                      <i className="ri-delete-bin-line"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}

        <div className="grid grid-cols-5 gap-5">
          {products.map((product) => (
            <CardProductsAdmin
              key={product.id}
              images={product.images || []}
              title={product.name}
              price={product.price?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
              description={product.description}
              ButtonEdit={
                <Button size="sm" onClick={() => openEdit(product)}>
                  <i className="ri-pencil-line"></i>
                </Button>
              }
              ButtonDelete={
                <Button size="sm" onClick={() => handleDelete(product)}>
                  <i className="ri-delete-bin-line"></i>
                </Button>
              }
            />
          ))}
        </div>
      </div>

      <CrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Produk"
        fields={productFields}
        initialData={selectedProduct || {}}
        onSubmit={handleSubmit}
        mode={modalMode}
      />
    </AdminLayout>
  );
}

export default Products;
