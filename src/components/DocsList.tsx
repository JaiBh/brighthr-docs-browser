import { Doc, Folder as FolderType } from "@/lib/types";
import { cn, folderLastUpdated } from "@/lib/utils";
import { ArrowLeft, File, Folder } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { SetStateAction, Dispatch, useState } from "react";
import { Button } from "./ui/button";

interface Props {
  docs: Doc[];
  setDocs: Dispatch<SetStateAction<Doc[]>>;
  stack: Doc[][];
  setStack: Dispatch<SetStateAction<Doc[][]>>;
}

function DocsList({ docs, setDocs, stack, setStack }: Props) {
  const openFolder = (folder: FolderType) => {
    setStack((prev) => [...prev, docs]);
    setDocs(folder.files ?? []);
  };
  const goBack = () => {
    setStack((prev) => {
      const last = prev[prev.length - 1];
      const newStack = prev.slice(0, -1);
      setDocs(last);
      return newStack;
    });
  };

  return (
    <>
      <Button disabled={stack.length < 1} className="mt-8" onClick={goBack}>
        <ArrowLeft></ArrowLeft>
      </Button>
      {docs.length < 1 ? (
        <h3 className="text-center text-muted-foreground my-4">
          No Documents Found
        </h3>
      ) : (
        <ScrollArea>
          <table className="w-full">
            <thead>
              <tr>
                <th scope="col" className="font-semibold py-5">
                  Type
                </th>
                <th scope="col" align="left" className="font-semibold py-5">
                  Name
                </th>
                <th scope="col" className="font-semibold py-5">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => {
                return (
                  <tr
                    key={doc.id}
                    className={cn(
                      "border-t",
                      doc.type === "folder" &&
                        "cursor-pointer transition-colors hover:bg-primary/7"
                    )}
                    onClick={() => {
                      if (doc.type === "folder") {
                        openFolder(doc);
                      }
                    }}
                  >
                    <th
                      scope="row"
                      align="center"
                      className="py-5 min-w-[80px]"
                    >
                      {doc.type === "folder" && (
                        <Folder className="text-primary bg-primary/20 size-9 p-2 rounded-md"></Folder>
                      )}
                      {doc.type === "pdf" && (
                        <File className="text-primary size-9 p-2 rounded-md bg-primary/5"></File>
                      )}
                      {doc.type === "csv" && (
                        <File className="text-green-500 size-9 p-2 rounded-md bg-primary/5"></File>
                      )}
                      {doc.type === "doc" && (
                        <File className="text-red-500 size-9 p-2 rounded-md bg-primary/5"></File>
                      )}
                      {doc.type === "mov" && (
                        <File className="text-purple-500 size-9 p-2 rounded-md bg-primary/5"></File>
                      )}
                    </th>
                    <td
                      className={cn(
                        "py-4 font-semibold min-w-[200px] max-w-[250px] truncate",
                        doc.type === "folder" && "text-primary"
                      )}
                    >
                      {doc.name}
                    </td>
                    <td align="center" className="py-5 min-w-[120px]">
                      <time
                        dateTime={
                          doc.type === "folder"
                            ? `${folderLastUpdated(doc)}`
                            : doc.updatedAt
                        }
                      >
                        {(doc.type === "folder"
                          ? `${folderLastUpdated(doc)}`
                          : doc.updatedAt
                        ).replace(/-/g, "/")}
                      </time>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ScrollBar orientation="horizontal"></ScrollBar>
        </ScrollArea>
      )}
    </>
  );
}
export default DocsList;
