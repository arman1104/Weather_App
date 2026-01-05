import Logo from "../assets/images/logo.svg";
import unitIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

const Header = () => {
  return (
    <nav className="w-full py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Weather logo" className="" />
        </div>

        {/* Right: Units Button */}
        <button
          className="
            flex items-center gap-2
            rounded-lg
            bg-white/15
            px-4 py-3
            text-sm font-medium text-gray-200
            backdrop-blur-md
            transition
            hover:bg-white/20
            focus:outline-none focus:ring-1 focus:ring-white
          "
        >
          <img src={unitIcon} alt="units" className="text-gray-200" />
          <span className="font-sans">Units</span>
          <img src={dropdownIcon} alt="dropdown" className="text-gray-200" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
