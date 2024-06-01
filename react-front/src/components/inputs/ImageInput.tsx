import React, { useState } from 'react'

function ImageInput() {
    const [file, setFile] = useState<File | undefined>();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement & {
            files: FileList;
        }

        setFile(target.files[0]);

        const file = new FileReader;

        file.onload = function () {
            setPreview(file.result);
        }

        file.readAsDataURL(target.files[0])
    }

    return (

        <div className="flex items-center justify-center aspect-square">
            <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-full border-2 ${preview ? 'border-gray-800' : 'border-gray-300 border-dashed'} rounded-lg cursor-pointer bg-transparent hover:bg-blue-gray-50`}
            >
                {!preview && (<div className="flex flex-col h-full aspect-square items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload image</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG</p>
                </div>
                )}
                {preview && (
                    <div className='max-h-full w-full h-full aspect-square'>

                        <img src={preview as string} alt="Upload preview" className='object-cover w-full h-full rounded-md' />
                    </div>
                )}
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/jpg, image/jpeg, image/png"
                    onChange={handleOnChange}
                />
            </label>
        </div >

    )
}

export default ImageInput