import logoWhite from "../../assets/holidaze_logo_white.png";

const Footer = () => {
  return (
    <>
      <div className="-mb-px w-full leading-0">
        <svg
          viewBox="0 0 1440 40"
          className="relative block h-auto w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#963211"
            d="M0,0 C480,40 960,40 1440,0 L1440,40 L0,40 Z"
          />
        </svg>
      </div>
      <footer className="bg-primary-dark bottom-0 mb-0 w-full px-4 pt-4 pb-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-center gap-4 text-white">
          <img
            src={logoWhite}
            alt="Holidaze logo"
            className="w-25 object-cover sm:w-40"
          />
          <p className="text-xs sm:text-sm">Copyright © 2026 Holidaze</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
