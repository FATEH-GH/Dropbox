"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

import { useToast } from "@/components/ui/use-toast";

export function RenameModal() {
  const [isRenameModalopen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalopen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  const { toast } = useToast();

  const { user } = useUser();
  const [input, setInput] = useState("");

  console.log("from the Rename", isRenameModalopen);

  const renameFile = async () => {
    if (!user || !fileId) return;
    setIsRenameModalOpen(true);

    await updateDoc(doc(db, "users", user.id, "file", fileId), {
      filename: input,
    });
    toast({
      title: "Filename updated",
    });
    setIsRenameModalOpen(false);
  };
  return (
    <Dialog
      open={isRenameModalopen}
      onOpenChange={(isopen) => {
        setIsRenameModalOpen(isopen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="  font-bold">Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className=" font-bold">Submit</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
