import { useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";
import react from "react"
import HoverPopover from "../ui/hover-card";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Table1Presentation } from "../data-table";
import Button from "../ui/button";
import { AiFillThunderbolt } from "react-icons/ai";
import TextInput from "../ui/input/text-input";
import { motion } from "framer-motion";
import {nativeUnstake} from "@/utils"
import { ethers } from "ethers";
import { toast } from "react-toastify";
// import 

interface AwardDetailsProps {
  token: string;
  award: string;
  stake: number;
  setStake: React.Dispatch<React.SetStateAction<number>>;
  // stakeError: string;
  period: string;
  callback: () => void;
  data:TableProps[];
  index?:number;
}

const ClaimTrx: React.FC<AwardDetailsProps> = ({
  token,
  award,
  stake,
  setStake,
  // stakeError,
  period,
  callback,
  data,
  index
 }) => {
  // css effect code
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  function listenForTransactionMined(transactionResponse: any, provider: ethers.providers.Web3Provider) {
    try {
      //listen for this transaction to be finished
      return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReciept: any) => {
          console.log(`Completed with ${transactionReciept.confirmations}`);
          resolve(transactionReciept);
        });
      });
    } catch (e) {
      // setLoading(false);
      toast.error("Transaction failed");
      console.log(e);
    }
  }

  return (
    <div className="flex  items-center p-4 border-[0.1px] border-gray-500 flex-col gap-2 h-fit sm:h-full w-11/12 md:w-1/2 mx-auto">

      {/* <div className="text-2xl font-bold">Staked {token}</div> */}
      {/* <div className="text-4xl font-bold">${award}</div> */}
      <div className="flex lg:flex-row flex-col items-center gap-2 p-2 justify-center">
        <motion.div
          style={{
            background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--blue-500),
            transparent 80%
          )
        `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="p-[2px] rounded-lg transition duration-300 group/input w-full"
        >
          <TextInput
            onChange={(e) => { if (+e.target.value >= 0) setStake(e.target.value as any) }}
            type="number"
            className={"bg-black rounded-md w-full h-14"}
            value={stake}
            name="number"
            id={"1"}
            min={0}
            // errorMessage={stakeError}
          />
        </motion.div>

        <Button variant="shimmer" className='py-2 !h-full' onClick={callback} >
          <AiFillThunderbolt className='text-lg' />
          <div className='font-bold'
          onClick={()=>{
            if(index){
              if(index==0){

              }else if (index==1){

              }
            }else{
              nativeUnstake(stake,listenForTransactionMined)
            }
          }}
          >Unstake</div>
        </Button>
      </div>
      
      <div className='flex gap-2 items-center w-full'>
        <HoverPopover content={<div>Content</div>}>
          <div className='flex justify-around gap-4 w-full'>
            <div className='flex gap-2 items-center cursor-help'>
              <IoMdInformationCircleOutline className='text-lg' />
              Cooldown Period
            </div>
            <div>{period}</div>
          </div>
        </HoverPopover>
      </div>
      {
        data && data.length>0 &&
       <Table1Presentation data={data}  />
      }

    </div>
  );
}
export default ClaimTrx;