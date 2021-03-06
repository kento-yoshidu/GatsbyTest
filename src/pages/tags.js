import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import SEO from "../components/seo"
import Footer from "../components/footer"

const Tags = ({ data, location }) => {

  const tags = data.allMarkdownRemark.group

  return (
    <div>
      <SEO
        title="タグ一覧"
      />

      <Header
        headerTitle="鳥に生まれることができなかった人へ"
        pageTitle="タグ一覧"
        isArticle={ true }
      />


      <main className="main tagsMain">
        <ul className="tagList">
          {tags.map(tag => {
            return (
              <li className="listItem">
                <Link to={`/tag/${tag.fieldValue}/page/1/`}>
                  { tag.fieldValue }({ tag.totalCount })
                </Link>
              </li>
            )
          })}
        </ul>
      </main>

      <Footer />
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
      group(field: frontmatter___tags, limit: 1) {
        nodes {
          frontmatter {
            tags
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
