import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  label?: string;
  href: string;
  icon: any;
  isActive?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
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
          `flex gap-x-3 w-full rounded-lg p-3 text-sm leading-6 font-semibold text-gray-500 hover:bg-gray-200 justify-center items-center`,
          isActive && "text-black bg-gray-200",
          label === "Logout" ? "hover:text-red-600" : "hover:text-teal-500"
        )}
      >
        <Icon
          className={clsx("w-6 h-6 shrink-0", isActive && "text-teal-500")}
        />
      </Link>
    </li>
  );
};

export default MobileItem;
