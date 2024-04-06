import ContentSection from '@/components/content'
import Stake from '@/components/stake';
import Restake from '@/components/restake';
import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'
import Award from '@/components/award';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tabsData = [
  {
    value: "Stake",
    label: "Stake",
    content:<Stake />,
  },
  {
    value: "Restake",
    label: "Restake",
    content: <Restake/>,
  },
  {
    value: "Awards",
    label: "Unstake",
    content: <Award/>,
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
