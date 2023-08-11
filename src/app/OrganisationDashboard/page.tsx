"use client"
import React, { useState} from 'react'
import { useContract } from '../context/ContractContext';
import DatePicker from 'react-datepicker';
export default function page(){
  const[isLockToken,setIsLockToken]=useState<boolean>(false);
  const[isVestingPeriod,setVestingPeriod]=useState<boolean>(false);
  const[isAddStakeholder,setIsAddStakeholder]=useState<boolean>(false);
  const [error,setError]=useState<string>();
  const[lockToken,setLockToken]=useState<string>();
  const[StakeholderAddress,setStakeholderAddres]=useState<string>();
  const[amount,setAmount]=useState<string>();
  const [message,setMessage]=useState<string>();
  const [startDate,setStartDate]=useState<Date>();
  const [endDate,setEndDate]=useState<Date>();
  const contractInst = useContract()?.contractInstance;


  const header =()=>{
    return( <div className="flex justify-center items-center bg-transparent p-4">
    <div className="text-white">
      
      <div className="flex mt-2 space-x-12">
        <button  onClick={()=>{setIsLockToken(true),setVestingPeriod(false),setIsAddStakeholder(false);setError('')}}className=" bg-transparent border border-blue-700 rounded px-3 py-1  text-sm transition hover:bg-white hover:text-blue-500">Lock Tokens</button>
        <button onClick={()=>{setVestingPeriod(true),setIsLockToken(false),setIsAddStakeholder(false);setError('')}} className="bg-transparent border border-blue-700 rounded px-3 py-1   text-sm transition hover:bg-white hover:text-blue-500">Vesting Period</button>
        <button  onClick={()=>{setIsAddStakeholder(true),setVestingPeriod(false),setIsLockToken(false);setError('')}}className="bg-transparent border border-blue-700 rounded px-3 py-1  text-sm transition hover:bg-white hover:text-blue-500">Add Stakeholders</button>
      </div>
   
    </div>
  </div>);
  }

  const LockToken=()=>{
   const handleLock=async()=>{
    try{ let tx =await contractInst?.lockTokens(lockToken);
      await tx.wait();
      setMessage("Token Locked");
    }catch(e:any){
      setError(e.message);
    }
   
   }
    return( 
    <div className="flex flex-col items-center justify-center h-screen">
     <div className="text-red-500 text-center mb-4">
  <p>
    <em>Please approve sufficient Tokens for the below address before Locking them.</em>
    <br />
    <em>contract address: 0x377776f3954b8CF802b0fE4dA745De274B7ff724</em>
  </p>
</div> 
       
    <div className=" w-full max-w-lg p-6  border rounded border-blue-700">
      <h2 className="text-2xl mb-4">LockTokens</h2>

      <div className="mb-4">
        <label  className="block text-white">
          Enter Amount of Tokens
        </label>
        <input
          type="text"
          
          className="mt-1 text-black block w-full border rounded border-gray-300 px-3 py-2"
          value={lockToken}
          onChange={(e) => setLockToken(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleLock}
      >
        Lock
      </button>
      <button
              className="bg-orange-500 text-white px-4 py-2 rounded mb-4 ml-3"
              onClick={()=>{setIsLockToken(false);;setError('')}}
            >
              Back
            </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{error}</p>}
    </div>
  </div>);
  }



  const vesting=()=>{
    const handleStartDateChange = (date:Date) => {
    
      setStartDate(date);
    };
  
    const handleEndDateChange = (date:Date) => {
      setEndDate(date);
    };
    const handleVesting=async()=>{
      try{
        const unixStDate= startDate?Math.floor(startDate.getTime() / 1000):null;
        const unixEdDate=endDate?Math.floor(endDate.getTime() / 1000):null;
       if(unixEdDate!=null&&unixStDate!=null){
        let tx = await contractInst?.createVestingSchedule(unixStDate,unixEdDate,amount);
        await tx.wait();
        setMessage("Vesting schedule has been created");
      }else{
        setError("Date are null");
      }
      }catch(e:any){
        setError(e.message);
      }

    }
    return(
<div className="flex flex-col items-center justify-center h-screen">
   <div className=" w-full max-w-lg p-6  border rounded border-blue-700">
      <h2 className="text-2xl mb-4">Vesting Schedule</h2>

      <div className="mb-4">
        <label  className="block text-white">
          Start Date
        </label>
        <DatePicker selected={startDate} onChange={handleStartDateChange} />
      </div>
      <div className="mb-4">
        <label  className="block text-white">
          End Date
        </label>
        <DatePicker selected={startDate} onChange={()=>{handleEndDateChange}} />
      </div>
      <div className="mb-4">
        <label  className="block text-white">
          Amount
        </label>
        <input
          type="text"
          
          className="mt-1  text-black block w-full border rounded border-gray-300 px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleVesting}
      >
        Lock
      </button>
      <button
              className="bg-orange-500 text-white px-4 py-2 rounded mb-4 ml-3"
              onClick={()=>{setVestingPeriod(false);;setError('')}}
            >
              Back
            </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{error}</p>}
    </div>
  </div>
    );
  }



  const StakeholdersWhiteListing=()=>{
    const handleWhiteListing=async()=>{
     try{
   let tx = await contractInst?.whiteListStakeholders();
   await tx.wait();
   setMessage("Stakeholder WhiteListed");
     }catch(e:any){
      setError(e.message);
     }
    }
    return(
<div className="flex flex-col items-center justify-center h-screen">
   <div className=" w-full max-w-lg p-6  border rounded border-blue-700">
      <h2 className="text-2xl mb-4">WhiteList Stakeholders</h2>

      <div className="mb-4">
        <label  className="block text-white">
          Stakeholder address
        </label>
        <input
          type="text"
          
          className="mt-1 text-black block w-full border rounded border-gray-300 px-3 py-2"
          value={StakeholderAddress}
          onChange={(e) => setStakeholderAddres(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label  className="block text-white">
          Amount
        </label>
        <input
          type="text"
          
          className="mt-1 text-black block w-full border rounded border-gray-300 px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleWhiteListing}
      >
        Lock
      </button>
      <button
              className="bg-orange-500 text-white px-4 py-2 rounded mb-4 ml-3"
              onClick={()=>{setIsAddStakeholder(false);;setError('')}}
            >
              Back
            </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{error}</p>}
    </div>
  </div>
    );
  }


    return (
     <>
     {header()}
     {!isAddStakeholder&&!isLockToken&&!isVestingPeriod&&( <div className="flex flex-col items-center justify-center text-lg h-screen  text-center font-extralight text-size-lg"><h1>Welcome to the Dashboad you can lock tokens , schedule vesting period and add Stakeholders here</h1></div> )}
     {isLockToken&&(LockToken())}
     {isVestingPeriod&&(vesting())}
     {isAddStakeholder&&(StakeholdersWhiteListing())}
     </>
    
    );
  
}
