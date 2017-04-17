const quiz = [{
  text: '如果你在登機前自願放棄座位，航空公司將：',
  answers: [
    { label: 'A', answer: '為你在下一趟有座的航班上確認座位，但沒有更多補償' },
    { label: 'B', answer: '為你在下一趟有座的航班上確認座位，並支付你價值幾百美元的未來航班代金券作為補償' },
    { label: 'C', answer: '因為給你帶來不便而補償你代金券。但是你需要自己預定下一趟航班' },
    { label: 'D', answer: '給你一塊餅乾和一枚獎章（不可兌換未來的機票）' }
  ],
  answer: 'B',
  explanation: '雖說各個航空公司政策有別，但通常都會提供價值數百美元的代金券作為補償。在聯合航空3411航班那起事件中，航空公司表示，在先後提供400和800美元代金券沒有乘客接受的情況下，它最終提供了價值1000美元的代金券。在被請求讓座的四名乘客中，陶醫生是唯一拒絕的人。'
}, {
  text: '如果你由於超售而非自願讓位，航空公司將：',
  answers: [
    { label: 'A', answer: '讓你保留原始機票，你可以使用這張機票進行下一次旅行，或者給你全額退款' },
    { label: 'B', answer: '補償你原始機票費用的200％至400％，具體取決於和原始到達時間相比，你延遲了多久' },
    { label: 'C', answer: '二者皆有' }
  ],
  answer: 'C',
  explanation: '依據被延遲送達目的地的時間長短，你可以獲得相當於票價200%至400%的賠償（最高1350美元）。美國運輸部(Department of Transportation)還要求航空公司向非自願讓位的乘客支付現金，因為代金券往往會在一年後作廢。運輸部曾經向無視其要求的航空公司開出罰單。不過，如果一家航空公司能在距離你原定時間一小時內將你送達，就不需要再向你做額外賠償。'
}, {
  text: '如果你已經登機，並且已經開始在小螢幕上觀看八部《哈利·波特》(Harry Potter)電影中的某一部，並且被選中讓出座位：',
  answers: [
    { label: 'A', answer: '你有權留在座位上，無論你被告知什麼' },
    { label: 'B', answer: '你將被從飛機上帶離（必要時用武力）' },
    { label: 'C', answer: '不詳' }
  ],
  answer: 'C',
  explanation: '航空公司有權阻止任何乘客登機，只是一旦乘客上了飛機，情況就複雜了。航空公司或許能以一大堆理由讓乘客下機。但就像陶醫生的情況一樣，機票超售沒有被列在聯合航空的《運輸總則》中。聯合航空和運輸部正在就此事進行調查，以決定這家航空公司拒載乘客之舉是否超出了其權利範圍。'
}, {
  text: '如果你的航班遭到大幅延遲或被取消：',
  answers: [
    { label: 'A', answer: '你最好儘可能地保持舒適，等待飛機起飛，並祈禱機場有一個瑪格麗塔維耶酒店' },
    { label: 'B', answer: '你可能會收到膳食券和酒店住宿費用，有權享受全額退款或重新預訂，無需支付額外費用，即使拿的是不可退款的機票' },
    { label: 'C', answer: '你可能會收到膳食券和酒店住宿費用，但無法獲得全額機票退款' }
  ],
  answer: 'B',
  explanation: '如同對「大幅延遲」的定義一樣，各家航空公司政策不一，但你一般會得到餐飲或住宿（如有需要）補償。'
}, {
  text: '如果你的飛機在停機坪上停留了兩個多小時：',
  answers: [
    { label: 'A', answer: '你可以使用廁所，但不要指望任何其他的' },
    { label: 'B', answer: '你可以使用廁所，每30分鐘收到機組人員的更新信息，並在兩小時後得到食物和水' },
    { label: 'C', answer: '你可以離開飛機，到瑪格麗塔維耶酒店等候，直到飛機準備起飛' }
  ],
  answer: 'B',
  explanation: '依據法律，航空公司不能讓你在停機坪上停留超過三個小時，而且在達到那個時長之前，必須提供相應的服務以保障你的生命安全。'
}]

const storeInfo = {
  state: {
    quiz,
    answer: [],
    answerCount: 0,
    questionNumber: 0,
    visited: []
  },
  mutations: {
    nextQuestion (state) {
      if (state.questionNumber < state.quiz.length - 1) {
        state.questionNumber++
      }
    },
    lastQuestion (state) {
      if (state.questionNumber > 0) {
        state.questionNumber--
      }
    },
    setQuestion (state, m) {
      state.questionNumber = m
    },
    select (state, m) {
      if (!state.answer[m.number]) {
        state.answerCount++
      }
      state.answer[m.number] = m.label
    },
    visit (state, m) {
      if (m < state.quiz.length) {
        state.visited[m] = 1
      }
    },
    cleanAnswer(state) {
      state.answer = []
      state.visited = []
      state.answerCount = 0
    }
  }
}

export default storeInfo;