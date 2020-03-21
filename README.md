# COVID19-Worldwide-Stats
A Coronavirus COVID-19 global data statistics application - developed using React, Gatsby, Material UI, Recharts

### [Live Demo (view details by clicking lines and bars)](https://maxmaxinechen.github.io/COVID19-Worldwide-Stats/ "COVID-19 Worldwide Statistics")
<p align="center">
  <img height="500" src="https://github.com/maxMaxineChen/COVID19-Worldwide-Stats/blob/master/images/laptop.png" />
</p>

## Overview
The data of this statistics accessed from the [mathdroid API](https://github.com/mathdroid/covid-19-api), which serving data from John Hopkins University CSSE.

The [Live Demo](https://maxmaxinechen.github.io/COVID19-Worldwide-Stats/ "COVID-19 Worldwide Statistics") data gets updated every 8 hours automatically from a JSON file from [this Git Repo](https://github.com/maxMaxineChen/COVID-19-worldwide-json-data-script) by Github Actions.
Tech stack: React, Gatsby, Material UI, Recharts, Github Actions, Responsive design

## Getting Start

1.  **Clone.**

    ```shell
    git clone https://github.com/maxMaxineChen/COVID19-Worldwide-Stats.git
    ```

2.  **Install deps.**

    ```shell
    cd COVID19-Worldwide-Stats/
    npm install
    ```

3.  **Running**
    ```shell
    npm start 
    ```


    You can now view covid19-worldwide-stats in the browser with http://localhost:8000/ . View GraphiQL, an in-browser IDE, to explore your site's data and schema: http://localhost:8000/___graphql

4.  **Other Commands**
    ```shell
    npm run format
    # Format your code
    npm run lint
    # Eslint Airbnb without .jsx extension and without single quote
    ```

## Deploying

   The live demo uses Github Actions to update data/data.json file and deploy to branch gh-pages which hosted by Github page.

   If you like to know the detail of the workflow, check it out [deployUpdate.yaml](https://github.com/maxMaxineChen/COVID19-Worldwide-Stats/blob/master/.github/workflows/deployUpdate.yaml)

   If you like to know more about data source, check it out [this Git Repo](https://github.com/maxMaxineChen/COVID-19-worldwide-json-data-script)

## Todo

- [ ] Get Jest up and run some tests
- [ ] Extend data visualization features