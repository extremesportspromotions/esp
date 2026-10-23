"use client";
import { useEffect } from "react";
/** Empties the shop bag after a completed checkout. */
export default function ClearBag() {
  useEffect(() => { try { localStorage.removeItem("esp-bag-v1"); } catch {} }, []);
  return null;
}
