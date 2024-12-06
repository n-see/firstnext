'use client'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import React, { useState } from 'react'

interface CloudinaryResult {
    public_id:string;
}

const UploadPage = () => {

    const [publicId, setPublicId] = useState('')

  return (
    <>
    {publicId && <CldImage src={publicId} width={270} height={180} alt='box with cables'/>}
        <CldUploadWidget 
        onSuccess={(result,{widget}) => {
            if(result.event !== "success") return;
            const info = result.info as CloudinaryResult
            setPublicId(info.public_id)
        }}
        uploadPreset='hmmomz5r'>
            {({open}) => <button className='btn btn-primary' onClick={() => open()}>Upload</button>}
        </CldUploadWidget>
    </>
  )
}

export default UploadPage