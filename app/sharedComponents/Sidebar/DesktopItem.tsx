import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  isActive?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-200 justify-center items-center`,
          isActive && "text-black bg-gray-200"
        )}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
