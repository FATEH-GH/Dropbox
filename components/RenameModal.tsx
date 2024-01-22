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

export function RenameModal() {
  const [isRenameModalopen, setIsRenameModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isRenameModalopen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.setFileId,
    ]);

  console.log("from the modal");

  const deleteFile = () => {};
  return (
    <Dialog
      open={isRenameModalopen}
      onOpenChange={() => {
        setIsRenameModalOpen(!isRenameModalopen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to rename?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. this will permanently delete the file
            !
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(true)}
          >
            <span className="  font-bold">Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className=" font-bold">Delete</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
