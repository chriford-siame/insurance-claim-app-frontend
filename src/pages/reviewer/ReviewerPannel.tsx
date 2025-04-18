import React from 'react'
import { useNavigate } from 'react-router-dom';
import useClaims from 'src/hooks/Claims';
import { IClaim } from 'src/interfaces/claim';
import { textShortener } from 'src/lib/utils';

function ReviewerPannel() {
  const navigate = useNavigate();

  const claimViewPath = (id: any) => {
    let path = `/claim/${id}/view`;
    navigate(path);
  }

  const { claims } = useClaims();

  return (
    <div className='pb-16'>
      <div className='border-b pb-1'>
        
        <div className="flex justify-between my-2 w-full">
          <div>
            <p className="text-gray-600 font-bold">Admin Pannel</p>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className='mt-4 w-auto grid lg:grid-cols-2 md:grid-cols-2 gap-2'>
        {claims.map((claim: IClaim) => {
          return (
            <div key={claim.id} className='border shadow-md p-2 text-[12pt]'>
              <div className='flex justify-between'>
                <p className='text-gray-700'>{claim.date_issued}</p>
                <p className='text-gray-700 font-semibold'>{claim.claim_type} insurance</p>
                <p className='text-gray-700'>{claim.status}</p>
              </div>
              <p className='text-gray-700'>{textShortener(claim.incident, 200)}</p>
              <div className="flex justify-center">
                <a onClick={() => alert((claim.id))} className="text-blue-400 text-[12pt] rounded-md  px-2 flex justify-center gap-1 cursor-pointer"><span> </span> <p>view claim</p></a>
              </div>
            </div>
          );
        })
        }
      </div>
    </div>
  )
}

export default ReviewerPannel