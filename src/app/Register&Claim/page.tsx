"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
export default function page() {

const [isSelected,setIsSelected] =useState<boolean>(false);
const[isSelectedClaim,setIsSelectedClaim] = useState<boolean>(false); 
const [isSelectedRegister,setIsSelectedRegister] = useState<boolean>(false);
const [orgAddress,setOrgAddress]=useState<string>();
const [token,setToken]=useState<string>();
const [error,setError]=useState<string>();
const router = useRouter();
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
      
        const handleClaim=()=>{
 
           setError("Vesting Period is not overed yet");
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
            className="mt-1 block w-full border rounded border-gray-300 px-3 py-2"
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
                onClick={()=>{setIsSelectedClaim(false);setIsSelected(false)}}
              >
                Back
              </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>

     );
    }

    const Register=()=>{
        const handleRegister=()=>{
              router.push('/OrganisationDashboard');
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
                  className="mt-1 block w-full border rounded border-gray-300 px-3 py-2"
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
                  className="mt-1 block w-full border rounded border-gray-300 px-3 py-2"
                  value={orgAddress}
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
                onClick={()=>{setIsSelectedRegister(false);setIsSelected(false)}}
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
