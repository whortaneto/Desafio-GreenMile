# [GreenMile Challenge]

[![GitHub release]

This project is a challenge proposed by GreenMile.

The callenge consists in do a simple web page with some properties:
- First a map using http://leafletjs.com/
- Bellow that a grid with a list of Jiu Jitsu schools, that shows School Name, Team Name, Address and Instructor Name.
  When a row of that grid was clicked the map will show the address of that school.

## [Code and modules]

### Javascript
- leaflet.js
  Library used to plot the map.
  
- app.js
  Here is where application logic was coded, where the grid and the map was instantiated
  
- dataGrid.js
  Pure javascript component that create a dynamic data table with infinite scroll pagination based in a data source.
  
### Html
- index.html
  Just have two divs, one for the map and one for the grid.

### Css
- leaflet-style.css
  Css used by the leaflet library to build the map.
  
- style.css
