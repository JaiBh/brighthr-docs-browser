export type Doc = Folder | File;

export type Folder = {
  type: "folder";
  name: string;
  createdAt: string;
  files: File[];
};

export type File = {
  type: FileType;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type FileType = "pdf" | "doc" | "csv" | "mov";
