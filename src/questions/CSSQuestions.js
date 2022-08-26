const CSSQuestions = [
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
  },
  {
    title: '问题1',
    code: `<div>
    <p></p>
    <p class="foo"></p>
    <p></p>
    <p></p>
</div>`,
    goal: [false, true, false, true, true],
    answer: 'p:not(.foo)',
    textHint: '用一个不匹配某个类名的伪类',
    linkHint: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:not',
  },
  {
    title: '问题2',
    code: `<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>`,
    goal: [false, false, false, true, false, true, false, true],
    answer: 'li:nth-child(2n + 3)',
  },
]

export default CSSQuestions