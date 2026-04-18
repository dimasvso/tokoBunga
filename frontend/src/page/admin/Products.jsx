import AdminLayout from "../../components/layout/AdminLayout";
import CrudModal from "../../components/ui/CrudModal";
import Button from "../../components/ui/Button";
import CardProductsAdmin from "../../components/ui/CardProductAdmin";
import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";

function Products() {
  const { products, loading, error, addProduct, editProduct, removeProduct } =
    useProducts();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const productFields = [
    {
      name: "name",
      label: "Nama Produk",
      type: "text",
      required: true,
      placeholder: "Contoh: Buket Bunga Ulang Tahun",
    },
    {
      name: "price",
      label: "Harga",
      type: "number",
      required: true,
      placeholder: "280000",
    },
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

  const buildFormData = (data) => {
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });
      return formData;
    }
    return data;
  };

  const handleSubmit = async (data, mode) => {
    setSubmitError("");
    const payload = buildFormData(data);
    try {
      if (mode === "create") {
        await addProduct(payload); // ← dari context
      } else if (mode === "edit" && selectedProduct?.id) {
        await editProduct(selectedProduct.id, payload); // ← dari context
      }
      setModalOpen(false);
    } catch {
      setSubmitError("Gagal menyimpan produk.");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Hapus produk ${product.name}?`)) return;
    try {
      await removeProduct(product.id); // ← dari context
    } catch {
      setSubmitError("Gagal menghapus produk.");
    }
  };

  const openCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setSelectedProduct({
      id: product.id,
      name: product.title, 
      price: product.price,
      description: product.description,
      images: product.images,
    });
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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
        {loading && <p className="text-gray-400 text-sm">Memuat produk...</p>}

        <div className="grid grid-cols-5 gap-5">
          {products.map((product) => (
            <CardProductsAdmin
              key={product.id}
              id={product.id}
              images={product.images || []}
              title={product.name}
              price={product.price?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
              description={product.description}
              ButtonEdit={openEdit}
              ButtonDelete={handleDelete}
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
