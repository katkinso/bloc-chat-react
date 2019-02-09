import moment from 'moment' 


const convertDateTime = (timestamp) => {

    const currentDay = moment(timestamp).format('MMMM Do YYYY')
    const today = moment().format('MMMM Do YYYY')
    const yesterday = moment().subtract(1, 'day').format('MMMM Do YYYY')


    if (currentDay  === yesterday){
        return 'Yesterday ' + moment(timestamp).format('h:mm a')
    }

    if (currentDay < today) {
      return moment(timestamp).format('MMMM Do YYYY h:mm a')
    }

      return moment(timestamp).format('h:mm a')
}

export { convertDateTime } 