#Markdown 完全入门
----------------------------------------------
##为什么我要写这篇教程
思考是人类活动的核心之一，而文字则是记录思考的成果最重要的媒介之一。而让绚烂的文学成为实体的工具——笔，也成了人类记忆中不可磨灭的一部分。正如《仲夏夜之梦》中莎士比亚说：

> 当想象力  
使未知事物有了形状  
当诗人的笔  
让它们成形并给空中的虚无  
一处居所  
一个名号


Markdown，这个至今没有中文译名的书写工具，作为比特世界的「笔」，自被发明之初就随着博客发展的浪潮传向互联网的每一片大陆，成为新闻民主化进程中的重要工具。不过它的拥趸在为它唱赞歌的同时，更多的人或胆怯于它陌生的使用方式，或不屑于它复杂的标记字符，始终没有领略这一工具的优雅。

感谢开发者的持续耕耘，优秀的 Markdown 工具层出不穷。时至今日，一款 Markdown 工具，已经不再是（也不应该是）少数重度写作者的选择，它的易用和实用，能惠及到每一个对文字输入有需求的用户，让脑子的思绪化为踏实的文字。

在优秀编辑器不断涌现的背景下，中文互联网上却难觅一篇合适的 Markdown 入门文章。多番对比之下发现，目前的教程普遍有两个问题：

 1. 对 Markdown 的本质和对比富文本编辑器（Word）的优势不做说明，只是泛泛而谈（例如「输入效率高」之类的口号）。没有引导读者真正去认识和了解 Markdown，容易让初学者一头雾水地开始尝试，在稍受挫折后质疑使用 Markdown 的意义，从而放弃。
 2. 对 Markdown 的语法只做简单的罗列。诚然，Markdown 的基本语法非常简明，但是站在初学者角度来看，依然十分反直觉。再加上 Markdown 的语法在不同工具中各有稍许不同，如果不对基本语法进行有逻辑的说明，使用者深入使用时会觉得越来越复杂。
 
所以本文的目的也变得十分清晰：

 1. 首先希望不了解 Markdown 的用户真正地理解这个工具的本质和优势，解决「为什么我要用 Markdown」这个元问题
 2. 其次是对 Markdwon 的语法有着有逻辑的了解，以免陷入各个语法版本的混乱之中，这就解决了「怎么使用 Markdown」的问题
 3. 最后就是工具的选择和使用场景的介绍，来帮助你开启使用 Markdown 之路。
 
尽管 Markdown 作为工具的本身并不复杂，但是其背后的逻辑性，以及十年来的演进所衍生出的各种变体，让这个话题也不能仅靠三言两语来解释，所以我们会分为上下两篇来走完这份《完全入门指南》。在上篇中我们专注于 Markdown 的本身，也探讨它的实质和优势，介绍它的语法。下篇我们去探索十余年来 Markdown 所发展出的世界，了解不同的 Markdown 衍生语法和工具。

##初步认识 Markdown
###Markdown 和常见的富文本编辑器有什么区别
如果只输入不带任何格式的文字，无需任何复杂的工具。正是为了赋予文字不同的「外貌」（即格式或者样式），我们才需要文字编辑器。例如输入的文字属于纯文本（即不带格式），而给文字标记上的颜色则属于文字的样式。对于用户来说，Markdown 编辑器和富文本编辑器（例如 Word )的作用是一致的：使用者输入纯文字，通过编辑器的处理，使其拥有一份样式，最终得到带格式的文档。

然而这两者的差距，就在处理文字的过程中。富文本编辑器以 Word 为例，输入文字后，选择不同的功能（通常是通过点击某个图标），例如加粗或者调整字体大小，处理后的效果直接显示在屏幕上，与打印出来的效果相同。所以富文本编辑器又叫「所见即所得」编辑器。

而 Markdown 编辑器则不同，输入文字后通常是在文字的前后同时输入一些标记字符，输入后在编辑窗口也不会即时的显示出效果3 。需要手动切换进预览模式查看处理效果。因为这些标记字符的存在，所以 Markdown 本身是一种标记语言。

###Markdown 的本质
如果仔细观察这两种编辑器和我们日常使用它们的习惯，就能更深一步理解这两种工具的差异。在编辑文稿时，我们其实不是像小时候在格子纸中写文章那样一气呵成，而是不断的在「输入文字」和「编辑文字」两个状态中切换。富文本编辑器「编辑文字」是通过点击图形化的功能按钮来实现，Markdown 编辑器则是通过标记字符去编辑。所以 Markdown 的核心就在于通过输入字符同时进行排版和内容输入。

