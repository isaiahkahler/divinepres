/**
 * a program is the data for an entire presentation
 */
// export interface Program {
//   title: string;
//   sections: Section<any>[];
// }

export interface Section<T> {
  title: string;
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
  type: 'section label' | 'input' | 'textarea' | 'dropdown' | 'htmlpreview' | 'none' | 'search';
  value: any; // string | HTML
  display: string;
  options?: Array<string>;
  dataname: string;
}

///UHHHhHhHhbH idk if ill use section label yet

export const SongMap: {
  title: Option;
  type: Option;
  songnumber: Option;
  songtitle: Option;
  lyrics: Option;
  backgroundURL: Option;
} = {
  title: { dataname: 'title', type: 'input', value: '', display: 'Event Title' },
  type: {
    dataname: 'type',
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  songnumber: {
    dataname: 'songnumber',
    type: 'search',
    value: '',
    display: 'Search for a Song - Song Number'
  },
  songtitle: { dataname: 'songtitle', type: 'input', value: '', display: 'Song Title' },
  lyrics: { dataname: 'lyrics', type: 'textarea', value: '', display: 'Lyrics' },
  backgroundURL: { dataname: 'backgroundURL', type: 'none', value: '', display: '' }
};

export const ReadingMap: {
  title: Option;
  type: Option;
  readingtitle: Option;
  content: Option;
  page: Option;
} = {
  title: { dataname: 'title', type: 'input', value: '', display: 'Event Title' },
  type: {
    dataname: 'type',
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  readingtitle: {
    dataname: 'readingtitle',
    type: 'search',
    value: '',
    display: 'Search for a Passage - Reading Title'
  },
  content: { dataname: 'content', type: 'htmlpreview', value: '', display: 'Passage Preview' },
  page: { dataname: 'page', type: 'input', value: '', display: 'Page Number' }
};

export const CoverMap: {
  title: Option;
  type: Option;
  backgroundURL: Option;
  covertitle: Option;
  subtitle: Option;
} = {
  title: { dataname: 'title', type: 'input', value: '', display: 'Event Title' },
  type: {
    dataname: 'type',
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  },
  backgroundURL: { dataname: 'backgroundURL', type: 'none', value: '', display: 'Background URL' },
  covertitle: { dataname: 'covertitle', type: 'input', value: '', display: 'Cover Title' },
  subtitle: { dataname: 'subtitle', type: 'input', value: '', display: 'Cover Subtitle' }
};

export const PlainMap: { title: Option, type: Option } = {
  title: { dataname: 'title', type: 'input', value: '', display: 'Event Title' },
  type: {
    dataname: 'type',
    type: 'dropdown',
    value: '',
    display: 'Event Type',
    options: ['plain', 'song', 'reading', 'cover']
  }
};
