<template>
  <div class="content">
    <p>{{ (this.$store.state.questionNumber + 1) + '、' + (quiz[question] || {}).text }}</p>
    <el-radio-group v-model="radio" @change="select">
      <el-radio v-for="option in (quiz[question] || {}).answers" :label="option.label" :key="option">
        {{ option.label + '. ' + option.answer }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  let _ = require('lodash');

  export default {
    data: function () {
      this.$store.commit('setQuestion', this.$route.params.id - 1);

      return {
        radio: ''
      }
    },
    computed: _.defaultsDeep(
      {
        question() {
          this.radio = this.$store.state.answer[this.questionNumber] || '';
          return this.questionNumber;
        }
      },
      mapState([
        'answer',
        'questionNumber',
        'quiz'
      ])
    ),
    methods: {
      select() {
        if (this.radio !== '') {
          this.$store.commit('select', {
            number: this.questionNumber,
            label: this.radio
          });
          this.$emit('optionSelected')
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.commit('visit', to.params.id - 1);
      this.$store.commit('visit', from.params.id - 1);
      next();
    }
  }
</script>

<style scoped>
    .content {
        width: 30rem;
        min-height: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1rem;
    }

    @media(max-width: 768px) {
        .content {
            width: 80%;
            margin: 1rem;
        }
    }

    .el-radio-group {
        display: flex;
        flex-direction: column;
    }

    .el-radio {
        margin: .5rem;
    }
</style>