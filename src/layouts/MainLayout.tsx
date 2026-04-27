import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center justify-center gap-8 sm:px-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
