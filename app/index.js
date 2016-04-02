import referrers from './referrers'
import geo from './geo'
import unique from './unique'
import bots from './bots'
import pages from './pages'


$(()=>{
  referrers('referrers');
  geo('geo');
  unique('unique');
  bots('bots');
  pages('pages');
})
