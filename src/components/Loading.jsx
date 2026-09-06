
function Loading({
  text = "Loading...",
  fullScreen = true,
  speed = "normal",
  color = "black",
  dotSize = 1,
  spread = 24,
}) {
  const DURATIONS = { slow: "1.8s", normal: "1.1s", fast: "0.6s" };
  const duration = DURATIONS[speed] ?? DURATIONS.normal;

  const angles = [0, 45, 90, 135, 180, 225, 270]; // 7 dots; the div itself is the 8th, at 0deg
  const shadow = angles
    .map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x = (Math.cos(rad) * spread).toFixed(3);
      const y = (Math.sin(rad) * spread).toFixed(3);
      return `${x}px ${y}px 0 ${i + 1}px ${color}`;
    })
    .join(", ");

  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? "flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6"
          : "flex flex-col items-center justify-center gap-6 py-10"
      }
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: spread * 2 + dotSize, height: spread * 2 + dotSize }}
      >
        <div
          className="loading-step-dot rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            background: color,
            boxShadow: shadow,
            animationDuration: duration,
          }}
        />
        <style>{`
          .loading-step-dot {
            animation-name: loading-step-rotate;
            animation-timing-function: steps(8);
            animation-iteration-count: infinite;
          }
          @keyframes loading-step-rotate {
            100% { transform: rotate(1turn); }
          }
          @media (prefers-reduced-motion: reduce) {
            .loading-step-dot { animation: none; }
          }
        `}</style>
      </div>

      <span className="text-lg font-semibold tracking-wide text-gray-600 dark:text-gray-800">
        {text}
      </span>
    </div>
  );
}

export default Loading;
