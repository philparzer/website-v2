/* 
WHAT:
renders multiplayer cursor used in MultiplayerScene.tsx
*/

type Props = {
  color: string;
  x: number;
  y: number;
  message?: string;
  username: string
};


export default function Cursor({ color, x, y, message, username }: Props) {
  return (
    <div
      className="absolute pointer-events-none top-0 left-0 z-50" 
      style={{
        transition: "transform 120ms linear",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      {message && (
        <div
          className="absolute top-7 left-2 px-4 rounded-3xl"
          style={{ backgroundColor: color, borderRadius: 20 }}
        >
          
          <div className="leading-relaxed text-white whitespace-nowrap text-sm">
            <div className="pt-2 text-xs opacity-50">{username}</div>
            <p className="pb-2">{message}</p>
          </div>
        </div>
        
      )}
    </div>
  );
}
