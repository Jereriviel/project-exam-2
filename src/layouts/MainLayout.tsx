import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/header";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex min-h-0 w-full grow flex-col items-center gap-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
