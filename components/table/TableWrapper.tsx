"use client";

import { FileProps } from "@/types";
import { Button } from "../ui/button";
import { DataTable } from "./table";
import { columns } from "./column";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Timestamp, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileProps[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileProps[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "file"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileProps[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().timestamp?.second * 1000) || undefined,
      fullName: doc.data().fullname,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));
    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col ">
        <Button className="ml-auto w-36 mb-5 h-10" variant={"outline"}>
          <Skeleton className="h-5 w-full" />
        </Button>
        <div className="border rounded-lg">
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex itmes-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto w-fit"
        variant={"outline"}
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "oldest"}
      </Button>

      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
