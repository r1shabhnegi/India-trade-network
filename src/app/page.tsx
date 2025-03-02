"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapBoard from "@/components/MapBoard";

export default function Home() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
      <div className='flex flex-col'>
        <div className='fixed top-0 left-0 w-full z-[9999] py-2.5 bg-[#67696b] '>
          <h1 className='text-white text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight'>
            Indian Ports Trade Route
          </h1>
          <p className='absolute top-4 right-0 marquee w-[37%] bg-[#67696b]'>
            <span className='text-sky-400 text-lg font-bold'>
              This is not the trade routes map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; This is not the trade routes
            </span>
          </p>
        </div>

        <div className='w-full h-screen pt-14'>
          <div className='h-full'>
            <MapBoard />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
