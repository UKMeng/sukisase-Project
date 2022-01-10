---
source:
category: 爬虫项目
tag: #TypeScript #东京03 #爬虫 #YouTube
time:2022-01-06 11:59
---

## 实现目标

爬取https://radioupdate.net/category/nhkr1/sukisase 东京03节目相关信息，包括嘉宾名字、短剧名字、播出日期，以及YouTube视频链接录入到一个JSON文件中。然后再配合YouTube-DL之类的软件把视频从YouTube上批量下载，并按照“播出日期-嘉宾-短剧名”对视频进行重命名。

## 技术栈

- TypeScript（想通过这个项目上手这个编程语言）


## 实现步骤

- [x] 对单个页面（https://radioupdate.net/nhkr1/sukisase/20211223/） 进行信息爬取和数据处理(crawler.ts)
- [x] 获取所有页面的链接通过crawler.ts进行爬取并把处理好的数据存入JSON文件
- [x] JSON文件数据处理
- [x] 根据JSON文件中的数据从YouTube上批量下载视频并重命名
- [x] 利用FFmpeg将音频制作成带黑屏视频轨的视频


## 实现细节

### 初始化项目

```TypeScript
npm init -y //'-y' means Generate it without having it ask any questions
tsc --init
```

### 模块

-   ts-node(省去编译ts这一步骤，方便调试)
-   superagent(用来发送请求)
-   cheerio（用来解析获取到的html结构）
-   single-line-log (用来实现进度条)
-   @alpacamybags118/yt-dlp-exec (用来下载YouTube视频，youtube-dl太慢了）
-   fluent-ffmpeg (处理视频)

以及两个声明模块
-   @types/superagent
-   @types/cheerio
-   @types/fluent-ffmpeg

```TypeScript
npm install -g ts-node
npm install -D superangent cheerio single-line-log @alpacamybags118/yt-dlp-exec @types/superagent @types/cheerio @types/single-line-log fluent-ffmpeg @types/fluent-ffmpeg
```

### 制作黑色背景视频

```bash
ffmpeg -f lavfi -i color=c=black:s=1280x720:r=5 -i audio.mp3 -crf 0 -c:a copy -shortest output.mp4
```