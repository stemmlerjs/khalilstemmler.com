
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

    getPostsFromQuery: (posts) => {
      return posts.edges.map((edge) => edge.node)
      .map((node) => Object.assign(
        {}, node.frontmatter, node.fields)
      );
    },

    getCategoriesFromQuery: (categories) => {
      return _.uniq(
        categories.edges.map((edge) => edge.node)
        .map((node) => Object.assign(
          {}, node.frontmatter
        ))
        .map((c) => c.category)
        .sort()
      )
    },

    getTagsFromQuery: (tags) => {
      return _.uniq(tags.edges.map((edge) => edge.node)
        .map((node) => Object.assign(
          {}, node.frontmatter
        ))
        .reduce((acc, e) => acc.concat(e.tags), [])
        .sort()
      )
    }
  }

}