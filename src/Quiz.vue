<template>
  <div class="center"
       v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="正在提交答卷"
  >
    <div class="router-view">
      <transition :name="transition" mode="out-in">
        <router-view :key="questionNumber" class="transition" @optionSelected="updateAnswerStatus"></router-view>
      </transition>
    </div>

    <div class="buttons">
      <div class="button-left">
        <el-button type="primary" icon="arrow-left" @click="last" :disabled="isLoading || !isLastAvailable">
          上一问
        </el-button>
      </div>
      <div class="button-right">
        <el-button type="primary" @click="next" :disabled="isLoading || !isAnswered">
          {{ isNextAvailable ? "确定" : "完成答题" }}
          <i :class="[rightIcon]" class="el-icon--right"></i>
        </el-button>
      </div>
    </div>

    <div class="progress-button-set">
      <button v-for="(question, index) in quiz"
              :class="['progress-button', progressButtonActive(index), progressButtonSelected(index)]"
              @click="jumpTo(index)"
      >
        {{ index + 1 }}
      </button>
    </div>

    <div class="progress-bar">
      <div class="progress" :style="'width: ' + (submitting ? 100 : progress * 100) + '%'"></div>
    </div>
  </div>
</template>

<script>
  import Question from './Question.vue';

  export default {
    data: function() {
      return {
        isLoading: false,
        fullscreenLoading: false,
        submitting: false,
        transition: 'next-question',
        isAnswered: false
      }
    },
    components: {
        question: Question
    },
    computed: {
      isNextAvailable: function() {
        return this.$store.state.questionNumber < this.$store.state.quiz.length - 1;
      },
      isLastAvailable: function() {
        return this.$store.state.questionNumber > 0;
      },
      progress: function() {
        return (this.$store.state.questionNumber) / this.$store.state.quiz.length;
      },
      questionNumber: function() {
        return this.$store.state.questionNumber;
      },
      rightIcon: function() {
        return this.isNextAvailable ? 'el-icon-arrow-right' : 'el-icon-check';
      },
      quiz: function() {
        return this.$store.state.quiz;
      }
    },
    methods: {
      next() {
        if (this.isNextAvailable) {
          if (this.$store.state.answer[this.$store.state.questionNumber] == this.$store.state.quiz[this.$store.state.questionNumber].answer) {
            this.nextQuestion()
          } else {
            this.$confirm(this.$store.state.quiz[this.$store.state.questionNumber].explanation, '正确答案：' +
              this.$store.state.quiz[this.$store.state.questionNumber].answer, {
              confirmButtonText: '下一题',
              cancelButtonText: '我再看看',
              type: 'info'
            }).then(() => {
              this.nextQuestion()
            }).catch(() => {})
          }
        } else {
          this.$confirm(this.submitConfirmationText(), '确认提交', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: this.unansweredQuestion().length === 0 ? 'success' : 'warning'
          }).then(() => {
            this.submitting = true;
            this.fullscreenLoading = true;
            setTimeout(() => {
              this.fullscreenLoading = false;
              this.$router.push('/result');
            }, 1000);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            });
          });
        }
      },
      nextQuestion() {
        this.isLoading = true;
        this.transition = 'next-question';
        this.$store.commit('nextQuestion');
        this.$router.push('/' + (this.$store.state.questionNumber + 1));
        this.updateAnswerStatus()
        setTimeout(() => { this.isLoading = false }, 400);
      },
      last() {
        this.isLoading = true;
        this.transition = 'last-question';
        this.$store.commit('lastQuestion');
        this.$router.push('/' + (this.$store.state.questionNumber + 1));
        this.updateAnswerStatus()
        setTimeout(() => { this.isLoading = false }, 400);
      },
      jumpTo(index) {
        if (index !== this.questionNumber) {
          this.isLoading = true;
          this.transition = this.$route.params.id - 1 > index
            ? 'last-question'
            : 'next-question';
          this.$store.commit('setQuestion', index);
          this.$router.push('/' + (this.$store.state.questionNumber + 1));
          this.updateAnswerStatus()
          setTimeout(() => {
              this.isLoading = false
          }, 400)
        }
      },
      unansweredQuestion() {
        let unansweredList = [];
        for (let i = 0; i < this.$store.state.quiz.length; i++) {
          if (!this.$store.state.answer[i])
            unansweredList.push(i + 1)
        }
        return unansweredList
      },
      submitConfirmationText() {
        if (this.unansweredQuestion().length === 0)
          return '您已完成所有问题，确定提交？';
        else
          return "您还有第 " + this.unansweredQuestion().join(" 题、第 ") + " 题未完成，确定提交？"
      },
      progressButtonActive(index) {
        return this.$route.params.id - 1 === index
          ? 'progress-button-active'
          : ''
      },
      progressButtonSelected(index) {
        if (this.$store.state.visited[index]) {
          return this.$store.state.answer[index]
            ? 'progress-button-selected'
            : 'progress-button-missed';
        } else
          return '';
      },
      updateAnswerStatus() {
        this.isAnswered = this.$store.state.answer[this.$store.state.questionNumber]
      }
    },
    mounted() {
      if (this.$route.params.id > this.quiz.length)
        this.jumpTo(0);
    }
  }
