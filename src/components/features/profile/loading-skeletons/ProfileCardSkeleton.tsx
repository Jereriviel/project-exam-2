const ProfileCardSkeleton = () => {
  return (
    <>
      <div className="grid-cols-[minmax(0, 1fr)] grid w-full min-w-0 animate-pulse grid-rows-[max-content] gap-4 rounded-xl lg:gap-6">
        <div className="bg-gray-light h-6 w-1/4 rounded-full xl:w-1/7"></div>
        <div className="flex w-full flex-wrap gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-2">
          <div className="grid-cols-[minmax(0, 1fr)] grid w-full min-w-0 animate-pulse grid-rows-[max-content] rounded-xl xl:grid-cols-2">
            <div className="bg-gray-light aspect-5/3 w-full rounded-t-xl rounded-b-none lg:aspect-4/3 xl:rounded-s-xl xl:rounded-e-none"></div>
            <div className="bg-secondary-light mt-auto flex min-w-0 flex-col gap-4 rounded-t-none rounded-b-xl p-4 xl:rounded-s-none xl:rounded-e-xl">
              <div className="bg-gray-light h-6 w-2/3 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-light h-4.5 w-3/5 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
              </div>
              <div className="bg-gray-light h-9 w-full rounded-full md:w-31"></div>
            </div>
          </div>

          <div className="grid-cols-[minmax(0, 1fr)] grid w-full min-w-0 animate-pulse grid-rows-[max-content] rounded-xl xl:grid-cols-2">
            <div className="bg-gray-light aspect-5/3 w-full rounded-t-xl rounded-b-none lg:aspect-4/3 xl:rounded-s-xl xl:rounded-e-none"></div>
            <div className="bg-secondary-light mt-auto flex min-w-0 flex-col gap-4 rounded-t-none rounded-b-xl p-4 xl:rounded-s-none xl:rounded-e-xl">
              <div className="bg-gray-light h-6 w-2/3 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-light h-4.5 w-3/5 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
                <div className="bg-gray-light h-4.5 w-1/4 rounded-full"></div>
              </div>
              <div className="bg-gray-light h-9 w-full rounded-full md:w-31"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCardSkeleton;
