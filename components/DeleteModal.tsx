"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useToast } from "./ui/use-toast";

export function DeleteModal() {
  const { user } = useUser();

  const { toast } = useToast();

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);

  console.log("from the modal", isDeleteModalOpen);

  const deleteFile = () => {
    if (!user || !fileId) return;
    const fileRef = ref(storage, `users/${user.id}/file/${fileId}`);
    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, "users", user.id, "file", fileId)).then(() => {
            console.log("filedeleted");
          });
        })
        .finally(() => {
          toast({
            variant: "destructive",
            title: "File Deleted!",
          });
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isopen) => {
        setIsDeleteModalOpen(isopen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. this will permanently delete the file
            !
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1 border-2"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="  font-bold">Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
            variant={"destructive"}
          >
            <span className=" font-bold">Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
