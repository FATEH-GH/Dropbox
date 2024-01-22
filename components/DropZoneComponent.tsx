"use client";

import { db, storage } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";

import { useToast } from "./ui/use-toast";

const DropZoneComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };

      reader.readAsArrayBuffer(file);
    });
  };
  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);
    const docRef = await addDoc(collection(db, "users", user.id, "file"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });
    const imageRef = ref(storage, `users/${user.id}/file/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.id, "file", docRef.id), {
        downloadURL: downloadURL,
      });
    });
    toast({
      variant: "completed",
      title: "Uploaded successfully .",
    });
    setLoading(false);
  };

  const maxSIze = 20971520;
  return (
    <Dropzone onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFiletoolarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSIze;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={`w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center ${
                isDragActive
                  ? "bg-blue-400 text-white animate-pulse"
                  : " bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              }`}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Clich here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file "}
              {isDragReject && "File type not accepted, sorry!"}
              {isFiletoolarge && (
                <div className="text-danger mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};
export default DropZoneComponent;
