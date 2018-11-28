# Open links in a new window or tab

This component lets the user open links in a new window or tab.

## When to use

First, design your service so that links open in the same window or tab and test with users. Research shows that some users struggle to get back to a service because the back button does not work in the new window or tab.

Only use this pattern if opening a link in a new window or tab meets a user need or is necessary to use the service. This could be because:

- the link is to a document in a different format, like a PDF
- the link is to guidance that cannot be inside the service
- the user would lose their details if they left the service
- the user needs to go to another site or service to get information

### When not to use

Do not use if opening a link in a new window or tab:

- does not meet a user need
- leads to more than one window or tab open within the same service
- stops the user completing their task

## How it works

{{ example("open-links-in-a-new-window-or-tab.html", scaled=false, cy=true, html=true) }}

Always put ‘(opens in a new window or tab)’ inside the link text content.

In the code include:

- `target="_blank"` to open in a new window or tab
- `rel="noopener noreferrer"` to reduce security risks for some browsers

Do not use any icons in place of the words. See ‘[Removing the external link icon from GOV.UK](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/)'.

## Research

We need more research. If you have used open links in a new window or tab, get in touch to share your research findings.

[Discuss open links in a new window or tab on GitHub](https://github.com/hmrc/design-patterns/issues/141)
