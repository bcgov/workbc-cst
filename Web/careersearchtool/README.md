# Work BC Career Search Tool

This static site is generated with [GatsbyJS](https://gatsbyjs.org) whose docs are a great reference point. The readme is in this repo for quick reference.

Node version: 10.19.0.

Using NVM is recommended to manage node versions locally.

Once you have cloned this repo, run `yarn` or `npm i` from the project root to install dependencies.

Ensure your node version is right before doing this!

#### Environment variables

For this application to work, you must expose one environment variable: `GATSBY_API_URL` to access the .NET backend API.


#### Importing Environment Variables

Gatsby can source environment variables from any of the following depending on the context.

`.env.development`

`.env.production`

`.env.test`

the format of these files is:

```
GATSBY_API_URL=<.NET Backend API endpoint URL>
```
e.g. GATSBY_API_URL=https://localhost:5001

The only one used at build time is `.env.production`

To make environment variables available on the client, use the [GATSBY_ prefix](https://www.gatsbyjs.org/docs/environment-variables/)

#### Develop

`yarn start`

### Deployment

`yarn build`

The `/public` folder is ready to be served and contains the entry-point `index.html`

You can preview what this will look like with `yarn serve` after `yarn build`

Bear in mind that in order to access the backend production API, it must have API endpoint URL in an `.env.production` file that sits at project root (same level as this README file).

###### Push to S3

The `post-build` script in `package.json` will attempt to push the public folder to an S3 bucket. If you take no action, running yarn build will error at this step (the public folder is still built and ready to go, you can drag and drop to [Netlify](https://www.netlify.com/) for an easy deployment option). In order to use this feature, you must have AWS credentials saved in a config file on your local machine at `~/.aws/config` and `~/.aws/credentials`. Change the S3 bucket name in the `post-build` script to match your bucket.

#### Stylesheets

This applications makes use of SASS and CSS modules for readable and maintainable CSS. `<filename>.module.scss` is the naming convention. Each stylesheet exports an object that contains scoped styles, preventing global style conflicts. To add styles, create a new file with the naming convention above in the `src/styles` folder then import the exported object (can be imported with any name as it is the default export) and access those classes as properties of the object that will match the classes defined in the stylesheet. Eg:

```
import Styles from 'cardComponent.module.css';

function Card () {
  return (
    <div className={Styles.cardBody}>
      Card Content
    </div>
  )
}
```
```
/* cardComponent.module.css */

.cardBody {
  display: block;
}
```

#### Images

Adding Images to the `src/images` folder allows them to be preprocessed and optimized by Gatsby if you use `useStaticQuery` like in `src/components/loaderImg.jsx`. Good for larger images, otherwise just import the files directly like in `src/components/header.jsx`

#### Pages

Adding a file to the pages folder turns them into a page, just return some markup!


#### Handling Menu Items

Menu items are rendered in `src/components/desktopNav.jsx`. When there are infrequent changes to the menu on the main WorkBC site, changes can be done here too. Configuration is self-explanatory inside this file. For example, to add the 'Working During COVID-19' menu item from the main WorkBC site, add an entry between the 'Find Jobs' and 'Work in British Columbia' links.

```
const jobsCareersLinks = [
{ link: `${wbcUrl}Jobs-Careers/Find-Jobs.aspx`, text: 'Find Jobs' },
{ link: `${wbcUrl}Jobs-Careers/Working-During-COVID-19.aspx`, text: 'Working During COVID-19' },
{ link: `${wbcUrl}Jobs-Careers/Work-in-B-C.aspx`, text: 'Work in British Columbia' },
{ link: `${wbcUrl}Jobs-Careers/Explore-Careers.aspx`, text: 'Explore Careers' },
{ link: `${wbcUrl}Jobs-Careers/Career-Toolkit.aspx`, text: 'Career Toolkit' },
{ link: `${wbcUrl}Jobs-Careers/Find-Your-Fit-Tour.aspx`, text: 'Find Your Fit Tour' },
{ link: `${wbcUrl}Jobs-Careers/Success-Stories.aspx`, text: 'Success Stories' },
];
```
