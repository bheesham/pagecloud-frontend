import referrers from 'referrers'
import geo from 'geo'
import unique from 'newandoldvisitors'
import bots from 'bots'
import pages from 'pages'


$(()=>{
  referrers()
  unique()
  bots()
  pages()
})
