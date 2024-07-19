import { ArrowRight01Icon } from '@/components/icons';
import SmallLogo from '@/public/smallLogo.jpg';
import EyeLogo from '@/public/eyeLogo.jpg';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Logger - Home ',
  description: 'Help you log your workdays',
};

export default function Home() {
  return (
    <main className='container mx-auto sm:my-4 p-4 rounded-2xl bg-[#fafbfb]'>
      {/* First section */}
      <section className='w-full flex flex-col-reverse gap-8 md:gap-0 md:flex-row items-center justify-around'>
        {/* left column which contains app name, start tracking button and so on */}
        <div className='flex flex-col gap-4'>
          {/* Application title */}
          <div>
            <h1 className='font-semibold text-2xl'>Welcome to</h1>
            <h1 className='font-extrabold text-5xl sm:text-6xl text-[#102232]'>Task Logger</h1>
          </div>
          {/* App key word */}
          <div className='bg-white flex flex-row items-center justify-center gap-2 mt-3 p-2 rounded-lg shadow-inner italic text-sm font-semibold text-neutral-500'>
            <h6>Stay Organized,</h6>
            <h6>Stay Productive</h6>
          </div>
          {/* Start Link */}
          <div className='flex flex-row items-center gap-4'>
            <Link
              href='task-management'
              className='py-2 px-4 gap-2 rounded-3xl flex items-center justify-center shadow text-blue-50 bg-blue-700'
            >
              <span>Start Tracking</span>
              <ArrowRight01Icon />
            </Link>
          </div>
        </div>
        {/* image column */}
        <div>
          <Image
            src={SmallLogo}
            alt='TaskLogger-logo'
            className='object-contain w-64 h-64 shadow-md'
            style={{ borderRadius: '83% 17% 88% 12% / 31% 72% 28% 69%' }}
          />
        </div>
      </section>
      {/* second section */}
      <section className='w-full flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-around mt-24'>
        {/* Second image */}
        <Image
          src={EyeLogo}
          alt='eye-logo'
          className='object-contain w-64 h-64 shadow-md'
          style={{ borderRadius: '32% 68% 20% 80% / 67% 43% 57% 33% ' }}
        />
        {/* Application description */}
        <div>
          <h3 className='font-bold text-lg mb-1'>What is Task Logger?</h3>
          <p className='w-72 sm:w-96 text-neutral-600 text-justify'>
            Task Logger is your go-to application for logging daily tasks, keeping track of your activities, and
            managing your time effectively. Whether you are working on a big project or simply want to track your
            day-to-day tasks, TaskLogger provides an easy and efficient way to stay organized.
          </p>
        </div>
      </section>
    </main>
  );
}
