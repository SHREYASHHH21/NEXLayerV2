const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
// const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const LiquidityPool=await deploy("LiquidityPool",{
        from:deployer,
        args:["0x466C868acb03ED465f29dbDD1643062935A37056","0x15Edeb1DdAdAbAF25Aaabb4cF56614DC3Be039ee"],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Liquiditypool.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","LiquidityPool"]