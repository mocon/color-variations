import React from 'react';
import Color from 'color';

// Color converter, see 'https://github.com/Qix-/color' for Color manipulation library
var scssPalette = '',
    jsPalette = {},
    palette = [
        {name: 'gg-gold', hex: '#ffb819', scss: ''},
        {name: 'gg-blue', hex: '#00a7cf', scss: ''},
        {name: 'gg-green', hex: '#00c4b4', scss: ''},
        {name: 'gg-red', hex: '#ff5a34', scss: ''},
        {name: 'gg-gold', hex: '#ffb819', scss: ''},
        {name: 'gg-purple', hex: '#555387', scss: ''}
    ];

palette.map(function(color, index) {
    var currentColor = Color(color.hex),
        currentColorRgb = currentColor.values.rgb,
        currentColorLight1 = currentColor.clone().lighten(0.05),
        currentColorLight2 = currentColor.clone().lighten(0.10),
        currentColorLight3 = currentColor.clone().lighten(0.15),
        currentColorLight4 = currentColor.clone().lighten(0.30),
        currentColorDark1 = currentColor.clone().darken(0.05),
        currentColorDark2 = currentColor.clone().darken(0.10),
        currentColorDark3 = currentColor.clone().darken(0.15),
        currentColorDark4 = currentColor.clone().darken(0.30);

    // Assemble .scss code for each color and all its variations
    color.scss += `// "${color.name}" with variations\n`;
    color.scss += `$${color.name}: ${color.hex};\n`;
    color.scss += `$${color.name}-light-1: mix(white, $${color.name}, 5%);\n`;
    color.scss += `$${color.name}-light-2: mix(white, $${color.name}, 10%);\n`;
    color.scss += `$${color.name}-light-3: mix(white, $${color.name}, 15%);\n`;
    color.scss += `$${color.name}-light-4: mix(white, $${color.name}, 30%);\n`;
    color.scss += `$${color.name}-dark-1: mix(black, $${color.name}, 5%);\n`;
    color.scss += `$${color.name}-dark-2: mix(black, $${color.name}, 10%);\n`;
    color.scss += `$${color.name}-dark-3: mix(black, $${color.name}, 15%);\n`;
    color.scss += `$${color.name}-dark-4: mix(black, $${color.name}, 30%);\n\n`;

    // Assemble .js code for each color and all its variations
    jsPalette[color.name] = {};
    jsPalette[color.name].color = `rgb(${currentColorRgb})`;
    jsPalette[color.name].colorLight1 = `rgb(${currentColorLight1.values.rgb})`;
    jsPalette[color.name].colorLight2 = `rgb(${currentColorLight2.values.rgb})`;
    jsPalette[color.name].colorLight3 = `rgb(${currentColorLight3.values.rgb})`;
    jsPalette[color.name].colorLight4 = `rgb(${currentColorLight4.values.rgb})`;
    jsPalette[color.name].colorDark1 = `rgb(${currentColorDark1.values.rgb})`;
    jsPalette[color.name].colorDark2 = `rgb(${currentColorDark2.values.rgb})`;
    jsPalette[color.name].colorDark3 = `rgb(${currentColorDark3.values.rgb})`;
    jsPalette[color.name].colorDark4 = `rgb(${currentColorDark4.values.rgb})`;

    // Add this color to Scss palette
    scssPalette += color.scss;
});

// View scssPalette string, for copying into .scss source code
console.log(scssPalette);

// View jsPalette object, for copying into .js source code
console.log(jsPalette);

























// React app
export default class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div id="content">
        <h1>&nbsp;</h1>
        <h2>Welcome!</h2>
        <ul>
          <li><a href="http://brunch.io">Brunch homepage</a></li>
          <li><a href="https://facebook.github.io/react/">React.js homepage</a></li>
        </ul>
      </div>
    );
  }
}
