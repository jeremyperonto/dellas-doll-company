import { playClick } from "../sound.js";

export default function OptionGrid({ list, val, set, three = false }) {
  return (
    <div className={three ? "ogrid3" : "ogrid"}>
      {list.map((o) => (
        <button
          key={o.id}
          className={`obtn${val?.id === o.id ? " on" : ""}`}
          onClick={() => {
            set(o);
            playClick();
          }}
        >
          <span className="oe">{o.emoji || o.flag}</span>
          {o.id}
          <span
            style={{
              display: "block",
              fontSize: ".7rem",
              color: val?.id === o.id ? "rgba(255,255,255,.5)" : "var(--mid)",
              marginTop: 2,
            }}
          >
            {o.desc}
          </span>
          <span className="oc">
            {o.mult
              ? `×${o.mult} materials`
              : o.labor != null
              ? `$${o.labor.toFixed(2)}/doll`
              : `+$${o.cost.toFixed(2)}/doll`}
          </span>
        </button>
      ))}
    </div>
  );
}
