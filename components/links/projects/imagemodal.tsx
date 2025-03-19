'use client'

import { Dialog, DialogPanel, DialogTitle, Description} from '@headlessui/react';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
interface ModalProps {
    imageData: {  title: string; githubUrl: string; description: string, url: string, photosCollection: { items: { url: string, thumbnail: string, title: string }[] }};
  }

function modal({ imageData }: ModalProps) {

    let [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <img className="cursor-pointer border border-black hover:opacity-70" src={imageData.photosCollection.items[0].url} alt={imageData.title} onClick={() => setIsOpen(true)} />
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-90">
                    <DialogPanel className="max-w-5xl space-y-4 border border-black bg-white p-[10px]">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div>
                            <img src={imageData.photosCollection.items[0].thumbnail} alt={imageData.title} className='border border-solid border-black' />
                        </div>
                        <div className="grid place-items-center">
                            <div>
                            <h3>{imageData.title}</h3>
                            <p className='text-xs'>{imageData.description}</p>
                            {imageData.githubUrl && <p className='text-xs'><span className='font-bold'>Github:</span> <Link href={imageData.githubUrl} title="github" className='text-xs hover:text-gray-500'>{imageData.githubUrl}</Link></p> }
                            <Link href={imageData.url} title="visit site" className='text-sm hover:text-gray-500 block'>Visit Site &gt;</Link>
                            </div>
                        </div>
                    </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    )
}
export default modal;
