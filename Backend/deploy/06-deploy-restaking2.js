const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
// const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Restaking2=await deploy("Restaking2",{
        from:deployer,
        args:["0x466C868acb03ED465f29dbDD1643062935A37056","0x6fE25DafF298c0B517aDBaEf26f2841338019080"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Restaking2.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Restaking1"]