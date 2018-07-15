/**
 * a program is the data for an entire presentation
 */
export interface Program {
  title: string;
  sections: Section<any>[];
}

export interface Section<T> {
  title: string;
  icon: "add" | "edit";
  data: T;
}

export interface Plain extends Section<Plain> {
  type: "plain";
}

export interface Song extends Section<Song> {
    type: "song";
    songnumber: string;
    songtitle: string;
    lyrics: string;
    backgroundUrl: string | undefined;
}

export interface Reading extends Section<Reading> {
    type: "reading";
    readingtitle: string;
    content: any;
    page: string;
}

export interface Cover extends Section<Cover>{
  type: "cover";
  backgroundURL: string | undefined;
  covertitle: string;
  subtitle?: string;
}

