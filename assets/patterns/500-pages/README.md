# 500 Pages

{{ wip(105) }}

500 pages are used to tell users that we [HMRC] have a problem that was not their fault.

{{ example('500-page.html', true) }}

## When to use a 500 page 

They cover a range of situations when something has gone wrong with the server.

500 errors should be logged by services and fixed as a matter of priority.

500 errors should only be displayed to people for a short time. The standard approach within HMRC is to [shutter](shutter-pages/index.html) a service, if there is going to be a disruption to users for an extended period of time.

There are a number of [standard pages](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_error) that fall into the category of 500 pages. We do not need different error pages to cover all of these situations.

## How 500 pages work

When displaying a 500 page you should:

- use the standard template
- explain to users whats going on
- tell users what they can do, if anything to resolve the issue.
- If there is an alternative channel that they can use to continue their transaction this should be made available to them.

### Example 500 page when there is an alternative channel

{{ example('500-page-alternative-channel.html', true) }}

## Research on 500 pages

We need more user research on 500 Pages. 

We want to know:

- if people understand what is going on
- what peoples expectations are having seen a 500 page

Contribute your research via this [GitHub issue](https://github.com/hmrc/design-patterns/issues/105).
