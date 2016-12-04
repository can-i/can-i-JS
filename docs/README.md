# Can I JS
*The yes framework!!*

## Overview {#overview}

Can-I is a Web Framework that seeks to make creating backend api very easy. 
It provides some addtional features as well as being completely built in typescript.

<div><a target="_blank" href="/classes/index.html">Classes Documentation</a></div>

## Installing {#Installation}

Install the Can-I framework using npm

```
npm install can-i
```


The framework focuses on giving good standards, but providing the flexibility to change the 
standards if there is a need for this. For most project this will no be neccessary.
The only potential case is if the structure is also being used by a third-party tool.

#### Structure {#structure}

- controllers
- services
- views
- index.ts


#### Controllers
This layout is very easy to understand and to implement. The aim is the have the directory self explaining.
The *controllers* directory will contain all of your controllers and the logic of the application

#### Services
Services are standalone classes but additional attributes can be added to them to give extra features. 
This is a very powerful tool that will be revisted later.

#### Views
This is where template files will go that are used for server-side rendering 


#### index.ts
This is the entry point for you application. The file doesn't have to be named index.ts, but it is
standard to name it as such