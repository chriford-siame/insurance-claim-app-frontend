import React from 'react'
import { useParams } from 'react-router-dom';
import useClaim from 'src/hooks/Claim';

interface IParams {
    id: string;
}

function ClaimView() {
    const { id } = useParams<IParams['id']>();
    // const { claim } = useClaim(id);
    return (
        <div>View {id}</div>
    )
}

export default ClaimView;