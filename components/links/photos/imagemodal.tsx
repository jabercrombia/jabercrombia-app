'use client'

import { Dialog, DialogPanel} from '@headlessui/react';
import React, { useEffect, useState } from "react";
import { event } from "../../../lib/gtag";
interface ModalProps {
    imageData: { title: string; url: string; thumbnail: string };
  }

function modal({ imageData }: ModalProps) {

    const handleClick = () => {
        event({
          action: "button_click",
          category: "User Interaction",
          label: `${imageData?.title} Photo`,
          value: 1,
        });
      };

    let [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <img className="cursor-pointer border border-black" src={imageData.thumbnail} alt={imageData.title} onClick={() => setIsOpen(true)} />
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-90">
                    <DialogPanel className="max-w-5xl space-y-4 border border-black bg-white">
                        <img src={imageData.url} alt={imageData.title} />
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    )
}
export default modal;
