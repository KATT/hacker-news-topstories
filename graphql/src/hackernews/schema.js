import _ from 'lodash'

export const schema = [`
type HackerNewsStory {
  id: Int!
  title: String!
  url: String
  score: Int!
  time: Int!
  by: HackerNewsUser!
}

type HackerNewsUser {
  id: String!
  karma: Int!
}

enum HackerNewsTopStoriesSort {
  RANDOM
}

`]

// fields that can be copied straight over from api
const STORY_COPY_FIELDS = [
  'title',
  'url',
  'score',
  'time'
]
const AUTHOR_COPY_FIELDS = [
  'karma'
]

const authorResolver = (context, id) => ({
  id,
  // create resolvers for fields that can be copied straight over from api
  ...AUTHOR_COPY_FIELDS.reduce((prev, key) => ({
    ...prev,
    [key]: context.HackerNewsUsers.getById(id).then(story => story[key])
  }), {})
})

const storyResolver = (context, id) => ({
  id,
  // create resolvers for fields that can be copied straight over from api
  ...STORY_COPY_FIELDS.reduce((prev, key) => ({
    ...prev,
    [key]: context.HackerNewsStories.getById(id).then(story => story[key])
  }), {}),
  by: context.HackerNewsStories.getById(id).then(({by}) => authorResolver(context, by))
})

export const resolvers = {
  Query: {
    async hackerNewsTopStories (root, args, context) {
      const {sort, first, offset = 0} = args

      let ids = await context.HackerNewsStories.getTopStoriesIds()

      if (sort === 'RANDOM') {
        ids = _.shuffle(ids)
      }
      if (first) {
        ids = _.slice(ids, offset, first)
      }

      return ids.map(id => storyResolver(context, id))
    },
    async hackerNewsStory (root, {id}, context) {
      return storyResolver(context, id)
    }
  }
}
