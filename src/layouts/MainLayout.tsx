import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center justify-center gap-8 sm:px-12">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
