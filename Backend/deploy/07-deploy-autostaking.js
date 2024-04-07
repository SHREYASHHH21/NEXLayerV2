const {networkConfig,developmentChains,}=require('../helper-hardhat-config.js')
require("dotenv").config()
const {network}=require('hardhat');
// const {verify}=require('../utils/verify.js')

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId
    const Autostaking=await deploy("Autostaking",{
        from:deployer,
        args:["0x466C868acb03ED465f29dbDD1643062935A37056",
            "0x9870Efd303AB183604Cf94A2a52A4267DC56ee66",
            "0xd0Da277aAc7c1bF68707e2df2087e3142cFc37E7",
            "0x984AEd7fE05585De8977f44705F9cBe82A362C06",
            "0x86ba08De0F14b6B2Af8688e1760F6aea5B0D462C",
            "0x4b90447f3BA00f0773B3096E762e1D5DF018f9Ab"
        ],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 1000 && process.env.CONFLUXSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await verify(Autostaking.address, [])
      }
    

    log("----------------------------------")
}
module.exports.tags=["all","Autostaking"]