当理解了「为什么 Markdown 里有那么多和内容无关的字符」这个问题之后，随之而来的可能就是两个概念的混淆——Markdown 语法和 Markdown 编辑器。我们口中常说的 Markdown 到底指什么呢。其实 Markdown 的创始人 John Gruber 这样定义：



> "Markdown" is two things:  
(1) a plain text formatting syntax;  
(2) a software tool, that converts the plain text formatting to others.



通俗的说，首先Markdown 意味着一套标记语法，这些标记字符就是用来赋予文字不同格式；其次，能将标记字符转换，最终呈现出我们想要的排版效果的软件，就是所谓的 Markdown 编辑器。目前除了那些为了 Markdown 专门开发的编辑器之外，你会看到一些网站（例如简书）或者应用（例如 Airmail 的 Mac 版）注明「支持 Markdown」，这意味着他们的编辑器也可以完成将标记字符转换的过程。

##Markdown 的优势
经过前面的铺垫，我相信你已经能体会 Markdown 的特殊之处。而正是这些乍看之下有些怪异的设计，让它形成了自己的独特优势。为了能更直观的体会 Markdown 的不同之处，建议在阅读的同时打开 Cmd 在线编辑器 尝试下面的简单例子（如果只是想试用而不想注册，可以全选，然后删除当前页面的文字）。别担心不理解那些标记字符的含义，在后文中会有相应的解释。

###书写过程流畅
如前文中所讲，用富文本编辑器编辑文字时是两个不连续的动作，输入文字时双手放在键盘上，编辑文字则需要视线和手离开输入框和键盘，去寻找和点击功能按钮。很少人使用 Word 时是一次性输入全部文字后，再去一次性的编辑文字格式（然而这却是使用 Word 相对较高效的方式）。

而 Markdown 的「书写流畅」就体现在将这两个动作合成一个输入字符的动作。视线一直固定在光标处，手也不需要移动，只是输入时使用不同的字符——文本字符和标记字符——就能同时完成编辑和输入。这种体验类似纸笔时代的书写，使用者全部的注意力都可以集中在将大脑中的语句输出，而不用不停地切换。

例 1：试着在编辑框中输入下面这段字符：

尼采说：
> Was mich nicht umbringt, macht mich **stärker**.
你会发现引用的句子已经被展示成了特殊的样式，而 stärker 这个单词也被加粗了。可以试试或回想下如果在 Word 上要如何实现这个效果。

###格式不随编辑器而改变，导出与分享方便
如果你有足够多使用 Word 的经历，一定会体验过「同一份 Word 文档，在不同地方打开就变得不同」这样的魔幻现实主义色彩的经历。不同版本、不同平台之间的 Word 的文档由于软件工程方面的原因，一直不能保证「在任何地方打开都显示同样的效果」，更别说 WPS 这类第三方的软件。这让通过 Word 格式来分享文档显得不够保险。

而 Markdown 则完全规避了硬件、编辑器和平台差异带来的问题。由于所有编辑器是基于一套 Markdown 语法来编写转换流程，就能保证在任何地方，打开来都是同样的格式。更安心的是，由于 Markdown 格式保持的文件本质上仍是一份纯文本，就能保证目前任何平台都有工具可以打开它，而不用担心对方是 Mac, 会不会打不开 Word 的场景。所以以 Markdown 格式来分享文档，远比富文本格式省心。

前文我们说过，Markdown 编辑器其实是负责将 Markdown 语法标记符转换成其他格式，这暗示了 Markdown 格式的导出也十分方便，因为这个转换的目标是可以随时变换的。以 MarkEditor 为例，除了常见的 PDF 、HTML 和富文本格式（可以直接保持格式粘贴到 Word 中），还可以复制为微信公众号格式。

###书写错误易发现
任何程度的使用者，在这两类工具的使用过程中都会出现使用错误4 ，这是不可避免的。然而 Word 的问题就在于，虽然所见即所得的界面让它可以即时的发现问题，但是由于它将编辑的过程交给了图形化的功能按键，出现问题时就无法回溯问题所在之处。例如选中一个单词设为粗体后，接下来输入的文字没有变回默认的字重这类错误。其次由于它的功能复杂程度很高，使用者可能没有正确的理解功能的使用场景，而只是做到了看上去排好了。例如常见的用空格而非分页符来分页，或者用空格来对齐，随后产生的排版问题，也很难直接在编辑界面中发现。

