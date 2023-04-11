import moment from 'moment'
import Moment from 'react-moment'

export const calculateTime = (createdAt) => {
  const today = moment(Date.now())
  const postDate = moment(createdAt)
  const diffInHours = today.diff(postDate, 'hours')

  if (diffInHours < 24) {
    return (
      <>
        Hôm nay <Moment format='hh:mmA'>{createdAt}</Moment>
      </>
    )
  } else if (diffInHours > 24 && diffInHours < 36) {
    return (
      <>
        Hôm qua <Moment format='hh:mmA'>{createdAt}</Moment>
      </>
    )
  }
  return <Moment format='DD/MM/yyyy hh:mmA'>{createdAt}</Moment>
}
