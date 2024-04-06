"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import clsx from "clsx";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
    statistics: {
      label: string;
      value: string
    }[]
    onClick?: () => void;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[40rem] overflow-y-auto flex justify-center relative  rounded-md p-10 gap-8 opacity-70 snap-y snap-mandatory"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 ">
        <div className="max-w-2xl ">
          {content.map((item, index) => (
            <div className="snap-always snap-center">
              <div key={item.title + index} className={clsx(index == content.length - 1 ? "mt-20" : "my-20")}>
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-lg text-slate-300 max-w-sm mt-10"
                >
                  {item.description}
                </motion.p>
                <motion.button className="my-4 p-2 rounded-md w-fit capitalize"
                  animate={{
                    background: linearGradients[activeCard % linearGradients.length],
                  }}
                  onClick={item.onClick}
                >
                  button
                </motion.button>
              </div>
              <div className="block lg:hidden">
                <motion.div
                  animate={{
                    background: linearGradients[activeCard % linearGradients.length],
                  }}
                  className={cn(
                    " h-80 w-96 p-6 rounded-md bg-white sticky top-32  overflow-hidden my-auto ",
                    contentClassName, "bg-transparent"
                  )}
                >
                  <div className="h-full justify-center items-center flex flex-col gap-8">
                    {
                      content[activeCard].statistics.map((item, index) => (
                        <div key={item.label + index} className="flex flex-col items-center justify-center">
                          <p className="text-lg font-semibold text-black">{item.label}</p>
                          <p className="text-2xl font-bold text-deep-purple-accent-400">
                            {item.value}
                          </p>
                        </div>
                      ))
                    }
                    {/* <p className="text-lg font-semibold text-gray-800">{content[activeCard].statistics.label}</p>
          <p className="text-2xl font-bold text-deep-purple-accent-400">
            {content[activeCard].statistics.value}
          </p> */}
                  </div>
                  {/* {content[activeCard].content ?? null} */}
                </motion.div>
              </div>
            </div>
          ))}
          {/* <div className="h-40" /> */}
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className={cn(
          "hidden lg:block h-80 w-96 p-6 rounded-md bg-white sticky top-32  overflow-hidden my-auto ",
          contentClassName, "bg-transparent"
        )}
      >
        <div className="h-full justify-center items-center flex flex-col gap-8">
          {
            content[activeCard].statistics.map((item, index) => (
              <div key={item.label + index} className="flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-black">{item.label}</p>
                <p className="text-2xl font-bold text-deep-purple-accent-400">
                  {item.value}
                </p>
              </div>
            ))
          }
          {/* <p className="text-lg font-semibold text-gray-800">{content[activeCard].statistics.label}</p>
          <p className="text-2xl font-bold text-deep-purple-accent-400">
            {content[activeCard].statistics.value}
          </p> */}
        </div>
        {/* {content[activeCard].content ?? null} */}
      </motion.div>
    </motion.div>
  );
};
