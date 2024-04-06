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
            "0x15Edeb1DdAdAbAF25Aaabb4cF56614DC3Be039ee",
            "0x6fE25DafF298c0B517aDBaEf26f2841338019080",
            "0x984AEd7fE05585De8977f44705F9cBe82A362C06",
            "0x4bBaA66f14a857B3e93B5Cd55435C0B9eBFbDbA6",
            "0x23AF8389A53FdA7088e1BB31B81716c39A88e942"
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