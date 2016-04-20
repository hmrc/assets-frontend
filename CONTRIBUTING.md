# Assets Frontend Contributor Guidelines

Hello! Thank you for taking the time to contribute to the [HMRC Multichannel Digital Tax Platform](https://hmrc.github.io) (MDTP). Please take a few minutes to review the process and guidelines before you submit your request, otherwise it may be rejected. 

It is important to remember that an Issue and a Pull Request are a placeholder for a conversation between the Requestor and the Owning Team - people and interactions are more important than processes and tools. The Requestor should contact the Owning Team as soon as changes to the Repository are considered.

## Assets Frontend Contribution Process

1. The Owning Team stands ready for Pull Requests and reserves some per-team capacity to monitor, review, and test Pull Requests
2. The Requestor talks with the Owning Team about the proposed changes and ideally opens an Issue on the Repository 
3. The Owning Team informs the Requestor:
    * If the proposed change is unnecessary i.e. if the Repository already supports the desired outcome
    * If the proposed change is undesirable e.g. rejected in the past from a different Requestor
    * If the proposed change can be reviewed and released into production in a timeline acceptable to both the Requestor and the Owning Team
4. The Requestor:
    * Forks the Repository and makes the proposed changes - including new tests
    * Uses a branch name containing the JIRA ticket number e.g `FE-100-toggle-button-module`
    * Writes descriptive commit messages and prefixes them with the associated JIRA number e.g `FE-100: toggle button JavaScript functionality`
    * Runs the Repository [tests locally](README.md#running-js-tests) and ensures all tests pass 
5. Pushes their changes to their fork and raises a Pull Request
    6. Adds a descriptive title for the PR
    7. Adds relevant details in the Pull Request description:
        * A title
        * A description detailing the changes made and any links to issues, code examples and items of help
        * An image/gif at the top of the Pull Request detailing the functionality/look of the changes made
        * Please feel free to use [Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/) in your Pull Request
8. The Owning Team reviews the Pull Request according to the following criteria:
    * Can the changes be run and tested?
    * Do the changes clearly indicate what they are trying to achieve?
    * Are the changes aligned with our coding standards and our architectural approach?
    * Are the changes compatible with other in-flight changes to the Repository?
    * Do the changes introduce any new operational concerns e.g. performance, security?        
9. The Owning Team accepts or rejects the Pull Request with a comment
10. If rejected, the Requestor asks the Owning Team for feedback
11. If accepted, the Owning Team merges the changes into the Repository and creates a new release
   
After the merge, it is the joint responsibility of the Requestor and the Owning Team to:
   * discuss the optimal timing of pre-production and production releases
   * validate the functional and operational impact once the release reaches pre-production and production

It is the responsibility of the Owning Team alone to deploy/schedule the release into the relevant pre-production and production environment(s). 
