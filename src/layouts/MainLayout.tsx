import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/header";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-0 w-full max-w-7xl grow flex-col items-center gap-8 sm:px-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
