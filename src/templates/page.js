import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import Header from "../components/header"
import Links from "../components/links"
import Footer from "../components/footer"
import "../scss/style.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFolder,
          faClock,
          faUndo,
          faTags,
          faChevronCircleLeft,
          faChevronCircleRight
        } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const BlogIndex = ({ data, pageContext }) => {

  const siteData = data.siteData;
  const postData = data.postData;
  const array = [];

  return (
    <div>
      <SEO
        title="記事一覧"
      />

      <Header
        headerTitle={siteData.siteMetadata.title}
        pageTitle="記事一覧"
        isTopPage={true}
        postCount={pageContext.postCount}
        currentPage={pageContext.currentPage}
        pageCount={pageContext.pageCount}
      />

      <main className="main">
        <section className="post-list">
          {postData.nodes.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <div key={post.id}
                className="post-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <p className="post-title">
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </p>

                <div className="info">
                  <div className="date">
                    <p className="post"><FontAwesomeIcon icon={faClock} />{post.frontmatter.postdate}</p>
                    <p className="update"><FontAwesomeIcon icon={faUndo} />{post.frontmatter.updatedate}</p>
                  </div>

                  <p className="category">
                    <FontAwesomeIcon icon={faFolder} /> <span>Category</span>
                    <Link to={`/category/${post.frontmatter.categorySlug}/page/1/`}>
                    {post.frontmatter.categoryName}</Link>
                  </p>

                  <p className="tags">
                    <FontAwesomeIcon icon={faTags} /> <span>Tag</span>
                    {post.frontmatter.tags.map(tag => {
                      return (
                        <Link 
                          to={`/tag/${tag}/page/1/`}
                          key={`${tag}`}
                        >
                          #{ tag }
                        </Link>
                      )
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </section>

        <div className="pagination">
          <div className="preButton">
            {!pageContext.isFirst && (
              <Link
                className="prev"
                to={
                  pageContext.currentPage === 2
                    ? `/page/1/`
                    : `/page/${pageContext.currentPage - 1}/`
                }
                rel = "prev"
                >
                <FontAwesomeIcon icon={faChevronCircleLeft} />
                  <span>Prev</span>
              </Link>
            )}
          </div>

          <div className="nationLinks">
            { Array.from({ length: pageContext.pageCount }, (_, i) => {
              if (pageContext.pageCount > 6) {
                // パージ数がたくさんある時

                if(pageContext.currentPage < 5) {
                  // 現在のページが1~4だった場合、
                  // 1~6と、最後のページを表示させる

                  if (i < 6 || i === pageContext.pageCount -1) {

                    array.push(i + 1)
                    return (
                      <div className="items">

                        {
                        /*
                        i + 1 < 6 && i + 1 === pageContext.currentPage
                          ? <p className="text">{pageContext.currentPage}</p>
                          : <p>
                            <Link to={`/page/${i + 1}/`}>
                              { i + 1 }
                              </Link>
                            </p>
                            */
                        }
                      </div>
                    )
                  }

                }
                
                if (pageContext.currentPage > 4 && pageContext.currentPage < pageContext.pageCount - 4) {
                  return (
                    <p>真ん中らへん</p>
                  )
                }



              } else {
                // ページ数がそんなにないとき
                return (
                  <div
                    className="items"
                    key={i}
                  >
                    {i + 1 === pageContext.currentPage
                      ? <p className="text">{ i + 1 }</p>
                      : <p className="link">
                          <Link to={`/page/${i + 1}/`}>
                            { i + 1 }
                          </Link>
                        </p>
                    }
                  </div>
                )
              }
            })}
          </div>

          {!pageContext.isLast && (
            <Link
              className="next"
              to={`/page/${pageContext.currentPage + 1}/`}
            >
              <span>Next</span>
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </Link>
          )}
        </div>

        <Links />
      
        </main>
      <Footer />
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query(
    $limit: Int!,
    $skip: Int!
    ) {
      siteData: site {
        siteMetadata {
          title
          description
        }
      }

      postData:
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___postdate],
            order: DESC,
          }
          limit: $limit,
          skip: $skip
        ) {
          nodes {
            id
            excerpt
            fields {
              slug
            }
            frontmatter {
              postdate(formatString: "YYYY年MM月DD日")
              updatedate(formatString: "YYYY年MM月DD日")
              categoryName
              categorySlug
              title
              tags
            }
          }
        }
      }
`
