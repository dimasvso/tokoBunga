import CardDis from "../../components/layout/CardDis";
import Userlayout from "../../components/layout/UserLayout";
import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

function AllProducts() {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Userlayout>
        <div className="relative min-h-screen bg-linear-to-br from-rose-50 to-green-50 rounded-3xl ">
          <div className="container mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-lg mb-8">
              Explore our wide range of beautiful flowers and arrangements.
            </p>
            <Button>
                <Link to="/">Back to Home</Link>
            </Button>
          </div>

          <section>
            <CardDis cardData={currentProducts} />

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ←
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition
                    ${
                      currentPage === page
                        ? "bg-rose-500 text-white shadow"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  →
                </button>
              </div>
            )}
          </section>
        </div>
      </Userlayout>
    </>
  );
}

export default AllProducts;
