import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ClaimList() {
    const navigate = useNavigate();
    const nextPath = () => {
        let nextPath = `/claim/add/`;
        navigate(nextPath);
    }
    return (

        <div>
            <div className=''>
                <div className="flex justify-between my-2 w-full">
                    <div>
                        <p className="text-black-500 font-bold">My Claims</p>
                    </div>
                    <div>
                        <button onClick={() => nextPath()} className="text-white text-[12pt] bg-green-500 rounded-md  px-2 flex justify-center"><span><Plus size={15} className='mt-2'/></span><p>Add claim</p></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClaimList