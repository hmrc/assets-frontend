# Shutter pages

<div class="alert alert--info">

<p class="alert__message">This pattern is work in progress.</p>
<p class="alert__message">View the todo list for this pattern on [GitHub](https://github.com/hmrc/design-patterns/issues/103).</p>

</div>

A shutter page is a page that is shown when a service has been switched off on purpose. These are different to [page not found](/pages/404-pages/index) and [technical difficulties](/pages/500-pages/index) pages.

{{ example('default.html', true) }}

## When to use a Shutter Page

Your service should have a general page that does not include the day, date and time the service will be avalible again. You should use this version of the Shutter Page if you need to shutter your service quickly.

When this Shutter Page is used the content should be updated as fast as possible and should tell users when the service will be avalible again..

## How Shutter Pages work

The page should:

- use the standard [page template](/components/page-template/index)
- include the phase banner relevent to the service
- have "Service unavailable" as the page title and H1
- be clear and concise
- not have breadcrumbs
- not use vague terms like maintenance or jargon
- not use red text to warn people

Wherever possible, a shutter page should include:

- the day, date and time the service is going to be back
- other ways for someone to do what they need to do, if there are any

### Shutter page examples

- [General page](#general-page)
- [Day, date and time](#day-date-and-time)
- [End of reporting period](#end-of-reporting-period)
- [Closed forever](#closed-forever)
- [Not available yet](#not-available-yet)

### General page

This is a placeholder that can be used quickly if there is no time to change the content.

#### Example service that has no offline support

{{ example('default.html', true) }}

#### Example service that has a contact page on GOV.UK

{{ example('general-tc.html', true) }}

#### Example service that has a contact number, but no contact page

{{ example('general-ei.html', true) }}

### Day, date and time

This includes the helpful day, date and time information when a service will be available.

#### Example service that has a contact page on GOV.UK

{{ example('shutter-tc.html', true) }}

#### Example service that has a contact number, but no contact page

{{ example('shutter-ei.html', true) }}

#### Example service that has no offline support

{{ example('shutter-amls.html', true) }}

### End of reporting period

This is for a service, like tax credit renewals, that is only open for part of the year.

#### Example service that has a contact page on GOV.UK

{{ example('closed-tc.html', true) }}

### Example service that has a contact number, but no contact page

{{ example('closed-ei.html', true) }}

### Example service that has no offline support

{{ example('closed-amls.html', true) }}

### Closed forever

You should try and provide information about what has replaced it or what people need to do if they have outstanding questions.

#### Example service that has a contact page on GOV.UK

{{ example('permanent-tc.html', true) }}

#### Example service that has a contact number, but no contact page

{{ example('permanent-ei.html', true) }}

#### Example service that has no offline support

{{ example('permanent-amls.html', true) }}

### Not available yet

This is for a service that has not opened yet. This could be for tax credit renewals, which opens in April, or for a service that has been published but is not open until a specific day. These pages may be the same as the day, date and time pages.

#### Example service that has a contact page on GOV.UK

{{ example('notyet-tc.html', true) }}

#### Example service that has a contact number, but no contact page

{{ example('notyet-ei.html', true) }}

#### Example service that has no offline support

{{ example('notyet-amls.html', true) }}

## Research on Shutter Pages

We need more user research on Shutter Pages. 

We want to know:

- if people understand what is going on
- what peoples expectations are having seen a shutter page

Contribute your research via this [GitHub issue](https://github.com/hmrc/design-patterns/issues/103).

