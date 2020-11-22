import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../scss/style.scss"

const BlogIndex = ({ data, location }) => {
  /*
  return (
    <div>
      <div>test</div>
      <Link to={'hello-world/01'}>test</Link>
      <Link to={'hello-world/02'}>test</Link>
    </div>
  ) */

  // サイトタイトル => gatsby-config.js
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  
  const posts = data.allMarkdownRemark.nodes

  /*
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }*/

  return (
    //<Layout location={location} title={siteTitle}>
    <div>
      <SEO title="記事一覧" />
      <header className="header">
        <h1 className="header-title">記事一覧</h1> 
      </header>
      <Bio />
      <main class="main">
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2 className="article-title">
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <p>{post.frontmatter.postdate}</p>
                    <p>{post.frontmatter.updatedate}</p>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </main>
    </div>
    //</Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          postdate(formatString: "YYYY年 MM月 DD日")
          updatedate(formatString: "YYYY年 MM月 DD日")
          title
          description
        }
      }
    }
  }
`
