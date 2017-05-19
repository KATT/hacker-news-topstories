import _ from 'lodash';

export const schema = [`
type HackerNewsStory {
  id: Int!
  title: String!
}

type HackerNewsUser {
  id: Int!
}

enum HackerNewsTopStoriesSort {
  RANDOM
}

`];

export const resolvers = {
  Query: {
    async hackerNewsTopStories(root, {sort, limit, offset}, context) {
      let ids = await context.HackerNewsStories.getTopStoriesIds();

      if (sort === 'RANDOM') {
        ids = _.shuffle(ids);
      }
      if (limit) {
        ids = _.slice(ids, 0, limit);
      }

      return ids.map(id => ({
        id,
        title: () => context.HackerNewsStories.getById(id).then(({title}) => title)
      }))
    }
  }
};
