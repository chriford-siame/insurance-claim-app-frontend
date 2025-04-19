import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { IClaim } from 'src/interfaces/claim';
import axios from 'axios';

function ClaimCreation() {
    const [files, setFiles] = useState<FileList | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Omit<IClaim, 'id' | 'date_issued' | 'status'>>({
        first_name: '',
        middle_name: '',
        last_name: '',
        claim_type: 'motor',
        nrc: '',
        incident: '',
        phone_number: '',
        comment: ''
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files);
        }
    };
    const handleClaimTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({ ...data, claim_type: e.target.value || '' })
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, first_name: e.target.value || '' })
    };

    const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, middle_name: e.target.value || '' })
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, last_name: e.target.value || '' })
    };

    const handleNRCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, nrc: e.target.value.toString() })
    };

    const handleIncidentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, incident: e.target.value || '' })
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, phone_number: e.target.value || '' })
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        const token = localStorage.getItem('access_token');

        const form = new FormData();

        form.append("first_name", data.first_name);
        form.append("middle_name", data.middle_name);
        form.append("last_name", data.last_name);
        form.append("claim_type", data.claim_type);
        form.append("nrc", data.nrc);
        form.append("incident", data.incident);
        form.append("phone_number", data.phone_number);

        for (let i = 0; i < files.length; i++) {
            form.append("files", files[i]);
        }
          
        try {
            await axios.post(
                "http://localhost:8000/claims/",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            window.location.href = "/";
        } catch (err) {
            setIsLoading(false)
            console.error(err);
        }
        // async function incidentIsValid() {
        //     const client = new OpenAI({
        //         apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        //         dangerouslyAllowBrowser: true
        //     });
        //     const response = await client.responses.create({
        //         model: "gpt-4.1",
        //         input: `Is the following insurance claim incident valid or not, just return either true or false "${data.incident}"`,
        //     });
        //     if (response.output_text.toLowerCase() == 'false') alert('incident not valid')
        //     else {
        //         setFormIsFilled(true)
        //     }
        // }
        // incidentIsValid()
    };

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
                    <select name="claimType" id="claimType" className='border border-gray-300 p-2' onChange={handleClaimTypeChange} value={data.claim_type}>
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
                    <button type="submit" disabled={isLoading} className={`text-white rounded-sm ${isLoading ? 'bg-gray-600 cursor-progress' : 'bg-blue-600'} p-2 w-full`}>submit</button>
                </form>
            </div>
        </div>
    );
}

export default ClaimCreation;
