import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Doc, File, Folder } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const separateFoldersFiles = (docs: Doc[]) => {
  const folders: Folder[] = [];
  const files: File[] = [];

  docs.forEach((doc) => {
    if (doc.type === "folder") {
      folders.push(doc);
    } else {
      files.push(doc);
    }
  });

  return { folders, files };
};

export const folderLastUpdated = (folder: Folder) => {
  if (folder.files.length > 0) {
    const files = [...folder.files];

    const latestUpdatedFile = files.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    )[0];
    return latestUpdatedFile.updatedAt;
  } else {
    return folder.createdAt;
  }
};

export const sortDocs = (
  option: "a-z" | "z-a" | "latest-earliest" | "earliest-latest",
  docs: Doc[]
): Doc[] => {
  // sort by name
  if (option === "a-z" || option === "z-a") {
    const { folders, files } = separateFoldersFiles(docs);
    const newDocs = [
      ...folders.sort((a, b) =>
        option === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ),
      ...files.sort((a, b) =>
        option === "a-z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ),
    ];
    return newDocs;

    // sort by last updated
  } else {
    const { folders, files } = separateFoldersFiles(docs);
    folders.sort((a, b) => {
      if (option === "latest-earliest") {
        return (
          new Date(folderLastUpdated(a)).getTime() -
          new Date(folderLastUpdated(b)).getTime()
        );
      } else {
        return (
          new Date(folderLastUpdated(b)).getTime() -
          new Date(folderLastUpdated(a)).getTime()
        );
      }
    }),
      files.sort((a, b) => {
        if (option === "latest-earliest") {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        } else {
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        }
      });

    const newDocs = [...folders, ...files];
    return newDocs;
  }
};
