import logoWhite from "../../../public/holidaze_logo_white.svg";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary-dark bottom-0 mb-0 w-full px-4 py-8 sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-center gap-4 text-white">
          <img src={logoWhite} alt="Holidaze logo" className="w-25 sm:w-40" />
          <p className="text-xs sm:text-sm">Copyright © 2026 Holidaze</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
