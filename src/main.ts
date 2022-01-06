import superagent from 'superagent';
import cheerio from 'cheerio';
const fs = require('fs');
import {Program, Crawler} from './crawler';

const programItems : Program[] = [];

const a = new Crawler("https://radioupdate.net/nhkr1/sukisase/20211223/");
