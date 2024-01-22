import DropZoneComponent from "@/components/DropZoneComponent";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = async () => {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "file"));
  const skeletonFiles: FileProps[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));
  console.log(skeletonFiles);
  return (
    <div>
      <DropZoneComponent />
      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
