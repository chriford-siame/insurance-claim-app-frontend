import React from 'react'
import { useParams } from 'react-router-dom';
import useClaim from 'src/hooks/Claim';

function ClaimView() {
    const { id } = useParams();
    const { claim } = useClaim(id);

    return (
        <div className='pt-5 text-black'>
            <div className='border rounded-md p-3 my-3 px-4 grid md:grid-cols-3 lg:grid-cols-3'>
                <div className='flex justify-start '>
                    <div className='text-center'>
                        <p className='text-gray-500 font-semibold text-[12pt]'>Insurance</p>
                        <p className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.claim_type}</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='text-center'>
                        <p className='text-gray-500 font-semibold text-[12pt]'>Date Issued</p>
                        <p className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.date_issued}</p>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='text-center'>
                        <p className='text-gray-500 font-semibold text-[12pt]'>Attachments</p>
                        <p className='text-gray-400 font-semibold text-[10pt] -mt-2'>1</p>
                    </div>
                </div>
            </div>

            <div className='my-3 grid md:grid-cols-2 lg:grid-cols-2 gap-2'>
                <div className='border rounded-md p-3'>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>username</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.user.username}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>fullnames</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.first_name} {claim?.middle_name} {claim?.user.last_name}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>contact</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.phone_number}</div>
                    </div>
                </div>
                <div className='border rounded-md p-3'>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>ID</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.id}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>status</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.status == 'reviewed' ? 'Under review' : claim?.status}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>NRC</div>
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.nrc}</div>
                    </div>
                </div>
            </div>

            <div className='border rounded-md p-3 my-3 px-4'>
                <p className='text-gray-600 font-semibold text-[12pt]'>Case</p>
                <p className='text-gray-500 text-[12pt]'>{claim?.incident}</p>
            </div>

            {claim?.comment ?
                <div className='border rounded-md p-3 my-3 px-4'>
                    <p className='text-gray-600 font-semibold text-[12pt]'>Review Comment</p>
                    <p className='text-gray-500 text-[12pt]'>{claim?.comment}</p>
                </div>
                : null
            }
        </div>
    )
}

export default ClaimView;