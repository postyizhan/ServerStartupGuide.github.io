# 世界-Multiverse-Core

## 世界-Multiverse-Core

\[创世\|管理\|传送\]\[SCT\]Multiverse-Core —— 多世界插件 \[持续更新\] \[1.17-1.4.5\]

[https://www.mcbbs.net/thread-1016455-1-1.html](https://www.mcbbs.net/thread-1016455-1-1.html)

\(出处: Minecraft\(我的世界\)中文论坛\)

创建世界，删除世界等

为什么它叫core？

```
Multiverse-Core
[Multiverse-Core] 是基础插件。下面的其它插件都必须需要 Core 。
本插件能够让你：
创建/修改/删除世界
传送到世界中
通过权限限制在世界间切换
查看某人在哪个世界中
Multiverse-Portals
[Multiverse-Portals] 是类似于 Multiverse 1 类型的传送门。
如果你使用过它的话，你可能很想要本插件。
它们的大部分是一样的，只是有一些新特性。
本插件能够让你：
创建/修改/删除 Multiverse 类型的传送门
通过权限限制传送门的使用
可以步行或骑着载具在 Multiverse 世界间切换
Multiverse-NetherPortals
[Multiverse-NetherPortals] 起到了 Multiverse 1 插件中 splike 的作用，但改善了许多。
本插件是为了能够让你们有更加真实的体验而设计，允许玩家创建能够带他们去指定世界的地狱传送门。
所有在 X 世界的传送门都会去 Y 世界，但是这可以在游戏中配置。
本插件能够让你：
自定义某个世界中的地狱传送门指向哪个世界
自动连接有特殊命名模型的世界（如 WORLD 和 WORLD_nether）
```

来自[https://mineplugin.org/Multiverse-Core\#Multiverse-Core](https://mineplugin.org/Multiverse-Core#Multiverse-Core)



### 部分命令

```
#发送版本信息至控制台
/mv version


#列出所有世界名称
/mv list


#创建世界
/mv create 
<
名字
>
<
环境
>
 -s [种子] -g [生成器[:ID]] -t [生成器] [-n] -a [true|false]


#简单创建世界
/mv create 
<
名字
>
<
环境
>

#名字不要用中文
#环境（原版）：
#normal #主世界
#nether #地狱
#end #末地


#复制某个世界
/mv clone 
<
目标
>
<
名字
>
 -g [生成器[:ID]]


#重置当前世界的默认出生点为脚下
/mv setspawn


#将玩家传送至某世界 出生点请参考 Setspawn 命令
/mv tp 
<
ID
>
<
世界
>

#/mv tp 
<
世界
>
 就是把自己传送过去


#重新生成某个世界，将会清空世界内所有方块
/mv regen 
<
世界
>
 [-s [SEED]]
#使用原有的种子重新生成世界
/mv regen 
<
世界
>



#重新加载配置文件
/mv reload
```

创建世界在命令里，不讲



### 导入一个世界

准备好一个世界文件夹（存档）比如这里我准备了一个名为 yizhan的存档

yizhan 这个存档是主世界，那么世界生成器是 normal

命令

```
/mv import <世界> <生成器>
```

![](/assets/mvImport1.png)

/mv tp yizhan 即可前往该世界出生点

