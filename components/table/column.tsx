"use client";

import { COLOR_EXTTENSION_MAP } from "@/constants";
import { FileProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";

export const columns: ColumnDef<FileProps>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTTENSION_MAP[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "filename",
    header: "Filename",
  },

  {
    accessorKey: "timestamp",
    header: "Date added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline  text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
];
