<script setup>

</script>

<template>
  <div class="usage-introduction-wrapper">
    <details class="usage-introduction">
      <summary>我如何运作</summary>
      <div class="usage-introduction-content">
        <div>
          输入CSS选择器，使得仅有被箭头
          <img class="hint-arrow-svg" src="../assets/icons/hint_arrow.svg" />
          指向的DOM元素被选中，然后点击提交按钮。
        </div>
        <p>在你成功完成热身题后，计时器将开始计时。</p>
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
    line-height: 1.5em;

    summary {
      font-weight: bold;
    }

    .usage-introduction-content {
      padding: 12px 16px 0 16px;
      div:first-child {
        .hint-arrow-svg {
          vertical-align: text-top;
          height: 1em;
        }
      }
    }

  }
}
</style>