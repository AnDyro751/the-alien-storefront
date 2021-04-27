import PropTypes from "prop-types";
import Link from "next/link";
const ComponentButton = ({ text, href }) => {
  if (href) {
    return (
      <div className="flex">
        <Link href={href}>
          <a className="bg-secondary relative px-8 font-medium py-3 shadow-sm transition duration-75 rounded-md main-shadow">{text}</a>
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

ComponentButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
ComponentButton.defaultProps = {
  text: "",
  href: null,
};

export default ComponentButton;
