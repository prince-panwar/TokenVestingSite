"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import { useContract } from '../context/ContractContext';
export default function page() {

const [isSelected,setIsSelected] =useState<boolean>(false);
const[isSelectedClaim,setIsSelectedClaim] = useState<boolean>(false); 
const [isSelectedRegister,setIsSelectedRegister] = useState<boolean>(false);
const [orgAddress,setOrgAddress]=useState<string|undefined>();
const [message,setMessage]=useState<string>();
const [token,setToken]=useState<string>();
const [error,setError]=useState<string>();
const router = useRouter();
const contractInst = useContract()?.contractInstance;

const RegisterClaim=()=>{
    return(
        <div className="flex flex-col items-center text-center justify-center h-screen">
            <div className="w-full max-w-md p-6 border rounded border-blue-700">
              <h2 className="text-2xl mb-4">Register as a New Organization</h2>
              <button onClick={()=>{setIsSelectedRegister(true);setIsSelected(true)}} className="bg-blue-500  hover:bg-blue-700 text-white px-4 py-2 rounded mb-4">Click here to register</button>
      
              <h2 className="text-2xl mb-4">Claim Tokens</h2>
              <button  onClick={()=>{setIsSelectedClaim(true); setIsSelected(true)}}  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Click here to claim tokens</button>
            </div>
        </div>
        );
    }
    const Claim=()=>{
      
      const handleClaim=async()=>{
        if(orgAddress!=undefined){ 
          try{
          let tx = await contractInst?.claimTokens(orgAddress);
          await tx.wait();
          setMessage("Claim Successfull")
          }catch(e:any){
           setError(e.message);
          console.log(e);
          }
          }else{
            setError("Please enter a address");
          }
         
        }
     return(
        <div className="flex flex-col items-center justify-center h-screen">
      <div className=" w-full max-w-lg p-6  border rounded border-blue-700">
        <h2 className="text-2xl mb-4">Claim Tokens</h2>

        <div className="mb-4">
          <label htmlFor="orgAddress" className="block text-white">
            Enter Organisation Address
          </label>
          <input
            type="text"
            id="orgAddress"
            className="mt-1 text-black block w-full border rounded border-gray-300 px-3 py-2"
            value={orgAddress}
            onChange={(e) => setOrgAddress(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleClaim}
        >
          Claim
        </button>
        <button
                className="bg-orange-500 text-white px-4 py-2 rounded mb-4 ml-3"
                onClick={()=>{setIsSelectedClaim(false);setIsSelected(false);setError('')}}
              >
                Back
              </button>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{error}</p>}
      </div>
    </div>

     );
    }

    const Register=()=>{
        const handleRegister=async()=>{
          try{
            let tx = await contractInst?.registerOrganization(orgAddress,token);
            await tx.wait();
            router.push('/organisationDashboard');
          }catch(e:any){
            setError(e.message)
          }
         
              
        }
        return(
            <div className="flex flex-col items-center justify-center h-screen">
            <div className=" w-full max-w-lg p-6 border rounded border-blue-700">
              <h2 className="text-2xl mb-4">Register Organisation</h2>
      
              <div className="mb-4">
                <label htmlFor="orgAddress" className="block text-white">
                  Enter Organisation Address
                </label>
                <input
                  type="text"
                  id="orgAddress"
                  className="mt-1 text-black block w-full border rounded border-gray-300 px-3 py-2"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="orgAddress" className="block text-white">
                  Enter Token Address
                </label>
                <input
                  type="text"
                  id="token"
                  className="mt-1  text-black block w-full border rounded border-gray-300 px-3 py-2"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
      
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={handleRegister}
              >
                Register
              </button>
              
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded mb-4 ml-3"
                onClick={()=>{setIsSelectedRegister(false);setIsSelected(false);setError('')}}
              >
                Back
              </button>
      
              {error && <p className="text-red-500">{error}</p>}
              
            </div>
          </div>
        );
    }

    
  return (
   <>
   {/* show RegisterClaim if not selected anything */}
 {!isSelected&&(RegisterClaim())}
 {isSelectedClaim&&(Claim())}
 {isSelectedRegister&&(Register())}
   </>
  );
}
