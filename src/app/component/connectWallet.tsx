"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useContract } from '../context/ContractContext';


export default function ConnectWallet() {
 const router = useRouter();
 const contract=useContract();
 const user = contract?.currentUser;
 const contractInst = contract?.contractInstance;
 
 const connect =  async() => {
 contract?.connectWallet();
};
 



 
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <button onClick={connect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Connect Wallet</button>
      </div>
    </div>
  )
}
