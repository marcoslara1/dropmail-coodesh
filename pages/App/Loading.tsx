export default function Loading() {
  return (
    <>
      <section className="bg-transparent md:mx-0 md:ml-2 mx-2 z-0">
        <div className="flex flex-col items-center justify-center">
          <div role="status">
            <div className="relative w-6 h-6 animate-spin rounded-full bg-gradient-to-b from-[#3689b9] via-black to-black ">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-black"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
