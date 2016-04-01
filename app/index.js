import referrers from './referrers'
import geo from './geo'
import unique from './unique'
import bots from './bots'
import pages from './pages'


$(()=>{
  referrers('referrers')
  unique('unique')
  bots('bots')
  pages('pages')
})
