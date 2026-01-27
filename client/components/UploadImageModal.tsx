"use client";

import useUploadImage from "@/client/hooks/useUploadImage";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/client/shadcn/components/ui/dialog";
import Button from "@/client/components/Button";
import FileInput from "@/client/components/FileInput";
import TextInput from "@/client/components/TextInput";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  file: File | null;
};

type FormErrors = {
  name?: string;
  file?: string;
};

export default function UploadImageModal({ open, onClose }: Props) {
  const [values, setValues] = useState<FormValues>({ name: "", file: null });
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate, isPending } = useUploadImage();

  const __onClose = () => {
    onClose();
    setValues({ name: "", file: null });
    setErrors({});
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, name: e.target.value }));
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const onFileChange = (file: File | null) => {
    setValues((prev) => ({ ...prev, file }));
    setErrors((prev) => ({ ...prev, file: "" }));
  };

  const uploadImage = () => {
    if (!values.name) {
      setErrors((prev) => ({ ...prev, name: "Name cannot be empty." }));
      return;
    }

    if (!values.file) {
      setErrors((prev) => ({ ...prev, file: "Image cannot be empty." }));
      return;
    }

    mutate(
      { name: values.name, file: values.file },
      {
        onSuccess: () => {
          __onClose();
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
        }
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          __onClose();
        }
      }}
    >
      <DialogContent className="w-full max-w-lg overflow-hidden">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <TextInput
            name="name"
            label="Name"
            onChange={onNameChange}
            value={values.name}
            errorMessage={errors.name}
            placeholder="Enter the image name"
          />
          <FileInput
            name="file"
            label="Image"
            accept="image/png, image/jpg, image/jpeg"
            onChange={onFileChange}
            value={values.file}
            errorMessage={errors.file}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button label="Close" variant="secondary" onClick={__onClose} />
          <Button label="Upload" onClick={uploadImage} isLoading={isPending} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
