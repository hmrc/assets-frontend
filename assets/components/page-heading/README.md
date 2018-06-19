# Page heading

The page heading is main heading of the page and an optional secondary heading.

{{ example("page-heading.html", scaled=false, cy=false, html=false) }}

## When to use this component

Use a page heading on every page.

## How it works

For accessibility reasons, every page must have a main heading coded as a `<h1>`.

Include a secondary heading, coded as a paragraph (`<p>`), if it helps people know where they are in a service. This is important for long services and those with more than one section.

Use this code so the `<h1>` and the secondary heading are:

- separate
- in the correct source order
- displayed the correct way
- read out the correct way

{{ example("page-heading.html", scaled=false, cy=false, html=true) }}

Change or remove the visually hidden content to meet your user needs.

If your service does not need a secondary heading, leave it out.

{{ example("page-heading-no-secondary.html", scaled=false, cy=false, html=true) }}

## Research on this component

Research into how the page heading was coded found many ways of doing it.

Some had the secondary heading above the `<h1>`. This means a screen reader user may never hear it.

Some had the secondary heading inside the `<h1>`. This gives different results depending on what screen reader you use. For example:

- VoiceOver – “Heading level onetwo items What is your name? Personal details” 
- NVDA – “Heading level one What is your name? Heading level one Personal details”
- JAWS – “What is your name? Personal details Heading level one”

The recommended code has been tested with screen reader users and all browsers, device and assistive technology combinations. Research showed it:

- displayed as expected
- worked consistently across different assistive technologies
- helped people know where they were in the service
- did not distract people from their task