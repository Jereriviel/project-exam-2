const Hero = () => {
  return (
    <>
      <section className="bg-secondary-light relative w-full overflow-hidden">
        <div className="flex w-full flex-col items-center gap-4 px-4 pt-8 pb-12 text-center sm:px-8 sm:pb-16 md:gap-8 md:pb-20">
          <h1 className="font-display text-4xl font-bold md:text-6xl">
            <span className="text-primary"> Where </span>do you wish to
            <span className="text-primary"> stay</span>?
          </h1>
          <p className="text-lg font-light md:text-2xl">
            Find your new favourite holiday accommodation here
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full leading-0">
          <svg
            viewBox="0 0 1440 40"
            className="relative block h-auto w-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,0 C480,40 960,40 1440,0 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
