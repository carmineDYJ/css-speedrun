const CSSQuestions = [
  {
    title: 'Introduction',
    code: `<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>`,
    goal: [false, true, false, false],
    answer: 'li:first-child',
  },
  {
    title: 'Question 1',
    code: `<div>
    <p></p>
    <p class="foo"></p>
    <p></p>
    <p></p>
</div>`,
    goal: [false, true, false, true, true],
    answer: 'p:not(.foo)',
  },
  {
    title: 'Question 2',
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
  }
]

export default CSSQuestions