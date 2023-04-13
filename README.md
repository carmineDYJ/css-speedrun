# CSS速通挑战
`Vite + Vue3 + Pinia`  
本项目灵感来源 [CSS Speedrun](https://github.com/Vincenius/css-speedrun)

## 项目Setup
本地开发
```
# 安装依赖
pnpm install
# 开始开发
pnpm run dev
```
打包
```
pnpm run build
```
## 自定义谜题
添加问题至`/src/questions/CSSQuestions.js`
<table>
  <tr>
    <th>问题参数</th>
    <td>问题参数含义</td>
  </tr>
  <tr>
    <th>title</th>
    <td>问题显示的标题</td>
  </tr>
  <tr>
    <th>code</th>
    <td>问题对应的html代码</td>
  </tr>
  <tr>
    <th>goal</th>
    <td>首先对最外层元素使用<code>getElementsByTagName("*")</code>会产生一个HTML集合数组，接着创造一个等长的bool数组，其中要选中的元素位置值为true，不要选中的元素位置值为false，该bool数组就是问题对应的目标，即你希望哪些tag被选中。</td>
  </tr>
  <tr>
    <th>answer</th>
    <td>问题的答案，应该是一个CSS选择器</td>
  </tr>
  <tr>
    <th>textHint</th>
    <td>（可选）对解答问题的文字提示</td>
  </tr>
  <tr>
    <th>linkHint</th>
    <td>（可选）对解答问题的链接提示，应该指向对回答有帮助的网址，例如MDN</td>
  </tr>
</table>
例子

```javascript
{
    title: '热身',
    code: `<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>`,
    goal: [false, true, false, false],
    answer: 'li:first-child',
    textHint: '用一个会选择第一个子元素的伪类',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child',
}
```

## 开源协议
[MIT](https://github.com/carmineDYJ/css-speedrun/blob/main/LICENSE) @carmineDYJ
