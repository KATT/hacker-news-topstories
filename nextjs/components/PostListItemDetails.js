import { gql, graphql } from 'react-apollo'

function PostListItemDetails ({ data: { hackerNewsStory, loading } }) {
  if (!hackerNewsStory || loading) {
    return <div>Loading..</div>
  }

  const {
    url,
    score,
    time,
    by: {
      id: byId,
      karma
    }
  } = hackerNewsStory

  return (
    <ul>
      <li><strong>time:</strong> {new Date(time * 1000).toString()}</li>
      <li><strong>url:</strong> {url ? <a href={url}>{url}</a> : 'n/a'}</li>
      <li><strong>score:</strong> {score}</li>
      <li><strong>author:</strong> {byId}</li>
      <li><strong>author karma:</strong> {karma}</li>
    </ul>
  )
}

const hackerNewsStory = gql`
  query hackerNewsStory($id: Int!) {
    hackerNewsStory(id: $id) {
      id
      title
      url
      score
      time
      by {
        id
        karma
      }
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostListItemDetails)
export default graphql(hackerNewsStory, {
  options: ({ post }) => ({ variables: { id: post.id } }),
  skip: props => !props.isExpanded,
  props: ({ data }) => ({
    data
  })
})(PostListItemDetails)
