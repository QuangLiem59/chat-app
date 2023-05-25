"use client";

import Modal from "@/app/sharedComponents/modals/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[28rem] w-[32rem]">
        <Image
          className="object-contain"
          fill
          alt="Image"
          src={src}
          sizes="100%, 100%"
        />
        {/* <img className="object-contain w-full h-full" alt="Image" src={src} /> */}
      </div>
    </Modal>
  );
};

export default ImageModal;
