import { useState } from "react";

export default function QuantityStepper({ 
  initial = 1, 
  min = 1, 
  max = 99, 
  onChange 
}) {
  const [qty, setQty] = useState(initial);

  const handle = (delta) => {
    const newVal = Math.min(Math.max(qty + delta, min), max);
    setQty(newVal);
    onChange?.(newVal);
  };

  return (
    <div className="inline-flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1">
      <button
        type="button"
        onClick={() => handle(-1)}
        className="text-gray-600 hover:text-rose-500"
      >
        -
      </button>

      <span className="font-semibold w-6 text-center">{qty}</span>

      <button
        type="button"
        onClick={() => handle(1)}
        className="text-gray-600 hover:text-rose-500"
      >
        +
      </button>
    </div>
  );
}