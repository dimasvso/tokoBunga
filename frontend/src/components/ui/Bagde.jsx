 const Badge = ({ children, className }) => (
  <span
    className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 ${className}`}
  >
    {children}
  </span>
);

export default Badge;