import _ from 'underscore'

export default {
  blog: {
    /**
     * getPostsFromQuery
     *
     * Returns all the data that we need
     * from frontmatter and fields for blog posts.
     *
     */

    getPostsFromQuery: posts => {
      if (posts) {
        return posts.edges
          .map(edge => edge.node)
          .map(node => Object.assign({}, node.frontmatter, node.fields))
      }

      return []
    },

    getCategoriesFromQuery: categories => {
      if (categories) {
        return _.uniq(
          categories.edges
            .map(edge => edge.node)
            .map(node => Object.assign({}, node.frontmatter))
            .map(c => c.category)
            .sort()
        )
      }
      return []
    },

    getTagsFromQuery: tags => {
      if (tags) {
        return _.uniq(
          tags.edges
            .map(edge => edge.node)
            .map(node => Object.assign({}, node.frontmatter))
            .reduce((acc, e) => acc.concat(e.tags), [])
            .sort()
        )
      }

      return []
    },
  },
}
