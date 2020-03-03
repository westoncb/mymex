# Mymex

Mymex[0] is an application designed for quick retreival of information from a variety of (web/local) data sources. One of its main goals is to make pieces of information located on the web easier and more reliable to return to. It does this by: 

- automatically storing local renderings of web resources
- allowing tags and notes to be attached to web resources

The first feature means you won't lose access to the resource if it becomes unavailable online. The second provides a more powerful/flexible way of searching for resources later (via tags), and remembering why you wanted the resource saved in the first place (via notes).

Another goal of Mymex is to "unify" online / offline information resources. It does this by working with a configurable set of "data sources," some of which my point to web resources, others of which point to local resources. For web resources, you can point it to a Chrome bookmarks file and it will import all the URLs etc. For local resources you can point it to a directory, and all of its recursive contents will be imported. In both cases Mymex continues watching the "data source" for changes (i.e. new items being added, old being removed).

This is my first solo React project: part of why I'm building it is to learn React more deeply.

[0] The name is still under construction (hence the repo being named "Memex" and not "Mymex"). The reference in the name is to the "proto-hypertext system" <a href="https://en.wikipedia.org/wiki/Memex">Memex</a>

## Tech

Mymex is being written using JS, React, Electron, webpack, BlueprintJS, and NeDB.

## To run

You will need:
- A version of node >= 10.x
- Yarn (NPM may work fine, but I haven't tested it)

After cloning the repo:

```
yarn install
yarn start
```
## Screenshots

<img src="/media/screens/screen1.png?raw=true" width="400">

<img src="/media/screens/screen2.png?raw=true" width="400">

<img src="/media/screens/screen3.png?raw=true" width="400">
