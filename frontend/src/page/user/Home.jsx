import Button from "../../components/ui/Button";
import Header from "../../components/layout/Header";
import CardDis from "../../components/layout/CardDis";
// import { getProducts } from "../../api/product";
import { useState } from "react";
import Userlayout from "../../components/layout/UserLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
export default function Homepage() {
  const { products} = useProducts(); 
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
    <Userlayout>
      <div className="min-h-screen bg-linear-to-br from-rose-50 to-green-50">
        <section className="relative overflow-hidden bg-linear-to-br from-rose-light via-background to-sage-light px-10">
          <div className="container mx-auto px-4 py-5 lg:py-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6 animate-fade-in">
                <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase">
                  Fresh & Beautiful
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight">
                  Flowers That
                  <span className="block text-primary">Speak Love</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Discover our exquisite collection of handcrafted floral
                  arrangements, designed to bring joy and beauty to every moment
                  of your life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#product">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                    >
                      <a href="https://www.instagram.com/dimasvso/" target="_blank">Custom Order</a>
                    </Button>
                  </a>
                </div>
              </div>

              <div
                className="relative animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="relative aspect-3/5 lg:aspect-square">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-[3rem] rotate-3" />
                  <img
                    src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80"
                    alt="Beautiful floral arrangement with roses and peonies"
                    className="absolute inset-0 w-full h-full object-cover rounded-[3rem] "
                  />

                  <motion.div
                    className="absolute -left-4 top-1/4 bg-[#fefefe] shadow-xl rounded-2xl p-4 animate-float"
                    animate={{ y: 10 }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i class="ri-flower-line text-xl"></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Fresh Daily
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Farm to door
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -right-4 bottom-1/4 bg-[#fefefe] shadow-xl rounded-2xl p-4 animate-float"
                    animate={{ y: -5 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center">
                        <i class="ri-truck-line text-xl"></i>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Free Delivery
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Orders $50+
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-sage/10 rounded-full blur-3xl" />
        </section>

        <section className="h-5 bg-[#d9d9d9] my-10" />
        <section id="product">
          <Button variant="primary" className="ml-20" ><Link to="/allproducts">All Products</Link></Button>
          <CardDis cardData={currentProducts} />


          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
              >
                ←
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={page === currentPage ? "primary" : "outline"}
                    
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
              >
                →
              </Button>
            </div>
          )}
        </section>
      </div>
    </Userlayout>
  );
}
