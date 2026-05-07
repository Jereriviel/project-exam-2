const VenuePageSkeleton = () => {
  return (
    <>
      <div className="grid-cols-[minmax(0, 1fr)] grid animate-pulse grid-rows-[max-content] rounded-xl">
        <div className="pb-4">
          <div className="bg-gray-light h-5 w-1/6 rounded-full"></div>
        </div>
        <div className="bg-gray-light aspect-2/1 h-full max-h-152 w-full rounded-xl"></div>
        <div className="mt-auto flex min-w-0 flex-col gap-6 py-6">
          <div className="mt-auto flex min-w-0 flex-col gap-4">
            <div className="bg-gray-light my-1 h-6 w-1/2 rounded-full sm:h-7 sm:w-1/3"></div>
            <div className="bg-gray-light sm: my-1 h-3 w-1/3 rounded-full sm:h-4 sm:w-1/4"></div>
            <div className="bg-gray-light my-1 h-3 w-1/4 rounded-full sm:w-1/8"></div>
            <div className="bg-gray-light my-1 h-5 w-1/5 rounded-full sm:h-6 sm:w-1/6"></div>
          </div>
          <div className="mt-auto flex min-w-0 flex-col gap-4">
            <div className="bg-gray-light my-1 h-5 w-1/6 rounded-full sm:h-6"></div>
            <div className="bg-gray-light my-1 h-4 rounded-full sm:h-5 sm:w-1/2"></div>
            <div className="bg-gray-light my-1 h-4 rounded-full sm:h-5 sm:w-1/2"></div>
            <div className="bg-gray-light my-1 h-4 rounded-full sm:h-5 sm:w-1/2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenuePageSkeleton;
