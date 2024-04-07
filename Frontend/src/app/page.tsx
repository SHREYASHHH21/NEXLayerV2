import Button from '@/components/ui/button'
import GridBackground from '@/components/ui/grid-background'
import { InfiniteMovingCards } from '@/components/ui/infinite-scroll'
import Spotlight from '@/components/ui/spot-light'
import Image from 'next/image'
import { AiFillThunderbolt } from "react-icons/ai";
import infiniteScrollData from '@/data/infinite-scroll.json'
import Artworks from '@/components/light-box'
import BluePrint from '@/assets/BluePrint.png'
import Restaking from '@/assets/Restaking.png'
import Footer from '@/components/footer'
// import { HoverEffect } from '@/components/our-team'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeImage from "@/assets/Home_img.jpeg"
import Link from 'next/link'
import TeamMemberCard2 from '@/components/our-team/team'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
const artwork = [
  BluePrint
  , Restaking
];

//👇 Configure our font object

// const TeamMembers: TeamMember[] = [
//   {
//     name: "Akhilesh Jyotishi",
//     role: "Full Stack Web Development",
//     imageSrc: "/item1",
//     bio: "Full Stack Web Developer",
//     socialLinks: [
//       { platform: "Github", url: "", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Twitter", url: "", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Instagram", url: "", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//     ],

//   },
//   {
//     name: "Akhilesh Jyotishi",
//     role: "Full Stack Web Development",
//     imageSrc: "/item1",
//     bio: "Full Stack Web Developer",
//     socialLinks: [
//       { platform: "Github", url: "", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Twitter", url: "", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Instagram", url: "", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//     ],

//   },
//   {
//     name: "Akhilesh Jyotishi",
//     role: "Full Stack Web Development",
//     imageSrc: "/item1",
//     bio: "Full Stack Web Developer",
//     socialLinks: [
//       { platform: "Github", url: "", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Twitter", url: "", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Instagram", url: "", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//     ],

//   },
//   {
//     name: "Akhilesh Jyotishi",
//     role: "Full Stack Web Development",
//     imageSrc: "/item1",
//     bio: "Full Stack Web Developer",
//     socialLinks: [
//       { platform: "Github", url: "", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Twitter", url: "", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//       { platform: "Instagram", url: "", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300" /> },
//     ],

//   },
//   // {
//   //   title: "Shreyash Lokhande",
//   //   description: "Blockchain Developer",
//   //   link: "/item2",
//   // },
//   // {
//   //   title: "Yash Kudnar",
//   //   description: "Blockchain Developer",
//   //   link: "/item3",
//   // },
//   // {
//   //   title: "Manan Patel",
//   //   description: "",
//   //   link: "/item3",
//   // },
// ];
{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
<Image
  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  src="/next.svg"
  alt="Next.js Logo"
  width={180}
  height={37}
  priority
/>
</div> */}

