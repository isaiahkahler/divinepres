/**
 * a program is the data for an entire presentation
 */
// export interface Program {
//   title: string;
//   sections: Section<any>[];
// }

export interface Section<T> {
  title: string;
  icon: "add" | "edit" | "none";
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

//menu
/**
 * type - one of selected element types
 * value - the data or default value of the option
 * display - the user given label
 * special case: section label value = label
 */
export interface Option {
  type: "section label" | "input" | "textarea" | "dropdown";
  value: any;
  display: any;
}

