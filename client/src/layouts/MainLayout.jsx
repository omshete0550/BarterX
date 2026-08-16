import Navbar from "../component/layout/Navbar";
import Footer from "../component/layout/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default MainLayout;
