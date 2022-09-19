<script setup>
import TopNav from './components/TopNav.vue'
import UsageIntroduction from './components/UsageIntroduction.vue';
import CSSAnswer from './components/CSSAnswer.vue';
import CSSQuestion from './components/CSSQuestion.vue';
import Sidebar from './components/Sidebar.vue';
import Timer from './components/Timer.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="content-wrapper">
    <TopNav class="top-nav" />
    <main class="main-content">
      <UsageIntroduction class="usage-introduction" />
      <div class="answer-question-timer-and-sidebar">
        <div class="answer-and-question">
          <CSSAnswer class="answer"/>
          <CSSQuestion class="question"/>
        </div>
        <div class="timer-and-sidebar">
          <Timer class="timer" />
          <Sidebar />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  background-color: black;

  .main-content {
    flex-shrink: 0;
    flex-grow: 1;
    border-bottom: 1px solid #222;
    border-top: 1px solid #222;
    padding-top: 24px;
    display: flex;
    flex-direction: column;

    .usage-introduction {
      margin-bottom: 12px;
    }

    .answer-question-timer-and-sidebar {
      display: flex;
      justify-content: center;

      .answer-and-question {
        margin-right: 12px;

        .answer {
          margin-bottom: 12px;
        }
      }

      .timer-and-sidebar {
        .timer {
          margin-bottom: 12px;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .content-wrapper {
    .main-content {
      .answer-question-timer-and-sidebar {
        flex-direction: column;
        justify-content: flex-start;

        .answer-and-question {
          margin-right: 0;
          margin-bottom: 24px;

          .answer {
            margin-bottom: 6px;
          }
        }

        .timer-and-sidebar {
          .timer {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
}
</style>
