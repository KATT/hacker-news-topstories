import { gql, graphql } from 'react-apollo'
import PostListItem from './PostListItem'

const POSTS_PER_PAGE = 10

function PostList ({ data: { hackerNewsTopStories, loading, _hackerNewsTopStoriesMeta }, expanded }) {
  if (!hackerNewsTopStories || !hackerNewsTopStories.length) {
    return <div>Loading..</div>
  }

  return (
    <section>
      <ul>
        {hackerNewsTopStories.map((post, index) =>
          <PostListItem key={post.id} post={post} expanded={expanded} />
        )}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}

const hackerNewsTopStories = gql`
  query hackerNewsTopStories($first: Int!) {
    hackerNewsTopStories(first: $first) {
      id
      title
      score
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(hackerNewsTopStories, {
  options: {
    variables: {
      first: POSTS_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data
  })
})(PostList)
