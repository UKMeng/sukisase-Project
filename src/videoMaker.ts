const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const slog = require('single-line-log').stdout;

const audioDir = './audio/';
const videoDir = './video/';

const audioNames = fs.readdirSync(audioDir);
let count = 0;
let totalNum = audioNames.length - 1;


// ffmpeg -f lavfi -i color=c=black:s=1280x720:r=5 -i audio.mp3 -crf 0 -c:a copy -shortest output.mp4
function videoProcess(videoName:string, audioName:string){
    return new Promise((resolve, reject) => {
        ffmpeg(audioName)
        .input('color=c=black:s=1280x720:r=5')
        .inputOption('-f lavfi')
        .output(videoName)
        .outputOption(['-crf 0', '-c:a copy', '-shortest'])
        .on('progress', function(info:any){
            slog('progress ' + info.percent.toFixed(2) + '%');
        })
        .on('end', function(){
            count++;
            console.log('');
            console.log(count + '/' + totalNum + ' success: ' + audioName);
            resolve(1);
        })
        .run();
    })
}

async function startProcess(){
    for(let i = 0; i < totalNum; i++) {
        if(audioNames[i] == '.DS_Store'){
            continue;
        } else{
            const videoName = videoDir + audioNames[i].replace('.m4a', '.mp4');
            const audioName = audioDir + audioNames[i];
            await videoProcess(videoName, audioName);
        }
    }
}

startProcess();