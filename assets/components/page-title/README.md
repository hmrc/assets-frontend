# Page title

What information to include in the page title. This is the `<title>` not the main heading or `<h1>`.

{{ example("page-title.html", scaled=false, cy=false, html=false) }}

## When to use this component

Use a unique page title on every page.

### When not to use this component

If there is personally identifiable information in the `<h1>`, replace it so is not recorded in Google Analytics.

For example, ‘What is Gordon's date of birth?’ could be ‘What is their date of birth?’ or ‘What is the child’s date of birth?’

## How it works

The page title can have 3 or 4 items separated by dashes. They are:

- the same `<h1>` as the page with any personally identifiable information replaced
- section name
- service name
- GOV.UK

Only include a section name if the service has more than one section.

{{ example("page-title.html", scaled=false, cy=false, html=false) }}

## Research on this component

This component is based on the format recommended by the Web Content Accessibility Guidelines. See [Providing descriptive titles for Web pages](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G88).

It is more accessible and is consistent with GOV.UK guidance pages.

All users will be able to use the title to know:

- what page they are on
- where that page is inside a service
- they are still on GOV.UK