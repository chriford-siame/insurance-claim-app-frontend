import { Eye, Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { textShortener } from 'src/lib/utils';

function ClaimList() {
    const navigate = useNavigate();
    const claimFormPath = () => {
        let path = `/claim/add/`;
        navigate(path);
    }

    const claimViewPath = (claim: any) => {
        let path = `/claim/${claim.id}/view`;
        navigate(path);
    }

    const claims = [
        {
            id: 1,
            claimType: 'Motor Insurance Claims',
            firstName: 'John',
            middleName: '',
            lastName: 'Doe',
            incident: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            nrc: '123452423',
            PhoneNumber: '0974000004',
            files: [1, 2, 3],
            dateIssued: '01/02/25',
            status: 'Approved',
        },
        {
            id: 2,
            claimType: 'Motor Insurance Claims',
            firstName: 'James',
            middleName: '',
            lastName: 'Doe',
            incident: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            nrc: '123452423',
            PhoneNumber: '0974000004',
            files: [1, 2, 3],
            dateIssued: '01/02/25',
            status: 'Approved',
        },
        {
            id: 3,
            claimType: 'Motor Insurance Claims',
            firstName: 'Annabel',
            middleName: '',
            lastName: 'Tembo',
            incident: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            nrc: '123452423',
            PhoneNumber: '0974000004',
            files: [1, 2, 3],
            dateIssued: '01/02/25',
            status: 'Approved',
        },
        {
            id: 4,
            claimType: 'Motor Insurance Claims',
            firstName: 'Annabel',
            middleName: '',
            lastName: 'Tembo',
            incident: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            nrc: '123452423',
            PhoneNumber: '0974000004',
            files: [1, 2, 3],
            dateIssued: '01/02/25',
            status: 'Approved',
        },
    ]
    return (
        <div className='pb-16'>
            <div className='border-b pb-5'>
                <div className="flex justify-between my-2 w-full">
                    <div>
                        <p className="text-black-500 font-bold">My Claims</p>
                    </div>
                    <div>
                        <button onClick={() => claimFormPath()} className="text-white text-[12pt] bg-green-500 rounded-md  px-2 flex justify-center"><span><Plus size={15} className='mt-2' /></span><p>Add claim</p></button>
                    </div>
                </div>
            </div>
            <div className='mt-4 w-auto grid lg:grid-cols-2 md:grid-cols-2 gap-2'>
                {claims.map((claim: any) => {
                    return (
                        <div key={claim.id} className='border shadow-md p-2 text-[12pt]'>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>{claim.dateIssued}</p>
                                <p className='text-gray-700'>{claim.status}</p>
                            </div>
                            <p className='text-gray-700'>{textShortener(claim.incident, 200)}</p>
                            <div className="flex justify-center">
                                <a onClick={() => claimViewPath(claim)} className="text-blue-400 text-[12pt] rounded-md  px-2 flex justify-center gap-1 cursor-pointer"><span><Eye size={15} className='mt-2' /> </span> <p>view claim</p></a>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
}

export default ClaimList