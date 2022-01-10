const slog = require('single-line-log').stdout;  // 用于在同一行输出log，以实现进度条的功能
import {Program, Crawler} from './crawler';
const sukisaseCrawler = new Crawler();

let urls : string[] = [];
// 获取所有节目信息url
async function getContext(){
    for(let page = 3; page <= 6; page++){
        let url = "https://radioupdate.net/category/nhkr1/sukisase/page/" + page + "/";
        const retUrls = await sukisaseCrawler.getContext(url)
        urls = urls.concat(retUrls);
        console.log(urls);
    }
    console.log("Finish Getting the URLs");
}
// 开始爬取信息
async function getAndSaveInfo(){   
    let progress = 0;
    let programItems : Program[] = [];
    console.log("Success: " + urls.length + "urls");
    for(let count = 1; count < urls.length; count++) {
        await sukisaseCrawler.startCrawl(urls[count-1]).then((retItem) => {
            programItems.push(retItem);
            progress++;
            slog("进度: " + progress + "/" + urls.length);
        }).catch((err) => {
            console.log(err + urls[count-1]);
        });
    }
    console.log("Finish Getting the Infos");
    return programItems;
}

async function main(){
    await getContext();
    await getAndSaveInfo().then((items) => {
        sukisaseCrawler.saveProgramItems(items); // 保存信息
    });
}

main();

//const a = new Crawler("https://radioupdate.net/nhkr1/sukisase/20211223/");