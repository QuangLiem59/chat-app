"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../modals/Modal";
import Input from "../Input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Buttons";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleImageUpload = (data: any) => {
    setValue("image", data?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const handleUpdate: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);

    if (data.name === currentUser?.name && data.image === currentUser?.image) {
      setIsLoading(false);
      onClose();
      return;
    }

    axios
      .put("/api/settings", data)
      .then((data) => {
        router.refresh();
        onClose();
      })
      .catch((errors) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="space-y-12">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-base text-gray-900 text-bold">Profile</h2>
            <p className="mt-1 text-sm italic text-gray-700">
              Edit your information
            </p>
            <div className="flex flex-col pt-4 mt-4 border-t gap-y-8">
              <Input
                id="name"
                label="Name"
                disabled={isLoading}
                required
                register={register}
                errors={errors}
              />
              <div>
                <label className="block text-sm font-semibold text-gray-900">
                  Avatar
                </label>
                <div className="flex items-center mt-2 gap-x-1">
                  <Image
                    width={48}
                    height={48}
                    className="object-contain h-12 rounded-full"
                    src={image || currentUser?.image || "/images/avatar.png"}
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleImageUpload}
                    uploadPreset="p8xnjxd9"
                  >
                    <div className="ml-2 text-sm font-semibold text-gray-900">
                      Change
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-6 gap-x-6">
            <Button
              secondary
              disabled={isLoading}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Update
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
