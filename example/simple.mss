/* Simple CartoCSS stylesheet example */

/* Style for the map background */
Map {
  background-color: #b8dee6;
}

/* Style for countries layer */
#countries {
  ::outline {
    line-color: #85c5d3;
    line-width: 2;
    line-join: round;
  }
  polygon-fill: #fff;
}

/* Style for populated places */
#places[type='city'] {
  marker-width: 10;
  marker-fill: #f45;
  marker-line-color: #813;
  marker-allow-overlap: true;
  marker-line-width: 2;
  
  /* Larger markers for bigger cities */
  [population > 1000000] {
    marker-width: 16;
  }
  
  /* Labels for cities */
  text-name: [name];
  text-face-name: 'DejaVu Sans Book';
  text-size: 12;
  text-dy: -10;
  text-fill: #000;
  text-halo-fill: rgba(255,255,255,0.8);
  text-halo-radius: 2;
}