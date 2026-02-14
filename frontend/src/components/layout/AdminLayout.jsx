import ImageLoader from "../ui/ImageLoader";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLayout({ children, title, subtitle, branch }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Cabut token
    localStorage.removeItem("token");

    // kalau lo simpan role / user
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    try {
      window.dispatchEvent(new CustomEvent("auth:logout"));
    } catch (e) {
      // ignore if CustomEvent unsupported
    }

    navigate("/login/admin");
  };

  const nav = [
    { id: 1, label: "Dashboard", link: "/admin/dashboard" },
    { id: 2, label: "Products", link: "/admin/products" },
    { id: 3, label: "Inventory", link: "/admin/inventory" },
    { id: 4, label: "Account", link: "/admin/account" },
    { id: 5, label: "Orders", link: "/admin/orders" },
  ];

  return (
    <section className="flex min-h-screen h-full">
      <div
        className={`
          bg-rose-300 text-white sm:h-auto flex flex-col gap-40 py-10
          z-120
          overflow-y-auto
          fixed h-full sm:relative
          transition-all duration-500 ease-in-out
          ${
            open
              ? "translate-x-0 w-80 opacity-100"
              : "-translate-x-full w-0 opacity-0"
          }
          xl:relative md:translate-x-0 sm:opacity-100
          sm:${open ? "basis-1/5" : "basis-0"}
        `}
      >
        <div className="flex flex-row justify-center items-center gap-10">
          <div
            onClick={() => setOpen(!open)}
            className={`bg-white rounded-full cursor-pointer p-2 ${
              open ? "p-2 block" : "p-0 hidden"
            }`}
          >
            <ImageLoader src={"https://i.pinimg.com/736x/61/be/7e/61be7e2d46066d6de8fab546714b69a2.jpg"} className={`${open ? "w-10" : "w-0"}`} />
          </div>

          {open && <h1 className="text-2xl">Admin Samsul</h1>}
        </div>

        {open && (
          <div className="flex justify-end">
            <div className="flex flex-col gap-5">
              {nav.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `text-2xl px-9 pr-15 rounded-l-full py-2 ${
                      isActive
                        ? "bg-white text-[#195D3B]"
                        : "bg-rose-700 text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className={`text-2xl text-left px-9 pr-15 rounded-l-full py-2 bg-red-400 hover:bg-white hover:text-red-600`}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <section
        className={`${
          open ? "basis-5/5 xl:basis-4/5" : "basis-5/5"
        } basis-4/5 px-5 md:px-20 py-15 w-full min-h-screen`}
      >
        <div className="mb-20 flex gap-10 items-start">
          <div
            onClick={() => setOpen(!open)}
            className={`bg-[#f3f3f3] rounded-full shadow-xl cursor-pointer p-2 ${
              open ? "p-0 hidden" : "p-2 block"
            }`}
          >
            <ImageLoader src={"https://i.pinimg.com/736x/61/be/7e/61be7e2d46066d6de8fab546714b69a2.jpg"} className={`${open ? "w-0" : "w-10"}`} />
          </div>
          <div className="flex flex-col justify-start gap-10 items-start w-full">
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-bold">
              {title}
              {branch}
            </h1>
            <h3 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-[#BD9D1D]">
              {subtitle}
            </h3>
          </div>
        </div>
        {children}
      </section>
    </section>
  );
}

export default AdminLayout;
