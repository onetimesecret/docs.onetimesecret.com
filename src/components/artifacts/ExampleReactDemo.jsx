// src/components/artifacts/ExampleReactDemo.jsx

import { useState } from "react";

/**
 * Example React component demonstrating Astro Islands integration
 * This component can be embedded in any Astro page or Markdoc file
 */
export default function ExampleReactDemo() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: "2rem",
        border: "2px solid #3b82f6",
        borderRadius: "0.5rem",
        backgroundColor: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>React Demo Component</h3>
      <p>This is a React component running in an Astro Island.</p>
      <p>
        Counter: <strong>{count}</strong>
      </p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Increment
      </button>
    </div>
  );
}
