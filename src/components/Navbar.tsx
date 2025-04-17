import React from 'react'
import { useAuth } from 'src/hooks/useAuth';

function Navbar() {
  const { isAuthenticated, handleLogout } = useAuth();
  return (
    <div className='bg-blue-400 py-4 flex items-center justify-between px-3'>
      <a href="/" className='text-[18pt] font-bold text-white'><span className='text-orange-500'>I</span><span className='text-gray-200'>Claim</span><span className='text-purple-500'>.</span></a>

      {isAuthenticated ?
        <div className='flex  gap-1 text-[12pt]'>
          <a href="/login" className='text-white bg-gray-600 hover:bg-gray-600 px-2 rounded-md'>Login</a>
          <a href="/register" className='text-white bg-gray-600 hover:bg-gray-600 px-2 rounded-md'>Signup</a>
        </div>
        :
        <div className='text-[12pt]'>
          <button onClick={() => handleLogout()}  className='text-white bg-gray-600 hover:bg-gray-600 px-2 rounded-md'>logout</button>
        </div>
      }
    </div>
  )
}

export default Navbar;
