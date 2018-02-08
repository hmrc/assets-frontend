# Technical problem

{{ wip(105) }}

This is a page that tells someone there is something wrong with the service. They are also known as 500 pages.

{{ example("technical-problem-page.html", scaled=true) }}

## When to use a technical problem page

Use a technical problem page when there is an unexpected problem with the service. Use the same page for all  technical problems.

Log all errors and fix them as quickly as possibly.

Only display the page for a short time. If a problem cannot be fixed quickly, close the service and use a [service unavailable page](/patterns/service-unavailable/index.html).

## How a technical problem page works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- “There is a problem with the service – [service name] – GOV.UK” as the page title
- “There is a problem with the service” as the H1
- “Try again later.” as a lede paragraph
- contact information, if it exists and helps meet a user need

Contact information should be either:

- a link to a specific GOV.UK contact page, not [contact HMRC](https://www.gov.uk/contact-hmrc) or [HM Revenue & Customs Contacts](https://www.gov.uk/government/organisations/hm-revenue-customs/contact)
- formatted like a GOV.UK contact page when there is no GOV.UK page

Have clear and concise content and do not use:

- breadcrumbs
- words like 500, bad request, please, sorry and “We are experiencing technical difficulties”
- red text to warn people

### Service has a GOV.UK contact page

{{ example("technical-problem-page.html", scaled=true) }}

### Service has offline support but no GOV.UK contact page

{{ example("technical-problem-page-no-contact.html", scaled=true) }}

## Research on technical problem pages

{{ research(105) }}

We want to know:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page
- if people expect to see please and sorry