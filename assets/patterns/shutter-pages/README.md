# Shutter pages

<div class="alert alert--info">

This patterns is work in progress.

View the todo list for this pattern on [GitHub](https://github.com/hmrc/design-language-documentation/issues/103).

</div>

A shutter page is a page that is shown when a service has been switched off on purpose. These are different to [page not found](/pages/404-pages/index) and [technical difficulties](/pages/500-pages/index) pages.

## Shutter page design

Your service should have a general page that does not include the day, date and time so a service can be shuttered quickly, before the content can be updated. But the content should be updated as fast as possible.

The page should:

*   use the standard [page template](/pages/page-template/index)
*   include the phase banner relevent to the service
*   have "Service unavailable" as the page title and H1
*   be clear and concise
*   not have breadcrumbs
*   not use vague terms like maintenance or jargon
*   not use red text to warn people

Wherever possible, a shutter page should include:

*   the day, date and time the service is going to be back
*   other ways for someone to do what they need to do, if there are any

## Shutter page examples

*   [General page](#general-page)
*   [Day, date and time](#day-date-and-time)
*   [End of reporting period](#end-of-reporting-period)
*   [Closed forever](#closed-forever)
*   [Not available yet](#not-available-yet)

## General page

This is a placeholder that can be used quickly if there is no time to change the content.

### Example service that has a contact page on GOV.UK

{{ example('tc-general.html', true) }}