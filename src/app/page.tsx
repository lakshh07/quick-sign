import Canvas from "@/components/Canvas";
import { FaSignature } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center relative h-screen">
      <div className="mx-auto max-w-2xl lg:text-center">
        <div className="mt-6 flex justify-center items-center gap-4 sm:text-6xl text-3xl">
          <FaSignature />
          <h2 className=" font-bold tracking-tight text-gray-900 ">
            Quick Sign
          </h2>
        </div>

        <p className="mt-2 text-md sm:text-lg text-center leading-8 text-gray-600">
          Easily Create Your Signature in PNG Format Instantly
        </p>
      </div>
      <div className="absolute -z-10 h-full w-full isolate overflow-hidden px-6 pt-16 shadow-2xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg
          viewBox="0 0 1024 1024"
          className="relative  -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <Canvas width={500} height={500} />
    </main>
  );
}
