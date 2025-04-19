import React from 'react'
import { useParams } from 'react-router-dom';
import useClaim from 'src/hooks/Claim';

function ClaimReView() {
    const { id } = useParams();
    const { claim } = useClaim(id);
    return (
        <div>Review {id}</div>
    )
}

export default ClaimReView;