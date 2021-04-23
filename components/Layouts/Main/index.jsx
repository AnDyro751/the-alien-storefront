import MainHeader from "../../Headers/Main";
import PropTypes from "prop-types";
function MainLayout({ children, transparentHeader }) {
  return (
    <div className="w-full">
      <MainHeader transparent={transparentHeader} />
      {children}
    </div>
  );
}

export default MainLayout;

MainLayout.propTypes = {
  transparentHeader: PropTypes.bool.isRequired,
};

MainLayout.defaultProps = {
  transparentHeader: false,
};