而 Markdown 由于是使用标记字符来控制排版，所以你在预览时发现的错误都可以直接在文稿中去查看，到底是标记字符输入错了，还是漏掉了字符。很多时候我们不会意识到这也是一个优势，但是在长期的使用中，就会体会到能快速发现问题和解决问题所给人带来的愉悦。

例 2：试着在编辑框中输入下面这段字符：

尼采说：
> Was mich **nicht umbringt, macht mich **stärker**.
还是第一个例子中的那句话，但是这次我想把「nicht」和「stärker」这两个词都加粗，加粗的标记字符是文字前后加上**，但是这时发现加粗的文字是错误的，通过看查看文稿你会很容易发现「nicht」这个词的后面忘了加上标记字符。

当然 Markdown 还有其他一些优势，例如可选的工具多样之类的，但是我认为这都不是它所具有的决定性的优势。上述三点都和 Markdown 的本质——标记语言——有关，这也是 Markdown 和富文本编辑的本质差异，也是富文本编辑器无论如何改进都不可能跨越的鸿沟。

##了解基本 Markdown 语法
在对 Markdown 有了初步的认识后，我们可以真正地去了解这套略显「神秘」的标记语法。说它神秘只是因为对完全不了解编程语言的人来说，通过字符来实现功能仍显得不直观和缺乏逻辑。换句话说，作为初学者，真的只能去死记硬背这套语法吗？看似杂乱琐碎的标记字符之间有没有什么逻辑呢？

其实想到 Markdown 和其他富文本编辑器一样，都是用来编辑文字的功能，就不会有太多的恐惧，Markdown 语法只是将我们在富文本编辑器中常用的功能，换一种方式呈现出来了而已。下面我们就以来源于 John Gruber 最早定义的一套基本语法 为例，来了解 Markdown 主要的三大类标记字符。

这里提醒一下，下面不会罗列出所有的标记字符，因为看一遍并不会帮你记住这些标记字符。你可以在 这里 查看完整的文档。下面主要是对看似毫无逻辑的语法进行梳理，希望帮你有序的理解。

###第一类：对文字样式的编辑
编辑器最基本的功能，就是对文字本身加以处理。例如对文字加粗，在Markdown 中通过** **来实现。其实在 Word 中就对应工具栏中的「字体」选项，同类的标记字符还有 * * 来实现斜体。如果你在编辑器中写成

例 3：

**演示粗体**
*演示斜体*
最终会显示为：

演示 
演示斜体
可以看出来，通过这些字符就改变了文字本身的属性。

###第二类：对段落的编辑
相较于对「字」的编辑，更高一层的就是对「段落」的编辑，对应在 Word 中其实也是工具栏的「段落」选项。和第一类字符稍有不同，这些字符会把一些段落变成特殊格式的段落。例如 + 实现列表，# 实现标题效果，> 将一段文字变为引用，或者简单不加任何字符，但是在段落前缩进，就会显示出代码块。

注意：这些标记字符和文字之间有一个空格，且都为英语的符号。

例 4：

+ 演示列表
    + 列表还可以有层级
    
> 这是引用文字的效果
最终会显示为：

演示列表
列表还可以有层级
这是引用文字的效果

###第三类：插入文章其他元素
正如 Word 中的「插入」选项一样，Markdown 也不仅仅只编辑文字，而是可以将不同的元素放入文档中。最常见的就是通过 []() 来插入链接和 ![]() 来插入图片（可以是本地图片也可以是网络图片）

例 5：

