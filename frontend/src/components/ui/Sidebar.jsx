function Sidebar({ to, title }) {
  const menuItems = [
    { name: "Dashboard", active: true },
    { name: "Pesanan" },
    { name: "Produk" },
    { name: "Kategori" },
    { name: "Pelanggan" },
    { name: "Laporan" },
    { name: "Pengaturan" },
  ];

  return (
    <>
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
        <div className="p-6 flex items-center gap-3 border-b">
          <FlowerIcon className="w-8 h-8 text-rose-500" />
          <span className="text-xl font-bold text-gray-800">BungaKu Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? "bg-rose-500 text-white"
                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-500"
              }`}
            >
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-rose-500 transition">
            <span>🚪</span>
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
