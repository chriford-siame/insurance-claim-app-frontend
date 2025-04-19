import axios from 'axios';
import { X } from 'lucide-react';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useClaim from 'src/hooks/Claim';

function ReView() {
    const [review, setReview] = useState({
        comment: '',
        status: '',
    });
    const [status, setStatus] = useState('');
    const { id } = useParams();
    const { claim } = useClaim(id);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview({ ...review, comment: e.target.value || '' })
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReview({ ...review, status: e.target.value || '' })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            await axios.patch(
                `http://localhost:8000/claims/${id}/`,
                review
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            localStorage.removeItem('status')
            window.location.href = '/';
        } catch (err) {
            console.log("An issue occured, contact support")
        }
    };

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('reviewed')
        const token = localStorage.getItem('access_token');
        try {
            await axios.patch(
                `http://localhost:8000/claims/${id}/`,
                { status: status }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            localStorage.setItem('status', 'true')
            // window.location.href = '/';
        } catch (err) {
            console.log("An issue occured, contact support")
        }
    }

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
                        <div className='text-gray-400 font-semibold text-[10pt] -mt-2'>{claim?.status}</div>
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
            <div className='border rounded-md p-3 my-3 px-4'>
                {localStorage.getItem('status') || status ?
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-between'>
                        <label htmlFor="status" className='text-gray-600 font-semibold text-[12pt]'>Action</label>
                        <button type='button' onClick={() => {
                            localStorage.removeItem("status");
                            setStatus('')
                            }} className=' border rounded-full flex justify-center items-center h-[25px] w-[25px] '><X size={18} color='red'/></button>
                        </div>
                        <select name="status" required={true} id="status" className='border border-gray-300 p-2 mb-2 w-full text-[12pt]' onChange={handleStatusChange} value={review.status}>
                            <option value=""></option>
                            <option value="approved">Approve</option>
                            <option value="rejected">Decline</option>
                        </select>
                        <textarea onChange={handleCommentChange} className='w-full border text-[11pt] p-2 text-gray-600' name="comment" id="" placeholder='Additional comment'></textarea>
                        <button type="submit" className='text-white rounded-md bg-green-600 p-0 py-1 w-full text-[12pt]'>Submit</button>

                    </form>
                    :
                    <form onSubmit={handleInitialSubmit}>
                        <button type="submit" className='text-white rounded-md bg-blue-600 p-0 py-1 w-full text-[12pt]'>Initiate Reviewing Process</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default ReView;