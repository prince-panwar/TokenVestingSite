import React, { createContext,useEffect, useContext, useState } from 'react';
import { ethers ,BrowserProvider,Eip1193Provider,Contract} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import ContractAbi from "../../../hardhat/artifacts/contracts/Vesting.sol/TokenVesting.json";
const ContractContext = createContext();
export const ContractProvider = ({ children }) => {
    const [provider,setProvider] = useState<BrowserProvider|undefined>();
    
    
    return (
        <ContractContext.Provider value={{ contract, connectWallet }}>
          {children}
        </ContractContext.Provider>
      );
}