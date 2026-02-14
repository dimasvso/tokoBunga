import { Link } from "react-router-dom";

function AdminCard({title, to}) {
  return (
    <>
      <Link to={to}>
        <div class="bg-rose-300 h-20 w-30 rounded-lg m-4 flex items-center justify-center hover:bg-rose-400 cursor-pointer shadow-lg">
            <h3>{title}</h3>
        </div>
      </Link>
    </>
  );
}

export default AdminCard;
