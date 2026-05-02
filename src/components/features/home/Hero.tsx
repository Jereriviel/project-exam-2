const Hero = () => {
  return (
    <div className="bg-secondary-light flex w-full flex-col gap-4 px-4 py-8 sm:items-center sm:gap-8 sm:px-8 sm:text-center">
      <h1 className="font-display text-4xl font-bold sm:text-6xl">
        <span className="text-primary"> Where </span>do you wish to{" "}
        <span className="text-primary">stay</span>?
      </h1>
      <p className="text-lg font-light md:text-2xl">
        Find your new favourite holiday accommodation here
      </p>
    </div>
  );
};

export default Hero;
