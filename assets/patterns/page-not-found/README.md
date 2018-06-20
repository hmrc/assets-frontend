# Page not found

A page not found tells someone we cannot find the page they were trying to view. They are also known as 404 pages.

{{ example("page-not-found.html", scaled=false, cy=false, html=false) }}

## When to use this pattern

Use a page not found if someone is trying to view a page that does not exist. This happens if someone:

- selects a link or button that takes them to a page that does not exist
- types or copies a web address for a page that does not exist
- types or copies a web address incorrectly

Test all links and buttons to make sure work. Remember to [do the hard work to make it simple](https://www.gov.uk/guidance/government-design-principles#do-the-hard-work-to-make-it-simple).

Make sure any web addresses in your service, letters, forms and on GOV.UK are for pages that exist or redirect to pages that exist.

For example, if someone has bookmarked a confirmation or a page in the middle of a journey:

- explain that the information or page is no longer available
- give them a link or button to get to a sensible place in the service

## How it works

The page should have:

- “Page not found – service name – GOV.UK” as the page title
- “Page not found” as the H1
- contact information, if it exists and helps meet a user need

Contact information should either:

- be a link to a specific page that includes numbers and opening times
- include all numbers and opening times

The content should be clear and concise and not blame the user.

Do not use:

- breadcrumbs
- technical jargon like 404 or bad request
- informal or humorous words like oops
- red text to warn people

### Service error

{{ example("page-not-found.html", scaled=false, cy=true, html=false) }}

Use this version when you know the page not found is because of a broken link or button from inside the service. Include a back link at the top of the screen.

### User or unknown error

Use this version when you know the page not found is because of a user error or you do not know what caused it. This could be a link or button outside the service or the user typed or pasted the web address incorrectly.

{{ example("page-not-found-user.html", scaled=false, cy=true, html=false) }}

### The page exists but is no longer available

Use this version if the page exists but cannot be display. This could be a page in the middle of a journey or a confirmation page. Give a link to a sensible place in the service.

{{ example("page-not-found-link.html", scaled=false, cy=true, html=false) }}

## Research on this pattern

{{ research(104) }}

We want to know if people:

- can fix the problem on their own
- understand what has happened
- understand the content and if there is anything missing
- would use report a page not found if they could