<script setup>

</script>

<template>
  <div class="usage-introduction-wrapper">
    <details class="usage-introduction">
      <summary>我如何运作</summary>
      <div class="usage-introduction-content">
        <div>
          <p>输入CSS选择器，使得仅有被箭头&ensp;</p>
          <img class="hint-arrow-svg" src="../assets/icons/hint_arrow.svg" />
          <p>&ensp;指向的DOM元素被选中，然后点击提交按钮</p>
        </div>
        <p>在你成功完成热身题后，计时器将开始计时</p>
      </div>
    </details>
  </div>
</template>

<style lang="scss" scoped>
.usage-introduction-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 12px;

  .usage-introduction {
    max-width: 688px;
    flex-grow: 1;
    flex-shrink: 1;
    border: 2px solid #222;
    border-radius: 4px;
    padding: 12px 6px;
    background: #111;

    .usage-introduction-content {
      padding: 0 16px;
      div:first-child {
        display: flex;
        align-items: center;

        .hint-arrow-svg {
          height: 1em;
        }
      }
    }

  }
}
</style>