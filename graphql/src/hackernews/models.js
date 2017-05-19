export class HackerNewsStories {
  constructor ({ connector }) {
    this.connector = connector
  }

  getById (id) {
    return this.connector.get(`/v0/item/${id}.json`)
  }

  getTopStoriesIds () {
    return this.connector.get(`/v0/topstories.json`)
  }
}

export class HackerNewsUsers {
  constructor ({ connector }) {
    this.connector = connector
  }

  getById (id) {
    return this.connector.get(`/v0/user/${id}.json`)
  }
}
