# Service unavailable

{{ wip(103) }}

This is a page that tells someone a service is unavailable. It should say when the service will be available or what to do if it is permanently closed.

{{ example('service-unavailable.html', true) }}

## When to use this pattern

Use a service unavailable page when a service has been closed on purpose. This could be for a specific period of time or permanently.

If there is a problem with the service, [use a technical problem page](/patterns/technical-problem/index.html).

Have a general page in case you need to quickly close a service. Update the page as soon as you know when the service will be available.

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- “Service unavailable – service name – GOV.UK” as the page title
- “Service unavailable” as the H1
- the day, date and time it is going to be available or what to do if it is permanently closed
- contact information, if it exists and helps meet a user need

Contact information should be either:

- a link to a specific GOV.UK contact page, not [contact HMRC](https://www.gov.uk/contact-hmrc) or [HM Revenue & Customs Contacts](https://www.gov.uk/government/organisations/hm-revenue-customs/contact)
- formatted like a GOV.UK contact page when there is no GOV.UK page

Have clear and concise content and do not use:

- breadcrumbs
- words like maintenance, improvements, please and sorry
- red text to warn people

### General page

{{ example('service-unavailable-general.html', true) }}

### When you know when a service will be available

{{ example('service-unavailable.html', true) }}

### Service is closed for part of the year

This is for a service like tax credit renewals.

#### After a service closes

{{ example('service-unavailable-after.html', true) }}

#### Before a service opens

{{ example('service-unavailable-before.html', true) }}

### Service is closed forever

#### Nothing has replaced the service

{{ example('service-unavailable-no-replacement.html', true) }}

#### Something has replaced the service

{{ example('service-unavailable-replacement.html', true) }}

## Research on this pattern

{{ research(103) }}

We want to know:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page