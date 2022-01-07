import superagent from 'superagent';
import cheerio from 'cheerio';
const fs = require('fs');
const slog = require('single-line-log').stdout;  // 用于在同一行输出log，以实现进度条的功能
import {Program, Crawler} from './crawler';

const sukisaseCrawler = new Crawler();
const programItems : Program[] = [];
const contextUrls : string[] = [];


// 获取所有节目信息url
for(let page = 1; page <= 1; page++){
    let url = "https://radioupdate.net/category/nhkr1/sukisase/page/" + page + "/";
    sukisaseCrawler.getContext(url).then((retUrls) => {
        contextUrls.concat(retUrls);
    }).catch((err) => {
        console.log("Something went wrong");
    });
}

// 开始爬取信息
for(let count = 1; count <= contextUrls.length; count++) {
    slog("进度: " + count + "/" + contextUrls.length);
    sukisaseCrawler.startCrawl(contextUrls[count-1]).then((retItem) => {
        programItems.push(retItem);
    }).catch((err) => {
        console.log("error: " + contextUrls[count-1]);
    });
}

// 保存信息


//const a = new Crawler("https://radioupdate.net/nhkr1/sukisase/20211223/");