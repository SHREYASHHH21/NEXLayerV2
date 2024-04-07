"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import xCFX from '@/assets/xcfx-high-resolution-logo-transparent.svg';
import { cn } from "@/utils/cn";
import ConfirmationDialog from '@/components/alert';
import { ethers } from 'ethers';
import stakeData from '@/data/stake.json';
import RestakeData from '@/data/restake1.json';
import TextInput from '@/components/ui/input/text-input';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { SiBlockchaindotcom } from "react-icons/si";
import { GiCash } from "react-icons/gi";
import { RiExchangeLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { MultiStepLoader as Loader } from "@/components/multi-step-loader";
import { TbTransfer } from "react-icons/tb";
import ClaimTrx from '@/components/claim-transaction';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useMetaMaskContext } from '@/providers/metamask-context';

declare var window: any
const loadingStates = [
  {
    text: "Grabbing your CFX",
  },
  {
    text: "Staking your CFX",
  },
  {
    text: "Minting your xCFX",
  },
  {
    text: "Restaking your xCFX",
  },
  {
    text: "Minting lxCFX",
  },
  {
    text: "Sending you lxCFX",
  },
];

const Stake: React.FC = () => {
  // css effect code
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);
  // const params;
  const params = useParams();
  const index = Number(params.pool);
const {connectWallet}=useMetaMaskContext()

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }


  const [loading, setLoading] = useState(false);
  const [ETH, setETH] = useState<number | undefined>();
  const [xETH, setxETH] = useState<number | undefined>();

  const [installMetaMask, setInstallMetaMask] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0.002259);
  const [availableBalance, setAvailableBalance] = useState<number>(0);
  const [stakeError, setStakeError] = useState("");
  const [conversionRate] = useState<number>(0.93);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleConfirm = async () => {
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);
        const amountWei = ethers.utils.parseEther(ETH?.toString() ?? "0");
        let txn = await contract.stake({ value: amountWei })

        await listenForTransactionMined(txn, provider);
        console.log("stakeds successfully")
        // toast.success("Staked successfully !!!");
        console.log("Done");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    }

    setOpen(false);
  }
  const handleStakeCFX = () => {
    setOpen(true);
  }

  useEffect(() => {
    // SetProvider()
    getBalance()
  }, [])


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
      setLoading(false);
      toast.error("Transaction failed");
      console.log(e);
    }
  }

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let addresses = window.ethereum.request({ method: "eth_requestAccounts" });
    let bal = await provider.getBalance(addresses[0]);
    let x = (ethers.utils.formatEther(bal))
    console.log(x)
    setAvailableBalance(+x);

  }


  const [staked, setStaked] = useState<number>(0)

  return (
    <>
      <div className=' min-h-screen w-full bg-neutral-950 relative flex flex-col  antialiased'>
        <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
        <div className='z-40'>
          <ConfirmationDialog
            open={open}
            setOpen={setOpen}
            onCancel={handleClose}
            onConfirm={handleConfirm}
            title="Stake Conflux"
            message="Are you sure you want to stake your Conflux? You can recieve your tokens 7 days after unstaking the amount."
            buttonText="Stake"
          />

          <div className='flex flex-col gap-12 w-full sm:h-full sm:w-4/5 mx-auto p-4  rounded-md mt-12 bg-black/30 border border-purple-600 text-white'>

            <div className='flex   w-11/12  sm:mx-auto justify-between mt-16  '>
              <div className='w-full  bg-gradient-to-r from-indigo-500 to-purple-500  flex flex-col gap-4 p-4 rounded-md'>
                <Conflux
                  text='Conflux'
                  className='h-12 w-12 shrink-0'
                  Base_Class='flex items-center gap-2'
                  textClass='text-white mt-0 text-[28px]'
                  picture={"https://s2.coinmarketcap.com/static/img/coins/64x64/7334.png"} />

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
                    onChange={(e) => { if (+e.target.value >= 0) { setETH(e.target.value as any); setxETH(conversionRate * (Number(e.target.value) as any)) } }}
                    type="number"
                    className={"bg-black rounded-md w-full h-14"}
                    value={ETH}
                    name="number"
                    id={"1"}
                    min={0}
                    errorMessage={stakeError}
                  />
                </motion.div>
                <div className='p-2 font-semibold flex justify-between '>
                  <div className='flex gap-4 items-center'>
                    <SiBlockchaindotcom />
                    Available Balance
                  </div>
                  <div>
                    {availableBalance}
                  </div>
                </div>
                <div className='p-2 font-semibold flex justify-between '>
                  <div className='flex gap-4 items-center'>
                    <GiCash className='text-xl' />
                    Estimated Gas Price
                  </div>
                  <div>
                    {balance}
                  </div>
                </div>
              </div>
              <TbTransfer className='text-[150px] my-auto' />
              <div className='w-full  bg-gradient-to-r from-indigo-500 to-purple-500  flex flex-col gap-4 p-2 rounded-md'>
                <Conflux
                  text='xConflux'
                  className='h-12 w-12 shrink-0'
                  Base_Class='flex items-center gap-2'
                  textClass='text-white mt-0 text-[28px]'
                  picture={xCFX} />
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
                    onChange={(e) => { if (+e.target.value >= 0) { setETH(Number(e.target.value as any) / conversionRate); setxETH((e.target.value as any)) } }}
                    type="number"
                    className={"bg-black rounded-md w-full h-14"}
                    value={xETH}
                    name="number"
                    id={"1"}
                    min={0}
                    errorMessage={stakeError}
                  />
                </motion.div>
                <div className='p-2 font-semibold flex justify-between '>
                  <div className='flex gap-4 items-center'>
                    <RiExchangeLine className='text-xl' />
                    Conversion Rate
                  </div>
                  <div>
                    {conversionRate}
                  </div>
                </div>
              </div>

            </div>

            <div className='w-3/5 mx-auto flex sm:justify-around flex-col sm:flex-row gap-y-6'>
              {installMetaMask ?
                (
                  <Button className='text-2xl' variant='shimmer' onClick={connectWallet}>Connect Wallet</Button>
                ) :
                (
                  <>
                    <Button className='text-2xl' variant='shimmer' onClick={handleStakeCFX} disabled={ETH ? ETH <= 0 : true}>Stake</Button>
                  </>
                )
              }
            </div>
            {/* <ClaimTrx token='token1' award='1' callback={() => { }} period='1' setStake={setStaked} stake={staked} key={"Claim Staked Amount"} /> */}

          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}


const Conflux = ({ text, className, Base_Class, textClass, picture }: { text: string, className: string, Base_Class?: string, textClass?: string, picture: string }) => (
  <div className={Base_Class}>
    <div className='bg-white w-fit rounded-full p-2 shrink-0 '>
      <Image alt='' src={picture} height={400} width={400} className={cn(' rounded-full', className)} />
    </div>
    <div className={cn('mt-4 text-center  font-bold text-xl w-[120px] sm:w-[0px]', textClass)}>{text}</div>

  </div>
)


export default Stake;

