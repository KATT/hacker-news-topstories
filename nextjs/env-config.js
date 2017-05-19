const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'GRAPHQL_URI': prod ? 'https://hacker-news-topstories-graphql.now.sh/graphql' : 'http://localhost:3020/graphql'
}
