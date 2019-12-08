import Typography from "typography"
import GithubTheme from "typography-theme-github"

GithubTheme.overrideThemeStyles = ({ rhythm }) => ({
  h1: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
    marginBottom: rhythm(3 / 4),
    marginTop: rhythm(1.5),
  },
  h2: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
    marginBottom: rhythm(1 / 4),
    marginTop: rhythm(1),
  },
  blockquote: {
    borderLeft: "4px solid white",
    color: "white",
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    paddingLeft: `calc(${rhythm(1 / 2)} - 1px)`,
  },
})

const typography = new Typography(GithubTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
