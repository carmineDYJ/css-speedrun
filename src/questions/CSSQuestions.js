export const CSSQuestions = [
  {
    title: '热身',
    code: `<li></li>
<ul>
  <li></li>
  <li></li>
</ul>
<ol>
  <li></li>
  <li></li>
</ol>
`,
    goal: [false, false, true, true, false, true, true],
    answer: 'ul li, ol li',
    textHint: '选择多个元素',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Grouping_selectors',
  },
  {
    title: "问题1",
    code: `<div>
  <p></p>
  <div>
    <p></p>
  </div>
</div>`,
    goal: [false, true, false, true],
    answer: "div > p",
    textHint: "选择一个元素的直接子元素",
    linkHint:
      "https://developer.mozilla.org/en-US/docs/Web/CSS/Child_selectors",
  },
  {
    title: '问题2',
    code: `<ul>
  <li></li>
  <li></li>
  <li class="foo"></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>`,
    goal: [false, false, false, false, true, true, true, true],
    answer: 'li:nth-last-of-type(-n+4)',
    textHint: '选择最后4个同类型元素',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-of-type',
  },
  {
    title: '问题3',
    code: `<div>
  <p>foo</p>
  <p>foo</p>
  <p></p>
  <p>foo</p>
</div>`,
    goal: [false, false, false, true, false],
    answer: 'p:empty',
    textHint: '选择非空元素',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:not',
  },
  {
    title: '问题4',
    code: `<div class="foo"></div>
<p></p>
<div>
  <p></p>
</div>
<p></p>
`,
    goal: [false, true, false, false, true],
    answer: '.foo ~ p',
    textHint: '选择一个元素的同级元素',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_selectors',
  },
  {
    title: '问题5',
    code: `<ul>
  <li></li>
  <li data-item="foo"></li>
  <li></li>
  <li></li>
</ul>`,
    goal: [false, false, true, false, false],
    answer: 'li[data-item]',
    textHint: '选择带有属性的元素',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors',
  }
]
