import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

type UseImageUploadReturn = {
  imgURL: string;
  progressPorcent: number;
  uploadImage: (file: File | null, callback: (url: string) => void) => void;
};

export const useImageUpload = (): UseImageUploadReturn => {
  const [imgURL, setImgURL] = useState<string>("");
  const [progressPorcent, setProgressPorcent] = useState<number>(0);

  const uploadImage = (file: File | null, callback: (url: string) => void): void => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPorcent(progress);
      },
      (error: Error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setImgURL(downloadURL);
          callback(downloadURL); // Chama o callback passando a URL da imagem
        });
      }
    );
  };

  return { imgURL, progressPorcent, uploadImage };
};
