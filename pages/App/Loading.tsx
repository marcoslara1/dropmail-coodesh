export default function Loading() {
    return (
        <>
            <section className=" bg-transparent">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div role="status">
                        <div className="relative w-10 h-10 animate-spin rounded-full bg-gradient-to-b from-[#3689b9] via-black to-black ">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-black rounded-full border-2 border-black"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
