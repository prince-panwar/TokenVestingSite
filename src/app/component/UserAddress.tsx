"use client"
import { useContract } from "../context/ContractContext";
export default function UserAddress() {
    const contract = useContract();
    const userAddress = contract?.currentUser;
  
    return (
      <div className="bg-transparent">
        
        <p className="text-sm text-blue-700">Your Address: {userAddress}</p>
      </div>
    );
  }