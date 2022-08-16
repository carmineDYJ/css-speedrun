const CSSQuestions = [
  {
    title: 'Intro',
    code: `<div>
  <span></span>
  <p>
      <a></a>
      <span></span>
  </p>
  <span></span>
</div>`,
    goal: [false, true, true, false, false, true]
  },
//   {
//     title: 'Intro',
//     code: `<ul>
//     <li></li>
//     <li></li>
//     <li></li>
// </ul>`,
//     goal: [false, true, false, false]
//   },
  {
    title: 'Question 1',
    code: `<div>
    <p></p>
    <p class="foo"></p>
    <p></p>
    <p></p>
</div>`,
    goal: [false, true, false, true, true],
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
  }
]

export default CSSQuestions