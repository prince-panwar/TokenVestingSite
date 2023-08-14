"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { useContract } from '../context/ContractContext';


export default function ConnectWallet() {
 
 const contract=useContract();

 
 const connect =  async() => {
 contract?.connectWallet();
 console.log("function connectWallet called");
};
 



 
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <button onClick={connect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Connect Wallet</button>
      </div>
    </div>
  )
}
