# 编写开服bat

从上一节看过来的你可能会有点懵逼

啊?不是双击bat来启动服务器吗？

是滴~

但是这么启动一样的，bat也就是java -jar来启动服务器的，我管你气不气，我就是要写

现在，让我们写一个bat吧



在你放核心的这个文件夹右键新建一个文本文档，后缀改为 .bat

建议你用上面说的vscode HBuilderX或者你自己的文本编辑器打开，别用windows的



这里是一个简单的bat

```
@echo off
title test
java -Xms10G -Xmx10G -jar 核心名 nogui
pause
```

@echo off是什么？[ 点这里](https://blog.csdn.net/Fly_as_tadpole/article/details/85177379)

title test是什么？ 设置你窗口的标题，用中文结果乱码请自行百度



`java -Xms10G -Xmx10G 核心名 nogui`

这行命令开头的java是什么意思？

[https://shimo.im/docs/aBAYVQZpxEIxPQ3j\#anchor-kzeQ](https://shimo.im/docs/aBAYVQZpxEIxPQ3j#anchor-kzeQ)



-Xms10G -Xmx10G 是什么意思？

1. -Xms 为jvm启动时分配的内存，比如-Xms200m，表示分配200M
2. -Xmx 为jvm运行过程中分配的最大内存，比如-Xms500m，表示jvm进程最多只能够占用500M内存

就是说，你限制你服务器使用多少运存



嗯嗯那nogui是啥呢？

不写nogui时，启动服务器会弹出来一个，可能是图形化管理面板的东西



还有一个pause没讲哦

![](/assets/pause.png)

pause命令可以让脚本程序暂停， 会打印输出 “请按任意键继续...”字样。

当你服务器因为什么原因停止的时候，这个窗口不会直接关掉，而是停在这里，你可以在这里往上翻看看发生了什么，截图给其他人让其他人帮你诊断问题等



## 优化的bat

好了讲完一些基本的了，现在直接给你一个优化好的bat，替换下运存和jar文件名就好了

```
@echo off
title purpur1.18.2
java -Xms10G -Xmx10G -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar purpur-1.18.2-1632.jar nogui
pause
```



你可以用这两个网站来弄开服命令

[flags.sh](https://flags.sh/)   [https://startmc.sh](https://startmc.sh/)



来自b站的一个服务端优化教程[【MC开服】服务端超详细优化教程 - 哔哩哔哩 \(bilibili.com\)](https://www.bilibili.com/read/cv17603010/)

[MineCraft从零编写自己的开服批处理 - 有段云社区 \(tiacode.cn\)](https://www.tiacode.cn/articles/7)

