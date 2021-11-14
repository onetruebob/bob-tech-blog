/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 62, height: 62) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            linkedin
            github
            microblog
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "1.5em",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "2em",
        boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
        }}
      />
      <div style={{ display: "flex-column" }}>
        <p>
          <span role="img" aria-label="waving hand emoji">
            👋
          </span>{" "}
          Hi, I'm Bob. I'm a User Experience designer turned Front-end Software
          Engineer working{" "}
          <a href="https://www.forwardnetworks.com">@FwdNetworks</a> in Atlanta,
          GA. I love building effective and delightful user interfaces for
          organizations making a positive difference in the world.
        </p>
        <p style={{ marginBottom: 0 }}>
          You can also find me on{" "}
          <a href={`https://github.com/${social.github}`}>GitHub</a>,{" "}
          <a href={`https://www.linkedin.com/in/${social.linkedin}`}>
            LinkedIn
          </a>
          , <a href={`https://${social.microblog}.micro.blog`}>Micro.blog</a>,
          or <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
        </p>
      </div>
    </div>
  )
}

export default Bio
