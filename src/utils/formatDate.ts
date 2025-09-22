import { formatRelative } from 'date-fns'
function formatDate(seconds?: number) {
  let formattedDate = ''

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date())

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  return formattedDate
}

export default formatDate