[少数派](https://sspai.com)

![](https://cdn.sspai.com/attachment/thumbnail/2016/11/04/264631b984633898c415a818b181e5205653e_mw_640.jpg)
注意：插入网络链接和图片的书写方式不止上面演示的一种，更全面的介绍可以查看 完整文档。

Markdown 全部的标记字符基本就可以被分为这三类，如果你一时间无法记住，完全没有必要担心，需要时去翻看文档，尝试用 Markdown 语法写一两次文章，你就会发现，这个数量级的标记字符很快就可以记住了。

看到这里，你应该已经大致理解了 Markdown 为何物，已经 Markdown 相对于更常见的富文本编辑器的优势。然而，你会发现仅靠着基本的 Markdown 语法，还不能立即用完成一些稍显复杂的任务。在下篇中，我们就会更贴近实际应用，去看看不同的 Markdown 语法是如果拓展了它的功能，以及市面上有哪些工具值得推荐。

##Markdown 语法的演进
如果你是第一次接触 Markdown，可能会觉得之前提及的 Markdown 拥有的编辑功能稍显羸弱；而如果你之前接触过 Markdown，就会发现一个奇怪的现象：在一些 Markdown 文档中出现的标记字符，居然不在这份 John Gruber 写的官方文档里。这就自然联系到下一个话题——Markdown 语法的增强和不同语法之间的异同。

正如任何一门自然语言都会存在方言的现象一样，随着 Markdown 的发展和普及，越来越多人不满足于 John Gruber 定义的那些功能有限的标记字符，开始以他的语法为基础，拓展出各种各样的「Markdown 方言」。这些改进主要体现在两个方面：

 1. 增加新的标记字符，带来了新的编辑功能，例如表格、脚注和目录等。
 2. 修改了现有的标记字符，这主要出现在一些编辑器中，例如 Ulysses。

###对基本语法的拓展
提到在编辑功能上对原生 Markdown 的拓展，最好的例子当属 Github Flavored Markdown。这是一套由 Github 网站为了帮助他们的主体用户群——程序员——更好的书写项目文档而推出的 Markdown 版本。由于其网站本身的影响力，以及他们的用户和 Markdown 用户高度重合，所以这套语法在互联网中得到了广泛推广。

原有的 Markdown 语法的功能稍显不足，Github Flavored Markdown 在前面所说的语法的三个方面都做出了相应的增强。同样的，你可以通过 官方文档 来查看全部的语法。相较原生语法，Github Flavored Markdown 主要做了以下改进：

在对文字处理方面，它可以直接将网址高亮出来（原生语法需要加相应的标记字符）。
在对段落的处理方面，对原有代码块进行了增强，如果你在代码块后表明代码语言：
```python
  def 点赞机():
  if 文章不错：
  return 点赞
  else:
  return 差评
```
就能直接看到相应编程语言的语法高亮。

要插入文章元素方面，它支持在 Markdown 里写表格，如果你这么写：
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
就会显示成：

First Header    Second Header
Content Cell    Content Cell
Content Cell    Content Cell
Github Flavored Markdown 是个很好的案例，说明了为什么会有人对原有的基本 Markdown 语法进行改进——就是为了满足各种原生 Markdown 没有提供的需求。

除了 Github Flavored Markdown 之外，MultiMarkdown 也不能不提。事实上目前众多编辑器都或多或少从 Multimarkdown 获取了一些灵感，相比 Github Flavored Markdown，Multimarkdown 是一套功能更为强大，同时语法更复杂的体系。如果有兴趣，你可以去 官网 查看完整的语法文档。而你会在很多编辑器中都能发现，它们或多或少的支持了 MultiMarkdown 的语法。

不过如果你是初学者，我能给的建议是：先不要一上来就接触太多不同的增强型语法，这样会使得你愈发困惑。如果在日后使用中遇到了某些特殊的需求，例如脚注，再去搜索了解有哪些语法和编辑器支持你想要的那些功能1。

###对通用语法的修改
除了上面所说的对基本语法的修改，还有的编辑器会对某些在通用语法中出现过的标记字符进行定制。例如，删除线的语法通常情况下是~~要删除的文字~~，但是在 Bear 中，开发者将它定义成-要删除的文章-。

这种情况的出现，主要还是不同的开发者对 Markdown 的标记字符的「好用」理解不同。遇到这种情况大可不必担心，一般的编辑器都会给出自己的标记字符文档，有的还会让用户做出选择，是使用通用的语法标记，还是这个编辑器专属的语法。

既然有了多种选择就有比较，而作为使用者，我认为我们只需认识到有这种「方言现象」的存在就好，如果过于纠结哪套语法更好，其实并不能提高多少使用上的效率。由于 Markdown 编辑器的效率高度依赖使用者的肌肉记忆，也就使得使用者的习惯才是最主要的影响因子。对于你来说，你习惯的语法才是效率最高的。

##Markdown 的使用
前面是完整的对 Markdown 的介绍，看完之后，理论上你应该能上手 Markdown。这时「什么时候该用」和「用什么工具」的选择就会浮现出来。事实上，我并不希望作为初学者你一开始就陷入「对工具得选择」而忘记了 Markdown 的初衷，所以接下来对这两个问题的回答，我都只会提出一两个例子，作为引导，而非像之前力求全面系统的阐述。

###Markdown 的局限性
「什么时候该用 Markdown」，其实是个回答非常个性化的问题。为了厘清 Markdown 和其他编辑器的边界，与其枚举一个个应用场景，不如把问题改为「什么时候不该用 Markdown」。

前文有提到，Markdown 只是一个「轻量级标记语言」，相比同为标记语言的 Latex 、Word 或 Pages 这类文字处理软件，更不用说 Indesign 这种专业级的排版软件，Markdown 在排版的功能上显得羸弱。与最熟悉的 Word 相比，稍微对比一下就能发现其中的缺陷：

Markdown 无法对「段落」进行灵活处理。在 Word 中你可以随意插入文本框，调整它的位置。尽管这并不是一个常见的用法，但是这意味着，Word 能以段落为单位进行排版（Latex 也可以做到相似的效果），相比 Markdown 只能线性的对文字排版，专门的排版软件无疑是更能满足专业需求的。
Markdown 对非纯文本元素的排版能力很差，最常见的例子就是图片。诚然，现在很多编辑器都支持了图文混排，但是受制于纯文本格式，Markdown 编辑器几乎不可能做到 Word 一样对图片灵活的调整位置，更不用说文字围绕图片进行自适应排版之类的效果。
可以看出，这些弱势都来源于 Markdown 本身的纯文本格式，因为 Markdown 从一开始就定位为「文字输入工具」，排版功能也是基于 HTML 的延伸，并不适合对排版格式自定义程度较高的文档进行排版。

###适用 Markdown 的几个场景
尽管 Markdown 尚不是大众化的工具，但是感谢开发者们源源不断的创意，为我们提供了极为丰富的工具选择。工具的多样，让 Markdown 能渗透进各种各样的场景。小到写备忘录，大到完成一部书稿，都有相应优秀 Markdown 工具。想在一篇文章里罗列全部的场景基本不可能，所以我们在这篇还是从 Markdown 本身的特质出发，看看它在某些场景下的表现。

####网络环境下的写作
Markdown 基于 HTML 语言而被开发出来，开发它的目的就是创造一门「更易读、更易写」的语言用于网络世界的写作。可以说，没有什么工具比 Markdown 更适合用于网络环境下的写作了。

早前的「网络环境下的写作」可能专指博客或者个人站点，但是随着移动互联网的兴起，微信公众号等媒介的出现，读者的阅读习惯也渐渐改变，Markdown 也顺应了这一时代的变化。对于原本的「自留地」——博客或个人站点—— Markdown 保持了一贯的方便，例如 MWeb 可以帮你把使用 Markdown 所写的文字一键生成静态网站。在长微博和微信公众号写作方面，Markdown 也有优势，例如 MarkEditor 可以直接把文章从编辑器中发送到微信（朋友圈或好友），也可以复制成微信公众号格式，省去了在微信后台编辑的功夫。

总结起来，在网络环境下的写作， Markdown 可以让使用者专心于文章书写，而非排版。

####文档协作
之前是利用了 Markdown 「写作即排版」的特点，而现在是利用它「纯文本格式」的优势。一份 Markdown 文本用任何软件在任何系统下打开，都能保证基本的格式不错乱（起码能打开没有乱码的纯文本文档），这使得：

团队成员间可以自由选用自己喜欢的操作系统和编辑器工具来进行写作，而不局限于 Word 或者 Google Docs等只支持富文本编辑的软件。
文档的展示方式不仅仅是在编辑器中，你可以随时把文档转换成网页，任何时候任何人都可以方便地查看。
用 Markdown 来协作，你既可以选择熟悉的共享文件的方式（借助网盘），也可以用 Simplenote 或者 Quip 这类内置了协作功能的编辑器。无论如何，用 Markdown 来文档协作会比其他工具更自由。

####其他领域
正如上文所讲，由于开发者们的创意，让 Markdown 几乎渗透进每一个需要文字书写的领域。

统计学者可以利用 R Markdown 直接将自己的脚本和图表排版成一篇报告，这项功能甚至是直接集成到 RStudio（一款 R 语言的 IDE）中的；由于有 Pandoc 这个格式转换利器，理论上可以将 Markdown 转换为常见的 Docx 或者 Tex 格式文档，这让学术写作者和办公人士可以将 Markdown 作为初稿的工具；借助马克飞象等工具，使得 Markdown 可以和 Evernote 这类笔记软件结合起来。

这些 Markdown 进阶的用法，在本文就不做展开。由此来看，相比熟悉的 Word 等工具，Markdown 的应用场景不是更窄，反而是更广。