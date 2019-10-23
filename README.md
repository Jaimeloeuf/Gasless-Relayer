# Gasless Relayer
Relayer to provide Gasless transaction to users via meta transactions without the need for refund from the call receiver.  
This is currently a basic POC version of the relayer.  

---
## Installations, Builds and Running
Installing dependencies for running/deployment
```cli
$ npm i --production
```

Installing all dependencies including those for development
```cli
$ npm i
```

Building the documentation
- Note that you need to have devDependencies installed to build the docs
- Docs is built using JSDocs with Docdash template
- Open "./documentation/index.html" with a browser after building the documentation
```cli
$ npm run buildDocs
```

Running in deployment mode
- Will run with "node" without any resurrection software like forever
- Use this for places like Dockerfiles and others
```cli
$ npm run start
```

Run the project for development
- Requires devdependencies to be installed
```cli
$ npm run develop
```

---
## License, Author and Contributing
This project is developed under the "MIT License"  
Free to use this project as you see fit and do contribute your changes too!  
If you have any questions feel free to contact me via [email](mailto:jaimeloeuf@gmail.com)  
2019 - [Jaime Loeuf](https://github.com/Jaimeloeuf)