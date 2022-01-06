---
source:
category: [[爬虫项目]]
tag: #TypeScript #东京03 #爬虫 #YouTube
time:2022-01-06 11:59
---

## 实现目标

爬取https://radioupdate.net/category/nhkr1/sukisase [[东京03]]节目相关信息，包括嘉宾名字、短剧名字、播出日期，以及[[YouTube]]视频链接录入到数据库中。然后再配合YouTube-DL之类的软件把视频从YouTube上批量下载，并按照“播出日期-嘉宾-短剧名”对视频进行重命名。

## 技术栈

- [[TypeScript]]（想通过这个项目上手这个编程语言）
- [[MySQL]] （同时想通过这个项目熟悉MySQL操作）


## 实现步骤

- [ ] 对单个页面（https://radioupdate.net/nhkr1/sukisase/20211223/）进行信息爬取和数据处理（spider.ts)
- [ ] 获取所有页面的链接通过spider.ts进行爬取并把处理好的数据存入数据库
- [ ] 根据数据库中的数据从YouTube上批量下载视频并重命名
