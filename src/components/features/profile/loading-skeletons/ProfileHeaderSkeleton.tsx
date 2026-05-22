const ProfileHeaderSkeleton = () => {
  return (
    <div className="bg-secondary-light relative flex w-full animate-pulse justify-center overflow-hidden px-4 lg:px-8">
      <div className="flex w-full max-w-7xl flex-col gap-2 pt-8 pb-12 md:pb-16 lg:gap-8 lg:pb-20">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-12">
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:w-fit lg:justify-start">
            <div className="bg-gray-light h-10 w-2/3 rounded-full lg:h-12 lg:w-100"></div>
            <div className="bg-gray-light size-36 rounded-full lg:size-40"></div>
          </div>

          <div className="flex w-full min-w-0 flex-col lg:gap-8 lg:self-end lg:text-lg">
            <div className="grid lg:grid-cols-3 lg:gap-8">
              <div className="w-full">
                <div className="bg-gray-light my-2 h-4 w-1/4 rounded-full lg:h-4.5 lg:w-1/4"></div>
                <div className="bg-gray-light my-2 h-4 w-1/2 rounded-full lg:h-4.5 lg:w-3/5"></div>
              </div>
              <div className="w-full">
                <div className="bg-gray-light my-2 h-4 w-1/4 rounded-full lg:h-4.5 lg:w-1/3"></div>
                <div className="bg-gray-light my-2 h-4 w-1/2 rounded-full lg:h-4.5 lg:w-4/5"></div>
              </div>
              <div>
                <div className="bg-gray-light my-2 h-4 w-1/4 rounded-full lg:h-4.5 lg:w-1/2"></div>
                <div className="bg-gray-light my-2 h-6 w-13 rounded-full lg:h-6"></div>
              </div>
            </div>

            <div className="grid gap-2 lg:grid-cols-2">
              <div>
                <div className="bg-gray-light my-2 h-4 w-1/4 rounded-full lg:h-4.5 lg:w-1/4"></div>
                <div className="bg-gray-light my-2 h-4 w-1/2 rounded-full lg:h-4.5 lg:w-full"></div>
              </div>
              <div className="bg-gray-light my-2 size-8 rounded-full"></div>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
