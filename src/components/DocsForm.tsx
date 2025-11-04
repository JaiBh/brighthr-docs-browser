import { Doc } from "@/lib/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import { Button } from "./ui/button";
import { separateFoldersFiles, sortDocs } from "@/lib/utils";

interface Props {
  docs: Doc[];
  setDocs: Dispatch<SetStateAction<Doc[]>>;
  folderHistory: Doc[][];
}

function DocsForm({ docs, setDocs, folderHistory }: Props) {
  const [sortNameType, setSortNameType] = useState<"a-z" | "z-a">("a-z");
  const [sortDateType, setSortDateType] = useState<
    "latest-earliest" | "earliest-latest"
  >("earliest-latest");

  const fuse = useMemo(() => {
    return new Fuse(folderHistory[folderHistory.length - 1], {
      keys: ["name"],
      threshold: 0.4,
      // ignoreLocation: true,
    });
  }, [folderHistory]);

  const onChange = (name: string) => {
    const currentFolder = folderHistory[folderHistory.length - 1];

    if (!name) {
      const sortedDocs = sortDocs("a-z", currentFolder);
      setDocs(sortedDocs);
      return;
    }

    if (name.length === 1) {
      const newDocs = currentFolder.filter((doc) =>
        doc.name.toLowerCase().includes(name.toLowerCase())
      );

      const { folders, files } = separateFoldersFiles(newDocs);
      const sortedFolders = folders.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));
      setDocs([...sortedFolders, ...sortedFiles]);

      return;
    }
    const results = fuse.search(name);
    console.log(results);

    setDocs(results.map((r) => r.item));
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full">
        <Input
          placeholder="Filter by name..."
          className="pl-10 py-6 max-w-lg"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <Search className="absolute top-1/2 left-3 translate-y-[-50%] size-5 text-muted-foreground"></Search>
      </div>
      <div className="sm:flex max-sm:space-y-3 gap-3 items-center">
        <Button
          size={"lg"}
          className="max-sm:w-full"
          onClick={() => {
            const sortedDocs = sortDocs(
              sortNameType === "a-z" ? "z-a" : "a-z",
              docs
            );
            setDocs(sortedDocs);
            setSortNameType(sortNameType === "a-z" ? "z-a" : "a-z");
          }}
        >
          Sort By Name
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="max-sm:w-full"
          onClick={() => {
            const sortedDocs = sortDocs(
              sortDateType === "earliest-latest"
                ? "latest-earliest"
                : "earliest-latest",
              docs
            );

            setDocs(sortedDocs);
            setSortDateType(
              sortDateType === "earliest-latest"
                ? "latest-earliest"
                : "earliest-latest"
            );
          }}
        >
          Sort Last Updated
        </Button>
      </div>
    </div>
  );
}
export default DocsForm;
