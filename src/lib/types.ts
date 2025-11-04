export type Doc = Folder | File;

export type Folder = {
  id: string;
  type: "folder";
  name: string;
  createdAt: string;
  files: Doc[];
};

export type File = {
  id: string;
  type: FileType;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FileType = "pdf" | "doc" | "csv" | "mov";
