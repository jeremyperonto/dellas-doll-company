import { useState, useEffect, useRef } from "react";

export default function CostBadge({ cost }) {
  const [pop, setPop] = useState(false);
  const prev = useRef(cost);
  useEffect(() => {
    if (cost !== prev.current) {
      prev.current = cost;
      setPop(true);
      const t = setTimeout(() => setPop(false), 340);
      return () => clearTimeout(t);
    }
  }, [cost]);
  return (
    <div className={`cost-badge${pop ? " pop" : ""}`}>
      💰 ${cost.toFixed(2)} / doll
    </div>
  );
}
