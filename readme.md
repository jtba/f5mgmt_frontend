# F5 Manager Frontend Interface

Having trouble managing multiple F5s? This UI was created to streamline the process of changing the state of pool members across multiple F5 instances. While most useful for multiple F5's, the tool still makes it easy to manage a single instance.  

![screenshot](https://github.com/jtba/f5mgmt_frontend/blob/master/docs/f5mgmt_frontend1.png)

## Getting Started

This application requires the [Backend API](https://github.com/jtba/f5mgmt_backend) in order to function properly. It is advised that you start with the backend first before attempting to run the frontend.

### Prerequisites

* NodeJS
* [F5 Management Backend API](https://github.com/jtba/f5mgmt_backend)

### Installing

1. Pull the repo down
2. Docker and Vagrant files have been included but require further modification before they can be used. Please see notes.
3. Start the instance by executing 
```
node server.js
```

## Authors

* **Jason Baldwin** - *Initial work* - [JTBA](https://github.com/jtba)

## Acknowledgments

* Thanks to all of the third party libraries that have brought this project so far
