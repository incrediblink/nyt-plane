<template>
  <div class="center">
    <h2>{{ message }}</h2>
    <p>{{ '你一共答对了 ' + correct + ' 道题' }}</p>
    <pie :correct="correct" :incorrect="incorrect"></pie>
    <el-button class="button" @click="goBack">重新测试</el-button>
  </div>
</template>

<script>
  import Pie from './ResultPie.vue'

  export default {
    data: function() {
      let answer = this.$store.state.answer,
        quiz = this.$store.state.quiz,
        correct = 0,
        incorrect = 0,
        message = '';

      for (let i = 0; i < quiz.length; i++) {
        if (answer[i] !== quiz[i].answer) {
          incorrect++
        } else {
          correct++
        }
      }

      if (correct >= .8 * quiz.length) {
        message = '噢！航空知识小王子！'
      } else if (correct >= .5 * quiz.length) {
        message = '看来你对航空知识有些了解噢'
      } else {
        message = '快去补课！'
      }

      return {
        correct,
        incorrect,
        message
      }
    },
    components: {
      pie: Pie
    },
    methods: {
      goBack() {
        this.$store.commit('cleanAnswer')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
    h2 {
        margin-bottom: 0;
    }

    .button {
        margin-top: 1rem;
    }
</style>