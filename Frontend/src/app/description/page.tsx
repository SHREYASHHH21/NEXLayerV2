import ContentSection from '@/components/content'
import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Info from '@/components/info';

const tabsData = [
{
  value:"Info",
  label:"Info",
  content:<Info/>
}
];

const index = () => {
  return (
    <div className=" min-h-screen w-full  bg-neutral-950 relative flex flex-col  antialiased">
      <ToastContainer />
      
      <ContentSection
        tabs={tabsData}
      />

      <BackgroundBeams />
    </div>
  )
}

export default index
