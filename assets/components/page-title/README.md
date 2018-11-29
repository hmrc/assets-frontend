# Page title

The page title is the text displayed in the browser tab. It is the `<title>` not the [page heading](components/page-heading/index.html) or `<h1>`.

## When to use

Use a unique page title on every page.

## How it works

The page title can have 3 or 4 items separated by dashes. They are:

- the same `<h1>` as the page
- section name, which you should only include if the service has more than one section
- service name
- GOV.UK

Only include a section name if the service has more than one section.

{{ example("page-title.html", scaled=false, cy=false, html=false) }}

If the user makes an error, add ‘Error: ’ to the beginning of the title so screen readers read it out as soon as possible.

{{ example("page-title-error.html", scaled=false, cy=false, html=false) }}

### Personally identifiable information

If there is personally identifiable information in the `<h1>`, you must make sure it is not recorded in your analytics package.

For example, if the `<h1>` is ‘What is Gordon's date of birth?’, record ‘What is their date of birth?’.

To do this you could change the page title to use ‘their’ but keep ‘Gordon’ in the `<h1>`. Or you could keep ‘Gordon’ in the page title and send a different page title to your analytics package.

## Research

This guidance is based on the format recommended by the Web Content Accessibility Guidelines. See [Providing descriptive titles for Web pages](https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G88).

It is more accessible and is consistent with GOV.UK guidance pages.

All users will be able to use the title to know:

- what page they are on
- where that page is inside a service
- they are still on GOV.UK

We need more research. If you have used the page title, get in touch to share your research findings.

[Discuss the page title on GitHub](https://github.com/hmrc/design-patterns/issues/90)
