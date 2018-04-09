# Open links in a new window or tab

How to display links that open in a new window or tab.

{{ example("open-links-in-a-new-window-or-tab.html") }}

## When to use this component

Start with opening all links in the same window or tab and test with your users. Research shows some people struggle to get back to a service because the back button does not work in the new window or tab.

Use this component if your testing shows you need to open a link in a new window or tab, it meets a user need and is necessary. This could be because:

- the link is to a document in a different format, like a PDF
- the link is guidance that cannot be inside the service
- they would lose their details if they left the service
- they need go to another site or service to get some information

### When not to use this component

If opening a link in a new window or tab:

- does not meet a user need
- leads to multiple windows or tabs for the same service
- stops people completing their task

Do not use any icons in place of the words. See ‘[Removing the external link icon from GOV.UK](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/)'.

## How it works

Always put ‘(opens in a new link or window)’ inside the link text content.

In the code include:

- target="_blank" top open in a new window or tab
- rel="noopener noreferrer" to reduce security risks for some browsers

{{ example("open-links-in-a-new-window-or-tab.html") }}

{{ markup("open-links-in-a-new-window-or-tab.html") }}

## Research on this component

This component is based on the format recommended by the Web Content Accessibility Guidelines in [Giving users advanced warning when opening a new window](https://www.w3.org/TR/WCAG20-TECHS/G201.html).

All users will know a link will open in a new window or tab without needing to:

- read another part of the screen
- understand an icon
