import React from 'react'
import { useNavigate } from 'react-router-dom';

function ClaimList() {
    const navigate = useNavigate();
    const nextPath = (claim: any) => {
        let nextPath = `/claim/${claim.id}/view/`;
        navigate(nextPath);
    }
    return (

        <div>
            <div className='flex justify-start'>
aaaaaaaaaaaaaa
            </div>
        </div>
    )
}

export default ClaimList