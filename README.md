# Gasless Relayer
Relayer to provide Gasless transaction to users via meta transactions without the need for refund from the call receiver.  
This is currently a basic POC version of the relayer.  

---
## Installations, Builds and Running
This project requires a .env file which should be in repo root or, available in the directory you run the code from.  
The following configs are required in your .env file
```env
PORT=3000
PRIVATE_KEY=0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8
WEB3_PROVIDER_URL=https://mainnet.infura.io/YOUR_API_KEY
```

Installing dependencies for running/deployment
```shell
npm i --production
```

Installing all dependencies including those for development
```shell
npm i
```

For testing purposes mocha is used, either global or local versions of mocha can be used.
```shell
npm i -g mocha # Install mocha globally
mocha # Run the global mocha cli to run tests
```

For local testing
```shell
npm run test # Use the test script, which uses local mocha.
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

Building the documentation
- Note that you need to have devDependencies installed to build the docs
- Docs is built using JSDocs with Docdash template
- Open "./documentation/index.html" with a browser after building the documentation
```cli
$ npm run buildDocs
```

## Documentation
As mentioned in the section above, you can either build the latest documentation yourself locally, or alternatively, you can view it [here on github pages](https://jaimeloeuf.github.io/Gasless-Relayer/)


---
## License, Author and Contributing
This project is developed under the "MIT License"  
Free to use this project as you see fit and do contribute your changes too!  
If you have any questions feel free to contact me via [email](mailto:jaimeloeuf@gmail.com)  
2019 - [Jaime Loeuf](https://github.com/Jaimeloeuf)