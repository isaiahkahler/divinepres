/**
 * a program is the data for an entire presentation
 */
export interface Program {
  title: string;
  sections: Section<any>[];
}

export interface Section<T> {
  title: string;
  type: string;
  icon: "add" | "edit";
  data: T;
}

export interface Plain extends Section<Plain> {}

export interface Song extends Section<Song> {
    songnumber: string;
    songtitle: string;
    lyrics: string;
    backgroundUrl: string | undefined;
}

export interface Reading extends Section<Reading> {
    readingtitle: string;
    content: any;
    page: string;
}

export interface Cover extends Section<Cover>{
  backgroundURL: string | undefined;
  covertitle: string;
  subtitle?: string;
}

