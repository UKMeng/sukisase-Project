const fs = require('fs');
import {Program} from './crawler';
const youtubedl = require('youtube-dl-exec');

const audioDir = './audio/';
const proxyUrl = 'socks5://127.0.0.1:7891';

const json = fs.readFileSync('./data/radio.json', 'utf8');
const data = JSON.parse(json);
const items : Program[] = data.programInfo;

for(const item of items) {
    const videoUrl = item.Link;
    const videoName = item.oaDate + " " + item.guestName + " " + "「" + item.conteName + "」" + '.m4a';
    console.log(videoName);
    const outputT = audioDir + videoName;
    youtubedl(videoUrl, {
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        extractAudio: true,
        audioFormat: "m4a",
        proxy: proxyUrl,
        o: outputT
        })
  .then((output:any) => {console.log("Finish")})
    break;
}
