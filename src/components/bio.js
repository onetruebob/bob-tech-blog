/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
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

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const social = data.site.siteMetadata?.social

  return (
    <div
      className="bio"
      style={{
        display: `flex`,
        // marginBottom: rhythm(2),
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "1.5em",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "2em",
        boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.5)",
      }}
    >
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={75}
        height={75}
        quality={95}
        alt="Profile picture"
      />
      <div>
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
