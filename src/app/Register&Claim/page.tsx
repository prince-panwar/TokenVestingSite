import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen">
      <div className="max-w-md p-4 border rounded border-blue-700">
        <h2 className="text-2xl mb-4">Register as a New Organization</h2>
        <button className="bg-blue-500  hover:bg-blue-700 text-white px-4 py-2 rounded mb-4">Click here to register</button>

        <h2 className="text-2xl mb-4">Claim Tokens</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Click here to claim tokens</button>
      </div>
    </div>
  );
}
