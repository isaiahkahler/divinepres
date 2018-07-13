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
  data: T;
}

export interface Plain {}

export interface Song {
    number: string;
    title: string;
    lyrics: string;
    backgroundUrl: string | undefined;
}

// export interface Reading {
//     title: string;
//     passage: 
// }

