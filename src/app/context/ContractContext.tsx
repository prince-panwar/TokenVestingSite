"use client"
import React, { createContext,useContext, useState } from 'react';
import { ethers ,BrowserProvider,Eip1193Provider,Contract} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import ContractAbi from "../../../hardhat/artifacts/contracts/Vesting.sol/TokenVesting.json";

const ContractContext = createContext<ContractContextValue|undefined>(undefined);
type ContractContextValue={
    currentUser:string|undefined,
    contractInstance:Contract|undefined,
    connectWallet: () => {}
  
}
interface ContractProviderProps {
    children: React.ReactNode;
  }
 

export const ContractProvider:React.FC<ContractProviderProps> = ({ children }) => {
const [contractInstance,setContractInstance] = useState<Contract|undefined>();
const [currentUser,setCurrentUser] = useState<string|undefined>(undefined);
const [provider,setProvider] = useState<BrowserProvider|undefined>();
const abi = ContractAbi.abi;
const contractAddress="0x377776f3954b8CF802b0fE4dA745De274B7ff724";
   

async function getProvider(){
    if(typeof window !== "undefined")
    {  const ETHProvider:Eip1193Provider|null = await detectEthereumProvider();
        if(ETHProvider){
            setProvider(new ethers.BrowserProvider(ETHProvider));
            }
            else{
               alert("Please install metamask wallet to use this site")
                 
            }
    }
  
   
        }
      
      
      
    
const connectWallet =async()=>{
      try{
        getProvider();
        if(provider){
        const account = await provider.send('eth_requestAccounts',[]);
        setCurrentUser(account[0]);
        getInstance();
        console.log("connect wallet called")
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
        
        }catch(err:any){
          console.log(err.message);
        }
      }
    
    
      return (
        <ContractContext.Provider value={{currentUser, contractInstance, connectWallet }}>
          {children}
        </ContractContext.Provider>
      );
};

export const useContract = () => useContext(ContractContext);