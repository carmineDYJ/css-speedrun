<script setup>
import { ref } from 'vue';
const switchColorModeButtonPositionClass = ref(undefined)
if (localStorage.getItem('color-mode') === 'light') {
  document.querySelector("html").classList.add('light-color-mode')
  switchColorModeButtonPositionClass.value = 'right'
} else if (localStorage.getItem('color-mode') === 'dark' || !localStorage.getItem('color-mode')) {
  document.querySelector("html").classList.remove('light-color-mode')
  switchColorModeButtonPositionClass.value = 'left'
}
const switchColorMode = () => {
  if (switchColorModeButtonPositionClass.value === 'left') {
    switchColorModeButtonPositionClass.value = 'right'
    document.querySelector("html").classList.add('light-color-mode')
    localStorage.setItem('color-mode', 'light')
  } else if (switchColorModeButtonPositionClass.value = 'right') {
    switchColorModeButtonPositionClass.value = 'left'
    document.querySelector("html").classList.remove('light-color-mode')
    localStorage.setItem('color-mode', 'dark')
  }
}
</script>

<template>
  <nav class="top-nav-wrapper">
    <div class="top-nav-inner-wrapper">
      <div class="top-nav-title">
        <img class="css3-svg" src="../assets/icons/css3.svg" />
        <h1>CSS速通挑战</h1>
      </div>
      <div class="switch-color-mode-button-wrapper">
        <img class="sun-svg" src="../assets/icons/sun.svg" />
        <img class="moon-svg" src="../assets/icons/moon.svg" />
        <button class="switch-color-mode-button" :class="switchColorModeButtonPositionClass"
          @click="switchColorMode"></button>
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
    align-items: center;
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

    >.switch-color-mode-button-wrapper {
      background-color: #222;
      width: 55px;
      height: 30px;
      border-radius: 30px;
      position: relative;
      >.sun-svg {
        position: absolute;
        top: 50%;
        left: 2px;
        height: 20px;
        transform: translateY(-50%);
      }
      >.moon-svg{
        position: absolute;
        top: 50%;
        right: 2px;
        height: 20px;
        transform: translateY(-50%);
      }
      >.switch-color-mode-button {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        border: none;
        transition: left 0.5s ease-in-out;

        &:hover {
          outline: 3px solid #5e8df0;
        }

        &.left {
          left: 0;
        }

        &.right {
          left: 25px;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .top-nav-wrapper {
    >.top-nav-inner-wrapper {
      padding-left: 12px;
      padding-right: 12px;

      >.top-nav-title {
        >.css3-svg {
          height: 40px;
          margin-right: 16px;
        }

        >h1 {
          font-size: 32px;
        }
      }

      >.switch-color-mode-button-wrapper {
        width: 45px;
        height: 25px;
        border-radius: 25px;

        >.switch-color-mode-button {
          position: absolute;
          width: 25px;
          height: 25px;
          border-radius: 25px;
          &.right {
            left: 20px;
          }
        }
      }
    }
  }
}
</style>
