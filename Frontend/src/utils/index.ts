import stakeData from '@/data/stake.json';
import restakeData from '@/data/restake1.json';
import restakeData2 from '@/data/restake2.json';
import autoStake from '@/data/auto-stake.json';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
declare var window: any


export const nativeStake = async(stake:number,listenForTransactionMined:any) => {
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);
        const amountWei = ethers.utils.parseEther(stake?.toString() ?? "0");
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

}

export const nativeAutoStake = async(listenForTransactionMined:any,setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        if (window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        
        const contract = new ethers.Contract(autoStake.addressAutostake, autoStake.abiAutoStake, signer);

        const transaction = await contract.autostaking1();
        const receipt = await transaction.wait();

        console.log("Transaction confirmed in block:", receipt.blockNumber);
        
        await listenForTransactionMined(transaction, provider);
        console.log("AutoRestaked successfully !!!");


      } else {
        toast.info("Please Connect Wallet !!!")
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      setLoading(false);
      toast.warning(error as any);
    }
}

export const reStake1 = async(listenForTransactionMined:any,stake:number,setOpen: React.Dispatch<React.SetStateAction<boolean>>) =>{
     try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData.addressRestake1, restakeData.abiRestake1, signer);


        const amountWei = ethers.utils.parseEther(stake.toString());

        let txn = await contractRestake.transferTokens(amountWei)
        // let txn = await contractRestake.methods.transferTokens(amountWei).call();


        await listenForTransactionMined(txn, provider);
        console.log("Staked successfully !!!");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
      setOpen(false);

    }
}

export const reStake2 = async(listenForTransactionMined:any,stake:number,setOpen: React.Dispatch<React.SetStateAction<boolean>>) =>{
try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData2.addressRestake2, restakeData2.abiRestake2, signer);


        const amountWei = ethers.utils.parseEther(stake.toString());

        let txn = await contractRestake.transferTokens(amountWei)
        // let txn = await contractRestake.methods.transferTokens(amountWei).call();


        await listenForTransactionMined(txn, provider);
        console.log("Staked successfully !!!");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
      setOpen(false);

    }
}

export const unStake1 = async(listenForTransactionMined:any,stake:number)=>{
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(restakeData.addressRestake1, restakeData.abiRestake1, signer);

        // const amountWei = ethers.utils.parseEther(stake.toString());

        const transaction = await contract.unstake(stake);
        // burn xcfx ---- pending
        await listenForTransactionMined(transaction, provider);

        // let unstakeTimestamp;
        // contract.on("unboundingPeriodInitiated",(_sender,_amt,_timestamp)=>{
        //     unstakeTimestamp=_timestamp;
        // })

        // const txn = await contract.withdraw(unstakeTimestamp);
        // await listenForTransactionMined(txn, provider);

      } else {
        console.log("Please Connect Wallet !!!")
      }
    } catch (error) { 
      toast.warning("Please enter the amount to unstake2");

    }
}

export const unStake2 = async(stake:number,listenForTransactionMined:any,setOpen: React.Dispatch<React.SetStateAction<boolean>>)=>{
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData2.addressRestake2, restakeData2.abiRestake2, signer);


        const txn = await contractRestake.unstake(stake)

       
        // let txn = await contractRestake.methods.transferTokens(amountWei).call();


        await listenForTransactionMined(txn, provider);
        console.log("Staked successfully !!!");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
      setOpen(false);

    }
}

export const nativeUnstake = async(stake:number,listenForTransactionMined:any,setOpen: React.Dispatch<React.SetStateAction<boolean>>)=>{
    try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);


        const txn = await contractRestake.unstake(stake)

       
        // let txn = await contractRestake.methods.transferTokens(amountWei).call();


        await listenForTransactionMined(txn, provider);
        console.log("Staked successfully !!!");

      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
      setOpen(false);

    }
}


export const getUserClaimableData1 = async(listenForTransactionMined:any)=>{
     try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData.addressRestake1, restakeData.abiRestake1, signer);


        let txn = await contractRestake.getUserClaimableToken(); 

        await listenForTransactionMined(txn, provider);
        console.log("Fetched Data !!!");

        return txn;
      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
    //   setOpen(false);

    }

}

export const withdraw1 = async(arr:string[],listenForTransactionMined:any,index:number,getUserClaimableData1:any)=>{
     try {
    if(window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData.addressRestake1, restakeData.abiRestake1, signer);

        let txnArray = await getUserClaimableData1();
        let currentTimestamp = txnArray[index].timestamp;
        
        const transaction = await contractRestake.withdraw(currentTimestamp);  
       
        await listenForTransactionMined(transaction, provider);
        console.log("Unstaked successfully !!!");

    }else{
        console.log("Please Connect Wallet !!!")
    }
} catch (error) {
    toast.warning("Please enter the amount to unstake1");
    
}
}

export const getUserClaimableData2 = async(listenForTransactionMined:any)=>{
     try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake2 = new ethers.Contract(restakeData2.addressRestake2, restakeData2.abiRestake2, signer);


        let txn = await contractRestake2.getUserClaimableToken(); 

        await listenForTransactionMined(txn, provider);
        console.log("Fetched Data !!!");

        return txn;
      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
    //   setOpen(false);

    }

}

export const withdraw2 = async(arr:string[],listenForTransactionMined:any,index:number,getUserClaimableData1:any)=>{
     try {
    if(window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(restakeData2.addressRestake2, restakeData2.abiRestake2, signer);

        let txnArray = await getUserClaimableData1();
        let currentTimestamp = txnArray[index].timestamp;
        
        const transaction = await contractRestake.withdraw(currentTimestamp);  
       
        await listenForTransactionMined(transaction, provider);
        console.log("Unstaked successfully !!!");

    }else{
        console.log("Please Connect Wallet !!!")
    }
} catch (error) {
    toast.warning("Please enter the amount to unstake1");
    
}
}

export const nativeGetUserClaimableData = async(listenForTransactionMined:any)=>{
     try {
      if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);


        let txn = await contractRestake.getUserClaimableToken(); 

        await listenForTransactionMined(txn, provider);
        console.log("Fetched Data !!!");

        return txn;
      } else {
        console.log("Please Connect Wallet !!!");
      }
    } catch (error) {
      // toast.warning("Please enter the amount");
      console.log(error);
    } finally {
    //   setOpen(false);

    }

}

export const nativeWithdraw = async (arr:string[],listenForTransactionMined:any,index:number,getUserClaimableData1:any) => {
      try {
    if(window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contractRestake = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);

        let txnArray = await getUserClaimableData1();
        let currentTimestamp = txnArray[index].timestamp;
        
        const transaction = await contractRestake.withdraw(currentTimestamp);  
       
        await listenForTransactionMined(transaction, provider);
        console.log("Unstaked successfully !!!");

    }else{
        console.log("Please Connect Wallet !!!")
    }
} catch (error) {
    toast.warning("Please enter the amount to unstake1");
    
}

}