const members = [
  {
    name: 'Akhilesh Jyotishi',
    title: 'Frontend Devloper',
    avatarUrl: 'https://media.licdn.com/dms/image/D4E03AQGfBReOk6fywg/profile-displayphoto-shrink_400_400/0/1666982007021?e=1718236800&v=beta&t=f8RLGDrGzQ_4WXcPIl6Qrt4MmYHDyCU5vc86b3WOATU',
    linkedinUrl: 'https://www.linkedin.com/in/akhilesh-jyotishi-225425255/',
    twitterUrl: '#',
    instagramUrl: '#',
  },
  {
    name: 'Manan Patel',
    title: 'Blockchain Devloper',
    avatarUrl: 'https://media.licdn.com/dms/image/D5603AQFdbY_tNEMd9Q/profile-displayphoto-shrink_800_800/0/1669132015120?e=1718236800&v=beta&t=Jhd-DDC3jMP19efJmNl_brMkodpbqkzY-VceJue3P5I',
    linkedinUrl: 'https://www.linkedin.com/in/manan-patel-389124258/',
    twitterUrl: '#',
    instagramUrl: '#',
  },
  {
    name: 'Yash Kudnar',
    title: 'Blockchain Devloper',
    avatarUrl: 'https://media.licdn.com/dms/image/D4D03AQHEKhVkHGfyxw/profile-displayphoto-shrink_400_400/0/1710691479752?e=1718236800&v=beta&t=E5pcPsaTWIlRj8LWuH-dcgfFpK9sQEB1UmHeYJ7nkw0',
    linkedinUrl: 'https://www.linkedin.com/in/yash-kudnar-64544a224/',
    twitterUrl: '#',
    instagramUrl: '#',
  },
  {
    name: 'Shreyash Lokhande',
    title: 'Blockchain Devloper',
    avatarUrl: 'https://media.licdn.com/dms/image/D4D03AQFkutRjMEP32w/profile-displayphoto-shrink_400_400/0/1684429800212?e=1718236800&v=beta&t=m2EUxNfuzyBscp-sirANVvb2jW145EI-fFbF-LvJQIw',
    linkedinUrl: 'https://www.linkedin.com/in/shreyash-lokhande-b03651251/',
    twitterUrl: '#',
    instagramUrl: '#',
  },
  // Add more team members here
];

const words = [
  {
    text: "Liquid   Dreams ,",
  },
  {
    text: "Multiple Gains",
  }

]
export default function Home() {



  return (

    <main className="h-full">
      <ToastContainer />

      
      <GridBackground >

        <Spotlight
          className=" -top-40 left-0 md:left-60 md:-top-20 "
          fill="#7423B7" />

        <div className='relative  w-11/12 sm:w-4/5 mx-auto'>
          <div className='relative grid grid-cols-1 md:grid-cols-2 text-white  '>
            <div className='flex flex-col'>
              <div className='text-3xl md:text-5xl lg:text-7xl font-extrabold capitalize text-center md:text-start' >
                <span className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-transparent'>Liquid Dreams , multiple gains</span>
              </div>
              <div className='mt-14 text-[20px] text-gray-300 tracking-wider  '>
              <TextGenerateEffect words={` NEXLayer protocol is built on conflux that introduces restaking, a new primitive in cryptoeconomic security. This primitive enables the reuse of CFX on the consensus layer. Users that stake CFX natively or with a liquid staking token (LST) can opt-in to NEXLayer smart contracts to restake their CFX or LST and extend cryptoeconomic security to additional applications on the network to earn additional rewards.`} />
              </div>
              <Button variant="blackNwhite" className='!mt-12' >
                <AiFillThunderbolt className='text-lg' />
                <Link href={"/stake"} className='font-bold'>Launch App</Link>
              </Button>
            </div>
            <div className='grid place-items-center'>
              <Image alt='' src={HomeImage} height={1000} width={1000} className=' shadow h-[520px] w-[520px] rounded-full ' style={{ mixBlendMode: "lighten" }} />
            </div>

          </div>
          <InfiniteMovingCards items={infiniteScrollData} className='mt-16' direction='left' key={"infinite"} pauseOnHover={false} speed='normal' />
          <div className='mt-40'>
            <div className='text-white md:text-6xl text-3xl font-bold mx-auto w-fit capitalize text-center'>
              How <span className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text text-transparent'>NEXLayer</span> Works
            </div>
            <Artworks artwork={artwork} />
          </div>
          <h1 className='w-full text-3xl md:text-6xl text-center text-white mt-20 md:mt-40 font-bold'>
            Meet Our Team
          </h1>
          <h4 className='text-center text-gray-300 w-full text-lg md:text-2xl mt-4 italic'>We’re a dynamic group of individuals who are passionate about what we do.</h4>
          {/* <HoverEffect items={TeamMembers} /> */}
          <div className="flex flex-wrap pt-10">
            {members.map((member, index) => (
              <TeamMemberCard2 key={index} {...member} />
            ))}
          </div>

          <Footer />
        </div>

      </GridBackground>

    </main>
  )
}
