<script setup>
const rootHTMLElement = document.querySelector('html')
rootHTMLElement.classList.add("fuck");
</script>

<template>
  <nav class="top-nav-wrapper">
    <div class="top-nav-inner-wrapper">
      <div class="top-nav-title">
        <img class="css3-svg" src="../assets/icons/css3.svg" />
        <h1>CSS速通挑战</h1>
      </div>
      <div class="switch-dark-light-mode-button">
        a
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.top-nav-wrapper {
  display: flex;
  background: #111;
  justify-content: center;
  padding: 6px 0;

  >.top-nav-inner-wrapper {
    width: 688px;
    display: flex;
    justify-content: space-between;

    >.top-nav-title {
      display: flex;

      >.css3-svg {
        height: 60px;
        margin-right: 24px;
      }

      >h1 {
        color: #ffffff;
        font-family: 'ZCOOLQingKeHuangYou-Regular';
        font-size: 48px;
        display: flex;
        align-items: center;
      }
    }
  }

}

@media (max-width: 700px) {
  .top-nav-wrapper {
    >.top-nav-inner-wrapper {
      >.top-nav-title {
        >.css3-svg {
          height: 40px;
          margin-right: 16px;
        }

        >h1 {
          font-size: 32px;
        }
      }
    }
  }
}
</style>