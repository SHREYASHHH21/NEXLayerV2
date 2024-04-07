import ContentSection from '@/components/content'
// import Stake from '@/components/stake';
// import Restake from '@/components/restake';
// import Unstake from '@/components/award';
import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';
const Stake = dynamic(() => import("@/components/stake"), {
  ssr: false,
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const Restake = dynamic(() => import("@/components/restake"), {
  ssr: false,

  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const Unstake = dynamic(() => import("@/components/award"), {
  ssr: false,

  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
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
    content: <Unstake/>,
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
