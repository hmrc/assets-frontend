# There is a problem with the service

{{ wip(105) }}

This is a page that tells someone there is something wrong with the service. They are also known as 500 and internal service error pages.

{{ example("there-is-a-problem-with-the-service.html", scaled=true) }}

## When to use this pattern

Use this page when there is an unexpected problem with the service. Use the same page for all unexpected problems.

Log all errors and fix them as quickly as possible.

Only display the page for a short time. If a problem cannot be fixed quickly, close the service and use a [service unavailable page](/patterns/service-unavailable/index.html).

## How it works

Use the standard page template from your service and have the same:

- header
- phase banner
- footer

The page should have:

- “There is a problem with the service – [service name] – GOV.UK” as the page title
- “There is a problem with the service” as the H1
- “Try again later.” as a normal paragraph
- information about what has happened to their answers if they are in the middle of a transaction
- contact information, if it exists and helps meet a user need
- a link to another service, if they can use it to do what they came to do

Contact information should be either:

- be a link to a specific page that includes numbers and opening times
- include all numbers and opening times

Have clear and concise content and do not use:

- breadcrumbs
- words like 500 and bad request
- “We are experiencing technical difficulties”
- red text to warn people

### Service has a specific page that includes numbers and opening times

{{ example("there-is-a-problem-with-the-service.html", scaled=true) }}

### Service has offline support but no specific page that includes numbers and opening times

{{ example("there-is-a-problem-with-the-service-no-contact.html", scaled=true) }}

### A link to another service

{{ example("there-is-a-problem-with-the-service-link.html", scaled=true) }}

## Research on this pattern

The pattern was tested with 5 users. The user needs identified were to say:

- when the service will be available
- how they can do what they came to do

We cannot meet the first need because we do not know what has happened.

To meet the other need:

- say what someone needs to do if they need to speak to someone
- include a link to another service or contact information about offline support

{{ research(105) }}

We want to know:

- what people need to know
- what their expectations are after reading the page
- if people understand what is going on when they see the page
- if people need to know if this affects only them or other people too
- if people expect to see please and sorry