// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// Example:
//  cn("px-2 bg-blue-500", isActive && "bg-red-500", className)
//
