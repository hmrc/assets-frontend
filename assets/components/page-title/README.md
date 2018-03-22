# Page title

What information to include in the page title. This is the `<title>` not the main heading or `<h1>`.

{{ example("page-title.html") }}

## When to use this component

Use a unique page title on every page.

### When not to use this component

If there is personally identifiable information in the `<h1>` replace it so is not recorded in Google Analytics.

For example, ‘What is Gordon's date of birth?’ could be ‘What is their date of birth?’ or ‘What is the child’s date of birth?’

## How it works

The page title can have 3 or 4 items separated by dashes.

1. The same `<h1>` as the page with any personally identifiable information replaced.
2. Section name. This should only be used with long services and those with multiple sections.
3. Service name.
4. GOV.UK

{{ example("page-title.html") }}

{{ markup("page-title-markup.html") }}

## Research on this component

This component is based on the format recommended by the Web Content Accessibility Guidelines in [Providing descriptive titles for Web pages](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G88).

It is more accessible and is consistent with GOV.UK guidance pages.

All users will be able to use the title to know:

- what page they are on
- where that page is inside a service
- they are still on GOV.UK