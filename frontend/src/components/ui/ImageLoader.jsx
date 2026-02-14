import { useState, useEffect } from "react";

export default function ImageLoader({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  if (error) {
    return (
      <div
        className={`${className} bg-gray-300 flex items-center justify-center`}
      >
        <span className="text-gray-500 text-sm">Image Error</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ease-in-out`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
