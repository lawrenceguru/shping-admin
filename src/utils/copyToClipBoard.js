import { toast } from 'react-toastify'
import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  const notify = () => toast.success(intl.get('widgets.expired.copyMessage', { str }), { draggablePercent: 100 })
  notify()
}
