<script>
  import { Pie } from 'vue-chartjs'

  export default Pie.extend({
    data: function() {
      return {
        dataCollection: {},
        options: {
          rotation: 30,
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      }
    },
    created() {
      this.dataCollection = {
        labels: ['答对题目', '答错题目'],
        datasets: [{
          data: [this.correct, this.incorrect],
          backgroundColor: [
            '#6C7A89',
            '#95A5A6'
          ],
          hoverBackgroundColor: [
            '#6C7A89',
            '#95A5A6'
          ]
        }]
      }
    },
    props: ['correct', 'incorrect'],
    mounted () {
      this.renderChart(this.dataCollection, this.options);
    }
  })
</script>