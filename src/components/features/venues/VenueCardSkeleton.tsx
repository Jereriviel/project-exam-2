const VenueCardSkeleton = () => {
  return (
    <>
      <div className="grid-cols-[minmax(0, 1fr)] grid animate-pulse grid-rows-[max-content] rounded-xl">
        <div className="bg-gray-light aspect-4/3 h-full max-h-147.5 w-full rounded-xl sm:max-h-107 md:max-h-89.5 xl:max-h-50.5"></div>
        <div className="mt-auto flex min-w-0 flex-col gap-2 py-4">
          <div className="bg-gray-light h-6 w-2/3 rounded-full"></div>
          <div className="bg-gray-light h-4.5 w-1/3 rounded-full"></div>
          <div className="bg-gray-light h-4.5 w-1/3 rounded-full"></div>
          <div className="bg-gray-light h-6 w-1/2 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default VenueCardSkeleton;
