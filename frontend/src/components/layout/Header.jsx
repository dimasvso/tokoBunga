import FlowerIcon from "../ui/FlowerIcon";


function Header({ navigate, user }) {
  return (
    <>
      <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlowerIcon className="w-7 h-7 text-rose-500" />
            <span className="text-xl font-bold text-gray-800">BungaKu</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Halo, {user}</span>
           <a href={navigate}>
             <button className="text-sm text-rose-500 hover:underline" >
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
