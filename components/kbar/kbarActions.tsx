/* 
TODO:
*/

export const redirect = (page:any, slug:string, anchor:string) => {

  if (slug === "") {
    if (page === "/")
    {
      slug = ""
    }
    else 
    {
      slug = "../"
    }
  }

  if (anchor === "") { page.href = `${slug}`}
  else {page.href = `${slug}#${anchor}`}
}

export const contactActions:any = [
  {
    id: "email",
    name: "Email",
    section: "Contact",
    perform: () => (window.open(
      "mailto:parzerphilipp@gmail.com"
    )
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    section: "Contact",
    perform: () => (window.open(
      "https://www.linkedin.com/in/philipp-parzer/",
      '_blank'
    )
    ),
    
  },
  {
    id: "github",
    name: "Github",
    section: "Contact",
    perform: () => (window.open(
      "https://github.com/philparzer",
      '_blank'
    )
    ),
  },
  {
    id: "twitter",
    name: "Twitter",
    section: "Contact",
    perform: () => (window.open(
      "https://twitter.com/philipp_parzer",
      '_blank'
    )
    ),
  },

]

export const legalActions:any = [
  {
    id: "imprint",
    name: "Imprint",
    section: "Legal",
    perform: () => (redirect(window.location, "imprint", "")),
  },

  {
    id: "gdpr",
    name: "GDPR",
    section: "Legal",
    perform: () => (redirect(window.location, "imprint", "")),
  },
]