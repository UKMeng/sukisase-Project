const fs = require('fs');
import {Program} from './crawler';
//const youtubedl = require('youtube-dl-exec');
const yt = require('@alpacamybags118/yt-dlp-exec');
const slog = require('single-line-log').stdout;

const audioDir = './audio/';
const proxyUrl = 'socks5://127.0.0.1:7891';

const json = fs.readFileSync('./data/radio.json', 'utf8');
const data = JSON.parse(json);
const items : Program[] = data.programInfo;


async function download(item: Program){
    const videoUrl = item.Link;
    const videoName = item.oaDate + " " + item.guestName + " " + "「" + item.conteName + "」" + '.m4a';
    // console.log(videoName);
    const outputT = audioDir + videoName;
    await yt.createYtDlpAsProcess(videoUrl, {
        extractAudio: true,
        audioFormat: "m4a",
        proxy: proxyUrl,
        o: outputT
        },{ stdio: ['pipe', 'pipe', 'pipe'] })
    .then((output:any) => {
        console.log("Success: " + videoName);
    });
}

let count = 50;

async function startDL(){
    for(var i = 51; i <= items.length; i++) {
        await download(items[i]).then((output:any) => {
            count++;
            slog(count + "/" + items.length);
        }); 
    }
}

startDL();


// --extract-audio --audio-format m4a --proxy "socks5://127.0.0.1:7891" -o "a.m4a" https://some.url

// pass 20211123 20201119