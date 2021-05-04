import PropTypes from "prop-types";
import Link from "next/link";
import classnames from "classnames";

const ComponentButton = ({
  text,
  href,
  className,
  color,
  handleClick,
  loading,
  type = "button",
}) => {
  const classButton = classnames({
    "relative px-8 font-medium focus:outline-none py-3 shadow-sm transition duration-75 rounded-md": true,
    [`${className}`]: true,
    "main-shadow": color === "secondary" && !loading,
    "bg-secondary": color === "secondary",
    "bg-black text-white hover:bg-gray-800": color !== "secondary",
    "bg-opacity-50 cursor-not-allowed": loading,
  });
  if (href) {
    return (
      <Link href={href}>
        <a className={classButton}>{text}</a>
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        disabled={loading}
        onClick={handleClick}
        className={classButton}
      >
        {text}
      </button>
    );
  }
};

ComponentButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(["secondary", "primary"]),
  loading: PropTypes.bool.isRequired,
};
ComponentButton.defaultProps = {
  text: "",
  href: null,
  className: null,
  color: "secondary",
  loading: false,
};

export default ComponentButton;
