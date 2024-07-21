# NPT Scheme Sketcher

This is an active travel [scheme sketcher](https://github.com/acteng/scheme-sketcher-lib) specialized for the [Scotland Network Planning Tool](https://github.com/nptscot/).

## Developer docs

This is a [Svelte](https://svelte.dev) app using TypeScript. To run locally, you'll need [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Clone the repo, then `npm i` to install dependencies, and `npm run setup-govuk` to do some one-time style setup. After that, `npm run dev` to start a local dev server that auto-reloads with code changes.

The main branch automatically deploys to GH Pages at <https://nptscot.github.io/scheme-sketcher> for every commit. To share experiments easily, git branches deploy to <https://nptscot.github.io/scheme-sketcher/BRANCH_NAME>.

Major dependencies include [scheme-sketcher-lib](https://github.com/acteng/scheme-sketcher-lib/), [route-snapper](https://github.com/dabreegster/route_snapper), and the [GOV.UK design system](https://design-system.service.gov.uk/).
