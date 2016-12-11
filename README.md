##PokeCheck

####Context and Features requirements
As part of hiring process, a webapp must be implemented in about one week.
The subject (see [pdf](https://github.com/Sharlaan/pokecheck/blob/master/Zen%20-%20Homework%20pokemon.pdf)) defines the following specifications for the webapp :
- [x] show users a pictured list of Pokémons where
- [x] one can search for a specific pokémon by name
- [x] one can select a pokémon to view its main characteristics
- [x] one can compare this selected Pokémon's characteristics with other pokémons of same type
- [ ] one can bookmark a given pokémon
- [ ] ... and a few bonuses depending on time left.

I added the following personal features :
- [x] pagination of the list
- [x] caching of already fetched data, so next visits will be almost instant, and user can consult site offline !
- [x] user can freely choose to display 20(default), 40 or 100 pokémons per page


####Product preview
- first version (incomplete) can be viewed online at this [address](http://pokecheck.surge.sh).  
Current version's caching [isnot accepted](http://pokecheck2.surge.sh) by browsers once deployed (check error in console), so can only be experienced locally (see Usage below)
![main list](https://github.com/Sharlaan/pokecheck/blob/master/PokeCheck_dev.png)
![details](https://github.com/Sharlaan/pokecheck/blob/master/PokeCheckDetails_dev.png)


####Tech stack:
I chose the following technologies :
- ES7
- fetch and Caches API
- React / Redux
- Webpack / Babel with Create-React-App
- Material-UI
- FlexboxGrid

I wished had enough time to try on Inferno, and WebWorkers/ServiceWorkers.

Images comes from official site Pokemon.com  
Data comes from pokeapi.com/v2  
All credits to them !

####Usage
```
git clone https://github.com/Sharlaan/pokecheck.git
cd pokecheck
npm i
npm start
```


####Notes
- since previous version were fetching paginated data, the requirement to show averages on Detail page couldnot be fulfilled.
This version fixes the issue in a progressive way:  
Step1 fetches all pokemon names/IDs, then Step2 fetches their details in background.  
This means you can't visualize average in chart till step2 is completely finished
The Circular Progress component displayed in List shows the progress % for Details fetching.  
The server pokeapi.co can even block temporarily requests with ERROR: TOO MANY REQUESTS message
- while first previous were relatively performant UX-wise, this isnot the case for this one:
the background fetching / caching takes its fair share from the main thread, slowing down the rendering...
I admit this is not ideal and may consider implementing WebWorkers + ServiceWorkers, hopefully should alleviate this rendering slowness issue.


####fetching times
20.6 mins for 4.6MB (822 requests)   
barely 2secs once all requests cached

Code for measuring from marks dispatched throughout the code:  
(copy code to console)
```
// Define first each measures:
const marks = performance.getEntriesByType('mark')
marks.map((m, idx) => {
  if (idx === 0) return m
  performance.measure('measure' + idx, marks[idx - 1].name, m.name)
})
// ... then display them
const measures = performance.getEntriesByType('measure')
measures.map(m => console.debug(m.name, m.duration))
```


####Useful links
#####Caching
[surge auto.appCache](https://davidwalsh.name/dont-wait-serviceworker-adding-offline-support-oneline)
While it sound nice and simple, i renounced from it when i learnt it's a "douchebag to use properly" from Jake Archibald, and will soon be deprecated in favor of Service Workers and Caches API.
[developers.google.com](https://developers.google.com/web/fundamentals/getting-started/primers/async-functions#example_outputting_fetches_in_order)
[Fetch API cache params](https://fetch.spec.whatwg.org#concept-request-cache-mode)

#####Responsive layout
[react-pure-grid](https://github.com/musyoka-morris/react-pure-grid) is nice and simple but [import bug not fixed](https://github.com/musyoka-morris/react-pure-grid/issues/1) at project release time...
[react-grid-layout](https://github.com/STRML/react-grid-layout) most complete but also more complex, too much for the remaining time available
final choice: [FlexBoxGrid](http://flexboxgrid.com/)
