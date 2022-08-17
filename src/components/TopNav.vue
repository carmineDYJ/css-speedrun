<script setup>

</script>

<template>
  <div class="top-nav-wrapper">
    <div class="top-nav">
      <img class="css3-svg" src="../assets/icons/css3.svg" />
      <h1>CSS速通挑战</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-nav-wrapper {
  display: flex;
  background: #111111;
  justify-content: center;
  >.top-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
@media (max-width: 500px) {
  .top-nav-wrapper {
    > .top-nav {
      > .css3-svg {
        height: 40px;
        margin-right: 16px;
      }
      >h1 {
        font-size: 32px;
      }
    }
  }
}
</style>