import axios from 'axios';
import React, { useState } from 'react';

function ClaimCreation() {
    const [files, setFiles] = useState<FileList | null>(null);
    const [claimType, setClaimType] = useState<string | null>('');
    const [firstName, setFirstName] = useState<string | null>('');
    const [middleName, setMiddleName] = useState<string | null>('');
    const [lastName, setLastName] = useState<string | null>('');
    const [incident, setIncident] = useState<string | null>('');
    const [nrc, setNRC] = useState<number>(0);
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    };
    const handleClaimTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setClaimType(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMiddleName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleNRCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNRC(parseInt(e.target.value));
    };

    const handleIncidentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIncident(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0) return;

        const formData = new FormData();

        formData.append('first_name', firstName || '');
        formData.append('middle_name', middleName || '');
        formData.append('last_name', lastName || '');
        formData.append('claim_type', claimType || '');
        formData.append('nrc', nrc.toString());
        formData.append('incident', incident || '');
        formData.append('phone_number', phoneNumber || '');

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]); // Or 'files[]' depending on backend
        }

        try {
            const token = localStorage.getItem('access_token'); // Store token on login
            const res = await axios.post(
                'http://localhost:8000/claims/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Upload successful:', res.data);
        } catch (err) {
            console.error('Upload failed:', err);
        }
    }


    return (
        <div className="flex justify-center">
            <div className=" md:w-[75%] lg:md:w-[75%] xl:md:w-[75%] text-2xl">
                <div className="flex justify-center my-2 w-full">
                    <p className="text-black-500 font-bold">Claim Creation Form</p>
                </div>
                <form onSubmit={handleSubmit} className='grid container gap-2 text-[12pt]'>
                    <input
                        name='nrc'
                        placeholder='Enter your ID number without slashes'
                        type="number"
                        className='border border-gray-300 p-2'
                        onChange={handleNRCChange}
                        required={true}
                        maxLength={5} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                        <input
                            name='firstName'
                            placeholder='Enter first name'
                            type="text"
                            className='border border-gray-300 p-2'
                            onChange={handleFirstNameChange}
                            required={true}
                        />
                        <input
                            name='lastName'
                            placeholder='Enter last name'
                            type="text"
                            className='border border-gray-300 p-2'
                            onChange={handleLastNameChange}
                            required={true}
                        />
                    </div>
                    <input
                        name='middleName'
                        placeholder='Enter middle name (optional)'
                        type="text"
                        className='border border-gray-300 p-2'
                        onChange={handleMiddleNameChange}
                        required={true}
                    />
                    <input
                        name='phonenumber'
                        placeholder='Enter your phone number'
                        type="number"
                        className='border border-gray-300 p-2'
                        onChange={handlePhoneNumberChange}
                        required={true}
                    />
                    <hr />
                    <label htmlFor="claimType">Claim Type</label>
                    <select name="claimType" id="claimType" className='border border-gray-300 p-2' onChange={handleClaimTypeChange} value={claimType || ''}>
                        <option defaultValue="motor">Motor Insurance</option>
                        <option value="medical">Medical Insurance</option>
                        <option value="property">Property Insurance</option>
                        <option value="life">Life Insurance</option>
                        <option value="travel">Travel Insurance</option>
                        <option value="agriculture">Agricultural Insurance</option>
                        <option value="workmen">Workmen’s Compensation</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        className='border border-gray-300 p-2 cur'
                        type="file"
                        name="files"
                        accept="image/*,application/pdf"
                        multiple
                        onChange={handleFileChange}
                    />
                    <sup className='text-gray-600 mt-2 ml-2'>Note: you can only upload photos and pdf documents</sup>
                    <textarea name="incident" onChange={handleIncidentChange} className='border border-gray-300 p-2' placeholder='Enter incident description here'></textarea>
                    <button type="submit" className='text-white bg-blue-600 p-2 w-full'>submit</button>
                </form>
            </div>
        </div>
    );
}

export default ClaimCreation;
