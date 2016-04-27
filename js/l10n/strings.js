'use strict';

import LocalizedStrings from 'react-native-localization';
let strings = new LocalizedStrings({
  en: {
    today: 'Today',
    pastYear: 'Past Year',
    todayis: 'Today is ',
  },
  zh: {
    today: '今天',
    pastYear: '過去一年',
    todayis: '今天是 ',
  },
});

module.exports = strings;
