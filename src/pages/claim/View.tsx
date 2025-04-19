import React from 'react'
import { useParams } from 'react-router-dom';
import useClaim from 'src/hooks/Claim';

function ClaimView() {
    const { id } = useParams();
    const { claim } = useClaim(id);
    return (
        <div>View {id}</div>
    )
}

export default ClaimView;