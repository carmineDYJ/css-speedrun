const CSSQuestions = [
  {
    code: `<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>`,
    goal: [false, true, false, false]
  },
  {
    code: `<div>
    <p></p>
    <p class="foo"></p>
    <p></p>
    <p></p>
</div>`,
    goal: [false, true, false, true, true],
  },
//   {
//     code: `<ul>
//   <li></li>
//   <li></li>
//   <li></li>
//   <li></li>
//   <li></li>
//   <li></li>
//   <li></li>
// </ul>`,
//     goal: [false, false, false, true, false, true, false, true],
//   }
]

export default CSSQuestions