---
source:
category: [[爬虫项目]]
tag: #TypeScript #东京03 #爬虫 #YouTube
time:2022-01-06 11:59
---

## 实现目标

爬取https://radioupdate.net/category/nhkr1/sukisase [[东京03]]节目相关信息，包括嘉宾名字、短剧名字、播出日期，以及[[YouTube]]视频链接录入到一个[[JSON]]文件中。然后再配合YouTube-DL之类的软件把视频从YouTube上批量下载，并按照“播出日期-嘉宾-短剧名”对视频进行重命名。

## 技术栈

- [[TypeScript]]（想通过这个项目上手这个编程语言）


## 实现步骤

- [ ] 对单个页面（https://radioupdate.net/nhkr1/sukisase/20211223/）进行信息爬取和数据处理(crawler.ts)
- [ ] 获取所有页面的链接通过crawler.ts进行爬取并把处理好的数据存入JSON文件
- [ ] 根据JSON文件中的数据从YouTube上批量下载视频并重命名


## 实现细节

### 初始化项目

```TypeScript
npm init -y //'-y' means Generate it without having it ask any questions
tsc --init
```

### 模块

-   [[ts-node]](省去编译ts这一步骤，方便调试)
-   [[superagent]](用来发送请求)
-   [[cheerio]]（用来解析获取到的html结构）

以及两个声明模块
-   @types/superagent
-   @types/cheerio

```TypeScript
npm install -g ts-node
npm install -D superangent cheerio @types/superagent @types/cheerio
```