export const dataDefault = [
  {
    id: 16,
    year: 1982,
    title: 'Inchon',
    studios: ['MGM'],
    producers: ['Mitsuharu Ishii'],
    winner: true,
  },
  {
    id: 17,
    year: 1982,
    title: 'Annie',
    studios: ['Columbia Pictures'],
    producers: ['Ray Stark'],
    winner: false,
  },
];
export const columnsDefault = [
  {
    name: 'ID',
    field: 'id',
    headerStyle: {
      textAlign: 'center',
      width: '100%',
      display: 'inline-grid',
      fontSize: '14px',
    },
    filter: false,
  },
  {
    name: 'Year',
    field: 'year',
    headerStyle: {
      textAlign: 'center',
      width: '100%',
      display: 'inline-grid',
      fontSize: '14px',
    },
    filter: true,
    filterType: 'number',
  },
  {
    name: 'Title',
    field: 'title',
    headerStyle: {
      textAlign: 'center',
      width: '100%',
      display: 'inline-grid',
      fontSize: '14px',
    },
    filter: false,
  },
  {
    name: 'Winner?',
    field: 'winner',
    headerStyle: {
      textAlign: 'center',
      width: '100%',
      display: 'inline-grid',
      fontSize: '14px',
    },
    filter: true,
    filterType: 'switch',
    filterSwitchPlaceholder: 'Yes/No',
    filterSwitchList: [
      {
        id: 1,
        label: 'Yes/No',
      },
      {
        id: 2,
        label: 'yes',
      },
      {
        id: 3,
        label: 'no',
      },
    ],
  },
];

export const comboField = {
  name: 'Winner?',
  field: 'winner',
  headerStyle: {
    textAlign: 'center',
    width: '100%',
    display: 'inline-grid',
    fontSize: '14px',
  },
  filter: true,
  filterType: 'combo',
  filterComboPlaceholder: 'Yes/No',
  filterComboList: [
    {
      id: 1,
      label: 'Yes/No',
    },
    {
      id: 2,
      label: 'yes',
    },
    {
      id: 3,
      label: 'no',
    },
  ],
};
