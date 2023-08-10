"use client"
import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers ,BrowserProvider,Eip1193Provider} from 'ethers';
export default function ConnectWallet() {
  const [provider,setProvider] = useState<BrowserProvider|undefined>();
  const [currentUser,setCurrentUser] = useState();
  const router = useRouter();
  useEffect(()=>{
    async function getProvider(){
     const ETHProvider:Eip1193Provider|null = await detectEthereumProvider();
     if(ETHProvider){
      setProvider(new ethers.BrowserProvider(ETHProvider));
     }else{
      alert("Please install metamask wallet to use this site")
     }
    }
    getProvider();
  },[])
  const connectWallet =async()=>{
  try{
    if(provider){
    const account = await provider.send('eth_requestAccounts',[]);
    setCurrentUser(account[0]);
    routeUser();
    }
  }catch(err:any){
  
    console.log(err.message)
  }
  }
  const routeUser=()=>{
    console.log("routed");
    router.push("/Register&Claim");
  }
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Connect Wallet</button>
      </div>
    </div>
  )
}
