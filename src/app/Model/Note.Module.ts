export interface Note {
    id: string;
    title: string;
    label: string;
    content: string;
    userId: string;
    createdAt:Date;
    updatedAt:Date;
    bgColor:string;
    fontColor:string;
    editMode?: boolean;
  }
  