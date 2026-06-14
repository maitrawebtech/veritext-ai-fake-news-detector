import { KaggleDatasetInfo } from '../types';

export const KAGGLE_DATASETS: KaggleDatasetInfo[] = [
  {
    name: 'ISOT Fake News Dataset (Kaggle Standard)',
    kaggleLink: 'https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset',
    description: 'A benchmark academic dataset containing over 44,000 articles collected from Reuters (Real) and various flagged partisan and sensational news websites (Fake) between 2016 and 2017.',
    totalRecords: 44898,
    realCount: 21417,
    fakeCount: 23481,
    vocabSize: 124500,
    avgWordsPerArticle: 412,
    keyCharacteristics: [
      'Binary classification benchmark (Real vs. Fake)',
      'Clean separation in publication sources (Reuters vs specific unreliable domains)',
      'Contains robust full-text bodies and headline metadata',
      'Excellent for training TF-IDF and transformer baseline classifiers'
    ],
    sampleRecords: [
      {
        title: 'U.S. General Council Advises Diplomatic Restraint in South China Sea',
        textExcerpt: 'WASHINGTON (Reuters) - The United States State Department on Thursday issued a formal advisory urging regional allies to pursue multilateral negotiations regarding maritime trade routes...',
        label: 'Real',
        domain: 'Reuters',
        date: 'October 12, 2017'
      },
      {
        title: 'BREAKING: Top Official Caught on Camera Admitting Election Fraud!!',
        textExcerpt: 'You will not believe what just leaked out of the capital today! A highly secret whistle-blower video proves that the entire voting database was wiped by corrupt insiders...',
        label: 'Fake',
        domain: 'PatriotEagleNews',
        date: 'November 3, 2016'
      },
      {
        title: 'Federal Reserve Announces Planned Interest Rate Hike for Q3',
        textExcerpt: 'NEW YORK (Reuters) - Federal Reserve Chair Jerome Powell indicated that the central bank remains committed to gradually tightening monetary policy amidst stabilizing employment numbers...',
        label: 'Real',
        domain: 'Reuters',
        date: 'August 19, 2017'
      },
      {
        title: 'SHOCKING: Miracle Plant Extract Completely Destroys Flu Virus in 24 Hours',
        textExcerpt: 'Big Pharma is absolutely terrified of this newly rediscovered ancient Amazonian root! Doctors are being banned from prescribing this 100% organic remedy that cures respiratory illness...',
        label: 'Fake',
        domain: 'NaturalHealthAwakening',
        date: 'January 15, 2017'
      },
      {
        title: 'Tech Giants Agree to New European Union Privacy Standards',
        textExcerpt: 'BRUSSELS (Reuters) - Representatives from leading technology conglomerates signed a joint memorandum conforming to the General Data Protection Regulation framework on Wednesday...',
        label: 'Real',
        domain: 'Reuters',
        date: 'March 22, 2017'
      }
    ],
    topRealKeywords: [
      { word: 'reuters', count: 21200 },
      { word: 'washington', count: 18450 },
      { word: 'president', count: 16120 },
      { word: 'state', count: 14890 },
      { word: 'government', count: 12900 },
      { word: 'said', count: 11840 },
      { word: 'house', count: 10560 },
      { word: 'official', count: 9810 }
    ],
    topFakeKeywords: [
      { word: 'breaking', count: 19430 },
      { word: 'video', count: 17210 },
      { word: 'watch', count: 15400 },
      { word: 'shocking', count: 14200 },
      { word: 'hillary', count: 13900 },
      { word: 'obama', count: 12500 },
      { word: 'media', count: 11200 },
      { word: 'insane', count: 9100 }
    ]
  },
  {
    name: 'LIAR Dataset (PolitiFact Benchmark with Noisy Labels)',
    kaggleLink: 'https://www.kaggle.com/datasets/tsouple/liar-dataset',
    description: 'A challenging, highly nuanced dataset of 12,800 short political statements collected from PolitiFact. Highlights the difficulty of human judgment and multi-class noisy labels.',
    totalRecords: 12836,
    realCount: 6520, // Sum of True and Mostly True
    fakeCount: 6316, // Sum of False, Barely True, Pants on Fire
    vocabSize: 38200,
    avgWordsPerArticle: 24, // Mostly short quotes/headlines
    keyCharacteristics: [
      '6-way fine-grained truth scale (Pants on Fire, False, Barely True, Half-True, Mostly True, True)',
      'Highly subjective statements requiring intense domain context and external factual grounding',
      'Demonstrates the limit of text-only NLP when claims require external knowledge graphs',
      'Includes speaker metadata, party affiliation, and historical track records'
    ],
    sampleRecords: [
      {
        title: 'State funding for local public schools has declined by 12% over the last four legislative sessions.',
        textExcerpt: 'Statement made during the gubernatorial debate in Austin, Texas, addressing state education budgeting.',
        label: 'Real',
        domain: 'PolitiFact Archive',
        date: 'September 14, 2016'
      },
      {
        title: 'The new healthcare bill will legally mandate that all citizens implant microchips to access insurance.',
        textExcerpt: 'Viral meme circulating on social media networks and syndicated radio broadcasts.',
        label: 'Fake',
        domain: 'PolitiFact Archive',
        date: 'February 10, 2017'
      },
      {
        title: 'Solar and wind energy industries currently employ more American workers than the coal mining sector.',
        textExcerpt: 'Speech delivered at the Annual Renewable Energy Summit in Denver, Colorado.',
        label: 'Real',
        domain: 'PolitiFact Archive',
        date: 'June 4, 2017'
      },
      {
        title: 'The average national gasoline price was under $1.50 per gallon exactly one year ago.',
        textExcerpt: 'Televised town hall interview with syndicated political commentators.',
        label: 'Fake',
        domain: 'PolitiFact Archive',
        date: 'May 11, 2017'
      }
    ],
    topRealKeywords: [
      { word: 'percent', count: 5420 },
      { word: 'budget', count: 4810 },
      { word: 'million', count: 4120 },
      { word: 'report', count: 3950 },
      { word: 'tax', count: 3600 },
      { word: 'years', count: 3410 },
      { word: 'rate', count: 3100 },
      { word: 'states', count: 2890 }
    ],
    topFakeKeywords: [
      { word: 'banned', count: 4920 },
      { word: 'illegal', count: 4710 },
      { word: 'secret', count: 4500 },
      { word: 'destroy', count: 4100 },
      { word: 'forcing', count: 3820 },
      { word: 'absolutely', count: 3500 },
      { word: 'confirms', count: 3200 },
      { word: 'voted', count: 2980 }
    ]
  }
];
