# node-agent

为了让 Node.js 应用可以运行于 TAF 框架中， `node-agent` 将作为启动器来启动应用，以屏蔽 TAF 框架与 Node.js 间的差异，并提供生产环境所需的服务特性。

它主要提供了如下的功能：

* __内置负载均衡（通过 Cluster 模块实现）__  
* __异常退出的监控与拉起__  
* __日志搜集与处理__  
* __支持TAF平台的管理命令__  
* __支持 HTTP(s) 服务监控上报（在 TAF 平台上运行）__
* __支持服务用量上报（在 TAF 平台上运行）__

## 安装

`npm --registry http://npm.oa.com install "node-agent" -g`  

> 由于 `node-agent` 是一个 CLI 程序，所以一般需要使用 __-g__ 参数来安装

## 架构

![PM2](http://git.oa.com/taf/node-agent/raw/master/doc/architecture.png)