</script>

<style scoped>
  .buttons {
    min-width: 20rem;
    max-width: 25rem;
    display: flex;
    justify-content: space-between;
  }

  .button-left {
    width: 10rem;
    display: flex;
    height: 2.5rem;
    justify-content: flex-start;
  }

  .button-right {
    width: 10rem;
    display: flex;
    height: 2.5rem;
    justify-content: flex-end;
  }

  .progress-button-set {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    max-width: 23rem;
  }

  .progress-button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid #555;
    margin: .15rem;
    background-color: #e4e4e4;
    color: #000;
    transition: all .25s;
    outline: 0;
    cursor: pointer;
    font-size: .9rem;
    padding: 0;
  }

  .progress-button:hover {
    background-color: #95A5A6 !important;
    color: #fff !important;
    border: none;
  }

  .progress-button-active {
    background-color: #000 !important;
    border: none;
    border-radius: 25%;
    color: #fff;
  }

  .progress-button-selected {
    background-color: #555;
    color: #fff;
    border: none;
  }

  .progress-button-missed {
    background-color: #BDC3C7;
    border: none;
    color: #fff;
  }

  .progress-bar {
    width: 100%;
    height: .2rem;
    position: fixed;
    top: 0;
    left: 0;
  }

  .progress {
    background-color: #000;
    height: 100%;
    transition: width .4s;
  }

  .el-button--success:hover {
    background-color: #13bb11;
    border-color: #13bb11;
  }

  .el-progress-bar__inner {
    transition: width .25s;
  }

  .router-view {
    display: block;
  }

  .transition {
    transition: all .25s;
  }

  .next-question-enter {
    transition: all .25s;
    opacity: 0;
  }

  .next-question-enter-active {
    animation-duration: .25s;
    animation-name: slide-in-leftward;
    transition: all .25s;
    opacity: 1;
  }

  .next-question-leave-active {
    animation-duration: .25s;
    animation-name: slide-out-leftward;
    opacity: 0;
  }

  .last-question-enter {
    transition: all .25s;
    opacity: 0;
  }

  .last-question-enter-active {
    animation-duration: .25s;
    animation-name: slide-in-rightward;
    transition: all .25s;
    opacity: 1;
  }

  .last-question-leave-active {
    animation-duration: .25s;
    animation-name: slide-out-rightward;
    opacity: 0;
  }

  @media(max-width: 768px) {
    .buttons {
      width: 90%;
      min-width: inherit;
    }
  }

  @keyframes slide-out-leftward {
    from {
      transform: translate(0);
    }

    to {
      transform: translate(-10%);
    }
  }

  @keyframes slide-in-leftward {
    from {
      transform: translate(10%);
    }

    to {
      transform: translate(0);
    }
  }

  @keyframes slide-out-rightward {
    from {
      transform: translate(0);
    }

    to {
      transform: translate(10%);
    }
  }

  @keyframes slide-in-rightward {
    from {
      transform: translate(-10%);
    }

    to {
      transform: translate(0);
    }
  }
</style>