"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapBoard from "@/components/MapBoard";
import InfiniteScrollPara from "./InfiniteScrollPara";

export default function Home() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
      <div className=''>
        <div className='fixed top-0 left-0 w-full z-[9999] pt-2 lg:pt-1.5 bg-[#515253] '>
          <h1 className='text-white text-center text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight'>
            Sustainable Roadmap
          </h1>
          <InfiniteScrollPara />
        </div>

        <div className='w-full h-svh pt-14'>
          <div className='h-full'>
            <MapBoard />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}
