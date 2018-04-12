# Service unavailable

This is a page that tells someone a service is unavailable on purpose. These are also known as 503 and shutter pages.

{{ example('service-unavailable.html', scaled=false) }}

## When to use this pattern

Use a service unavailable page when a service has been closed on purpose. This could be for a specific period of time or permanently.

If there is a problem with the service, [use a technical problem page](/patterns/technical-problem/index.html).

Have a general page in case you need to close a service and do not have time to update the page. As soon as you know when the service will be available, update the page.

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- “Service unavailable – service name – GOV.UK” as the page title
- “Service unavailable” as the H1
- the day, date and time it is going to be available or what to do if it is permanently closed
- information about what has happened to their answers if they are in the middle of a transaction
- contact information, if it exists and helps meet a user need
- a link to another service, if they can use it to do what they came to do

Contact information should either:

- be a link to a specific page that includes numbers and opening times
- include all numbers and opening times

Have clear and concise content and do not use:

- breadcrumbs
- vague, unhelpful words like maintenance and improvements
- red text to warn people

### General page

{{ example('service-unavailable-general.html', false) }}

### When you know when a service will be available

{{ example('service-unavailable.html', false) }}

### A link to another service

{{ example('service-unavailable-link.html', false) }}

### Service is closed for part of the year

This is for a service like tax credit renewals.

#### After a service closes

{{ example('service-unavailable-after.html', false) }}

#### Before a service opens

Do not include any contact information.

{{ example('service-unavailable-before.html', false) }}

### Service is closed forever

#### Nothing has replaced the service

{{ example('service-unavailable-no-replacement.html', false) }}

#### Something has replaced the service

{{ example('service-unavailable-replacement.html', false) }}

## Research on this pattern

This pattern was tested with 5 users. The user needs identified were to say:

- when the service will be available
- how they can do what they came to do

To meet the needs:

- give clear information about when the service will be available again
- if the service has closed forever, what has replaced it
- say what someone needs to do if they need to speak to someone
- include a link to another service or contact information about offline support

{{ research(103) }}

We want to know:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page