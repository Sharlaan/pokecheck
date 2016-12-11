
#####fetching times:
20.6 mins for 4.6MB (822 requests)

Code for measuring from marks dispatched throughout the code:
```
// Define first each measures:
const marks = performance.getEntriesByType('mark')
marks.map((m, idx) => {
  if (idx === 0) return m
  performance.measure('measure' + idx, marks[idx - 1].name, m.name)
})
const measures = performance.getEntriesByType('measure')
measures.map(m => console.debug(m.name, m.duration))
```

#####Caching
[surge auto.appCache](https://davidwalsh.name/dont-wait-serviceworker-adding-offline-support-oneline)
While it sound nice and simple, i renounced from it when i learnt it's a "douchebag to use properly" from Jake Archibald, and will soon be deprecated in favor of Service Workers and Caches API.
[developers.google.com](https://developers.google.com/web/fundamentals/getting-started/primers/async-functions#example_outputting_fetches_in_order)
[Fetch API cache params](https://fetch.spec.whatwg.org#concept-request-cache-mode)

#####Responsive layout
[react-pure-grid](https://github.com/musyoka-morris/react-pure-grid) is nice and simple but [import bug not fixed](https://github.com/musyoka-morris/react-pure-grid/issues/1) at project release time...
[react-grid-layout](https://github.com/STRML/react-grid-layout) most complete but also more complex, too much for the remaining time available
final choice: [FlexBoxGrid](http://flexboxgrid.com/)
