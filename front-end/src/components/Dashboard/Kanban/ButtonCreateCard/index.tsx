interface ButtonCreateCardProps {
  color: string;
  useToggle: [boolean, (nextValue?: any) => void];
}

export function ButtonCreateCard({ color, useToggle }: ButtonCreateCardProps) {
  const [isOn, toggle] = useToggle;
  const backgroundOpacity = 0.3;
  const background = `${color}${Math.floor(backgroundOpacity * 255).toString(
    16
  )}`;

  return (
    <div
      onClick={() => toggle(!isOn)}
      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md text-lg font-medium hover:scale-110"
      style={{ backgroundColor: background, color }}
    >
      +
    </div>
  );
}
