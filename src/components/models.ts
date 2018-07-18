/**
 * a program is the data for an entire presentation
 */
// export interface Program {
//   title: string;
//   sections: Section<any>[];
// }

export interface Section<T> {
  title: string;
  icon: 'add' | 'edit' | 'none';
}

export interface Plain extends Section<Plain> {
  type: 'plain';
}

export interface Song extends Section<Song> {
  type: 'song';
  songnumber: string;
  songtitle: string;
  lyrics: string;
  backgroundURL: string | undefined;
}

export interface Reading extends Section<Reading> {
  type: 'reading';
  readingtitle: string;
  content: any;
  page: string;
}

export interface Cover extends Section<Cover> {
  type: 'cover';
  backgroundURL: string | undefined;
  covertitle: string;
  subtitle: string;
}

//menu
/**
 * type - one of selected element types
 * value - the data or default value of the option
 * display - the user given label
 * special case: section label value = label
 */
export interface Option {
  type: 'section label' | 'input' | 'textarea' | 'dropdown' | 'htmlpreview' | 'none';
  value: any; // string | HTML
  display: string;
  options?: Array<string>;
}

///UHHHhHhHhbH idk if ill use section label yet

export const SongMap: {
  title: Option;
  icon: Option;
  type: Option;
  songnumber: Option;
  songtitle: Option;
  lyrics: Option;
  backgroundURL: Option;
} = {
  title: { type: 'input', value: '', display: 'Event Title' },
  icon: { type: 'none', value: '', display: '' },
  type: {
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  songnumber: { type: 'input', value: '', display: 'Song Number' },
  songtitle: { type: 'input', value: '', display: 'Song Title' },
  lyrics: { type: 'textarea', value: '', display: 'Lyrics' },
  backgroundURL: { type: 'none', value: '', display: '' }
};

export const ReadingMap: {
  title: Option;
  icon: Option;
  type: Option;
  readingtitle: Option;
  content: Option;
  page: Option;
} = {
  title: { type: 'input', value: '', display: 'Event Title' },
  icon: { type: 'none', value: '', display: '' },
  type: {
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  readingtitle: { type: 'input', value: '', display: 'Reading Title' },
  content: { type: 'htmlpreview', value: '', display: 'Passage' },
  page: { type: 'input', value: '', display: 'Page Number' }
};

export const CoverMap: {
  title: Option;
  icon: Option;
  type: Option;
  backgroundURL: Option;
  covertitle: Option;
  subtitle: Option;
} = {
  title: { type: 'input', value: '', display: 'Event Title' },
  icon: { type: 'none', value: '', display: '' },
  type: {
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  backgroundURL: { type: 'none', value: '', display: 'Background URL' },
  covertitle: { type: 'input', value: '', display: 'Cover Title' },
  subtitle: { type: 'input', value: '', display: 'Cover Subtitle' }
};

export const PlainMap: { title: Option; icon: Option; type: Option } = {
  title: { type: 'input', value: '', display: 'Event Title' },
  icon: { type: 'none', value: '', display: '' },
  type: {
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  }
};
