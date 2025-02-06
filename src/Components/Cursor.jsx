import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(null);
  
  const targetPos = useRef({ x: 0, y: 0 }); // Mouse position
  const currentPos = useRef({ x: 0, y: 0 }); // Cursor position

  useEffect(() => {
    const updateMousePos = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor; // Smooth interpolation

    const moveCursor = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.1);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.1);

      if (cursorRef.current) {
        cursorRef.current.style.left = `0px`; // Explicitly set left
        cursorRef.current.style.top = `0px`; // Explicitly set top
        cursorRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
      }

      requestRef.current = requestAnimationFrame(moveCursor);
    };

    moveCursor();
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return <div ref={cursorRef} className="cursor z-50 " />;
};

export default Cursor;
