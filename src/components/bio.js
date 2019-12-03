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
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 57, height: 62) {
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
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          // borderRadius: `100%`,
        }}
        imgStyle={
          {
            // borderRadius: `50%`,
          }
        }
      />
      <div style={{ display: "flex-column" }}>
        <p>
          👋 Hi, I'm Bob. I'm a former User Experience designer turned Front-end
          Software Engineer working{" "}
          <a href="https://www.pindrop.com">@Pindrop</a> in Atlanta, GA. I love
          building effective software user interfaces that people enjoy using.
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
