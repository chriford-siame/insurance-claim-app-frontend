import React from 'react'
import { useParams } from 'react-router-dom';

interface IParams {
    id: string;
}

function ClaimView() {
    const { id } = useParams<IParams['id']>();

    return (
        <div>View</div>
    )
}

export default ClaimView;