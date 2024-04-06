// "use client";
// import { cn } from "@/utils/cn";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";
// // import Team from "./card";
// // import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
// import TeamMemberCard2 from "./team";


// // const teamMembers: TeamMember[] = [
// //   {
// //     name: "Andres Berlin",
// //     role: "Chief Executive Officer",
// //     imageSrc: "https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif",
// //     bio: "The CEO's role in raising a company's corporate IQ is to establish an atmosphere that promotes knowledge sharing and collaboration.",
// //     socialLinks: [
// //       { platform: "Github", url: "#", icon: <FaGithub className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
// //       { platform: "Twitter", url: "#", icon: <FaInstagram className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
// //       { platform: "Instagram", url: "#", icon: <FaLinkedin className="text-[30px] p-1 rounded-md ripple-gray-300"/> },
// //     ],
// //   },
// //   // Add other team members similarly
// // ];
// const members = [
//   {
//     name: 'Tranter Jaskulski',
//     title: 'Founder & Specialist',
//     avatarUrl: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80',
//     linkedinUrl: '#',
//     twitterUrl: '#',
//     instagramUrl: '#',
//   },
//   // Add more team members here
// ];

// export const HoverEffect = ({
//   items,
//   className,
// }: {
//   items:TeamMember[];
//   className?: string;
// }) => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <div
//     className={cn(
//       "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-2",
//       className
//     )}
//   >
//       {items.map((item, idx) => (
//         <HoverCard
//           key={idx}
//           item={items}
//           hovered={hoveredIndex === idx}
//           onMouseEnter={() => setHoveredIndex(idx)}
//           onMouseLeave={() => setHoveredIndex(null)}
//         />
//       ))}
//     </div>
//   );
// };

// const HoverCard = ({
//   item,
//   hovered,
//   onMouseEnter,
//   onMouseLeave,
// }: {
//   item: TeamMember[];
//   hovered: boolean;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
// }) => (
//   <div
//     className="relative group block p-2 h-full w-full "
//     onMouseEnter={onMouseEnter}
//     onMouseLeave={onMouseLeave}>

//     <AnimatePresence>
//       {hovered && (
//         <motion.span
//           className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-white/20 block rounded-3xl"
//           layoutId="hoverBackground"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, transition: { duration: 0.30 } }}
//           exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.5 } }}
//         />
//       )}
//     </AnimatePresence>
//     {/* <Card> */}
//     <div className="flex flex-wrap">
//       {members.map((member, index) => (
//         <TeamMemberCard2 key={index} {...member} />
//       ))}
//     </div>
//     {/* <Team members={item} /> */}
//     {/* </Card> */}
//   </div>
// );

// export const Card = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => (
//   <div
//     className={cn(
//       "rounded-2xl h-full w-full p-1 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
//       className
//     )}
//   >
//       {children}

//   </div>
// );



