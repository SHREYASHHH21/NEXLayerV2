'use client'
import React from 'react'
import Button from '../ui/button'
import { useRouter } from 'next/navigation'

const Info = () => {
    const router = useRouter()
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full p-2  gap-2'>
            <div className='border rounded-md flex flex-col border-purple-600'>
                <h2 className='font-bold text-3xl mx-auto mt-6 text-purple-500' >Staking</h2>
                <div className='p-8 text-xl'>
                    Staking is the process of locking up your cryptocurrency assets to support the operations of a blockchain network and earn rewards in return. When you stake your assets, you contribute to the security and decentralization of the network, helping to validate transactions and maintain its integrity.

                    Benefits of Staking:

                    Earn Rewards: By staking your assets, you can earn rewards in the form of additional tokens or other benefits, such as transaction fee discounts.
                    Support the Network: Staking helps to secure the network and ensure its smooth operation, contributing to its overall health and sustainability.
                    Participate in Governance: Some blockchain networks allow stakers to participate in governance processes, such as voting on protocol upgrades and changes.
                    Considerations:

                    Lock-Up Period: Depending on the network, staking may involve locking up your assets for a certain period. Make sure you're comfortable with the lock-up period before staking.
                    Risk of Slashing: In some networks, stakers may face penalties, such as having their staked assets slashed, for malicious behavior or downtime. Be aware of the risks associated with staking on the specific network.
                </div>
                <Button variant='shimmer' className='mx-auto mt-auto mb-4' onClick={() => router.push("/stake")}>Stake Now</Button>
            </div>
            <div className='border rounded-md flex flex-col border-purple-600'>
                <h2 className='font-bold text-3xl mx-auto mt-6 text-purple-500'>Restaking</h2>
                <div className='p-8 text-xl'>
                    Restaking refers to the process of reinvesting the rewards earned from staking back into the staking pool to compound your earnings over time. Instead of withdrawing your rewards, you choose to automatically restake them, increasing your staking balance and potential rewards in the future.

                    Benefits of Restaking:

                    Compound Earnings: Restaking allows you to compound your staking rewards over time, potentially increasing your overall earnings significantly.
                    Continuous Participation: By restaking your rewards, you maintain continuous participation in the staking process, supporting the network and maximizing your potential rewards.
                    Simplicity and Convenience: Restaking can be set up to occur automatically, making it a convenient option for users who want to maximize their earnings without having to manually manage their staking rewards.
                    Considerations:

                    Flexibility: While restaking can increase your potential rewards, it also means your staked assets remain locked up for a longer period. Consider your liquidity needs and investment goals before opting to restake your rewards.
                    Tax Implications: Depending on your jurisdiction, restaking rewards may be subject to taxation. Consult with a tax professional to understand the tax implications of restaking on your earnings.
                </div>
                <Button className='mx-auto  mt-auto px-3 py-2 mb-4' variant='shimmer' onClick={() => router.push("/")}>Restake Now</Button>
            </div>

        </div>
    )
}

export default Info
