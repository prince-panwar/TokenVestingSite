"use client"
import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/navigation';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers ,BrowserProvider,Eip1193Provider,Contract} from 'ethers';
import ContractAbi from "../../../hardhat/artifacts/contracts/Vesting.sol/TokenVesting.json";
export default function ConnectWallet() {
  const [provider,setProvider] = useState<BrowserProvider|undefined>();
  const [currentUser,setCurrentUser] = useState();
  const [contractInstance,setContractInstance] = useState<Contract>();
  const router = useRouter();
  const abi = ContractAbi.abi;
  const contractAddress="0x377776f3954b8CF802b0fE4dA745De274B7ff724";
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
    getInstance();
    
    }
  }catch(err:any){
  
    console.log(err.message)
  }
  }
  const getInstance= async()=>{
    try{
    const signer = await provider?.getSigner();
    const contractInst = new ethers.Contract(contractAddress,abi,signer);
    setContractInstance(contractInst);
    routeUser();
    }catch(err:any){
      console.log(err.message);
    }
  }
  const routeUser= async()=>{
    let tx = await contractInstance?.isOrganization(currentUser);
    if(tx){
      router.push(`/OrganisationDashboard`);
      console.log("Routed to organisation dashboard");
    }else{    
      console.log("routed to Register&Claim");
    router.push(`/Register&Claim`);}

  }
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">Connect Wallet</button>
      </div>
    </div>
  )
}
