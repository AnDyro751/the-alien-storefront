import MainHeader from "../../Headers/Main";

function MainLayout({ children }) {
  return (
    <div className="w-full">
      <MainHeader />
      {children}
    </div>
  );
}

export default MainLayout;
