# BarterX

<br/>

<p align="center">
  <img src="./client/src/assets/logo.png" width="20%" />
</p>

<p align="center">
  Innovating Exchange, Igniting Trade.
  <br />
  <br />
  <a href="#table-of-contents"><b>Explore the docs »</b></a>
  <br />
  <br />
  <a href="#architecture-and-design">Architecture</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#demonstration">Features</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#contributing">Local Setup</a>
  <br />
</p>



https://github.com/MohibSayed/BarterX/assets/95119784/f2e57a56-982c-47c6-b9b9-cf0257d4c0d9

## Table Of Contents

- [About the Project](#about-the-project)
- [Architecture](#architecture)
<!-- - [Demonstration & Features](#demonstration) -->
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

## About The Project

Traditional commerce lacks sustainable alternatives, leading to excessive unnecessary consumption and waste. Our society needs an innovative and sustainable solution/platform to empower individuals to exchange goods or items, promoting a more eco-friendly, community-oriented, conscious and responsible lifestyle.

Objectives:

- The primary objective of BarterX is to provide a user-friendly platform that facilitates meaningful exchanges of goods and services.
- Encourage users to swap items they no longer need, promoting a culture of sustainability and reducing unnecessary waste.
- Encourage regular engagement through features like one to one chats, and user proposals.
- Who says you need to know all the trends by name to shop? If you see something you like, take a picture, upload and start trading.


Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

A list of commonly used resources that I find helpful are listed in the acknowledgements.

## Architecture

The architecture and workflow was built using smartdraw.

<img src="./client/src/assets/architecture.png" alt="architecture">

<!-- ## Demonstration -->

<!-- ![Sign Up Page](image-12.png)
![Login Page](image-13.png)

![Landing Page](image.png)
(image-1.png)
(image-2.png)
(image-3.png)
(image-4.png)

![Home Page](image-5.png)
(image-6.png)
(image-7.png)
![Single Product Page](image-8.png)
(image-10.png)
(image-9.png)

![Publish Product Page](image-11.png) -->


### Technologies Used

- Workflow and Architecture Design
  - SmartDraw
- Frontend
  - React.js
  - CSS
- Backend
  - Node.js (Express.js)
  - MongoDB
- Machine Learning
  - pickle
  - Tensorflow_hub
  - Flask
  - sklearn


<br />

## Contributing

**Local Setup || Project Structure**

NOTE: Individual instructions can be found in respective directories.

- The project contains 4 broad directories.

```
*
├───client
├───server
└───flask
```

- `client`: The frontend for the application.
- `extension`: Chrome/Edge extension to keep a track of browser tabs.
- `model`: Model APIs for Machine Learning.
- `server`: The backend for the application.

<br />

**Client**

For local setup of frontend:
- `cd client`
- `npm i`
- `npm start`
- Go to `localhost:3000`

Structure

```
src
├───assets
├───Components
├───Pages
├───App.js
└───index.js
```

Individual Component & Pages Structure

```
component
├───component.jsx
└───component.css
```

```
Pages
├───page.jsx
└───page.css
```

<br />
<br />

**Server**

For local setup of backend:
- `cd server`
- `npm i`
- `npm start`

```
server
├───models
├───index.js
└───package.json
```

<br />
<br />

**Flask**

For local setup of flask:
- `cd flask`
- `npm i`
- `python embeddings_calc.py`

```
flask
├───data
└───embeddings_calc.py
```

<br />
<br />


## License

Distributed under the MIT License. See [LICENSE](https://github.com/MohibSayed/BarterX/blob/main/LICENSE.md) for more information.

## Authors

- Om Shete
  - [LinkedIn](https://www.linkedin.com/in/om-shete-25748522a/)
- Mohib Abbas Sayed
  - [LinkedIn](https://www.linkedin.com/in/mohib-abbas-sayed-83837422a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Hamza Sayyed
  - [LinkedIn](https://shorturl.at/hjAEI) 




