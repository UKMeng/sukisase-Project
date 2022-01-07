import superagent from 'superagent';
import cheerio from 'cheerio';

export interface Program{
    guestName: string;
    conteName: string;
    oaDate: string;
    Link: string;
}

export class Crawler{
    // 获取html
    async getHtml(url: string){
        const programHtml = await superagent.get(url);
        return programHtml.text;
    }
    // 解析html
    async loadHtml(html:string){
        return cheerio.load(html);
    }
    // 获取节目信息
    async getProgramInfo($element: any){
        // 获取链接
        const programLink : string = $element(".video > iframe").attr('src').replace('?feature=oembed', '').replace("embed/","watch?v=");

        // 获取嘉宾名字
        let perfromerName : string[] = [];
        $element(".entry-tags").children().each(function(idx: any, ele: any){
            if($element(ele).text() != '戸松遥' && $element(ele).text() != '東京03') {
                perfromerName.push($element(ele).text())
            }
        });
        // 有嘉宾是户松遥的情况
        const programGuest : string = (perfromerName.length == 0) ? '戸松遥' : perfromerName[0];

        // 获取放送日期
        const oaDay : string = $element(".entry-content.cf > h3").text().replace(/\D/ig,'');

        // 获取短剧标题
        const intro = $element(".entry-content.cf > p").text();
        const re = /コント「(.*?)」/;
        const conName : string = (re.test(intro)) ? intro.match(re)[1] : 'SP';

        console.log(programLink);
        console.log(programGuest);
        console.log(oaDay);
        console.log(conName);

        const Item : Program = {
            guestName : programGuest,
            conteName : conName,
            oaDate : oaDay,
            Link : programLink,
        };
        return Item;       
    }
    // 保存结果
    /*
    async saveProgramItems(result: Program[]){

        fs.writeFile('./data/radio.json', JSON.stringify(result), {flag: 'a'}, (err: any) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log('Write Done');
        });
    }
    */
    async getContext(url: string){
        const html = await this.getHtml(url);
        const $element = await this.loadHtml(html);
        const contextUrls : string[] = [];
        $element(".list.ect-entry-card.front-page-type-index").children().each(function(idx, ele){
            contextUrls.push($element(ele).attr("href") || "");
        });
        // console.log(contextUrls);
        return contextUrls;
    }
    async startCrawl(url: string){
        const html = await this.getHtml(url);
        const $element = await this.loadHtml(html);
        const programItem : Program = await this.getProgramInfo($element);
        return programItem;
        // this.saveProgramItems(programItems);
    }
    constructor(){}
}

// const p1 = new Getprogram('https://radioupdate.net/nhkr1/sukisase/20211216/');