import App from '../components/App'
import Header from '../components/Header'
import PostList from '../components/PostList'
import withData from '../lib/withData'

export default withData(props => {
  const expanded = (props.url.query.expand || '').split(',').filter(id => id).map(Number)

  return (
    <App>
      <Header pathname={props.url.pathname} />
      <PostList expanded={expanded} />
    </App>
  )
})
