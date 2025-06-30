var chroma = require('chroma-js'),
    hsluvLib = require('hsluv'),
    _ = require('lodash');

// Create hsluv instance for color conversions
var hsluv = new hsluvLib.Hsluv();

(function(tree) {

tree.Color = function Color(hsl, a, perceptual) {
    if (Array.isArray(hsl)) {
        this.hsl = hsl.slice(0, 3);
        this.hsl[0] = Math.max(0, Math.min(this.hsl[0], 360));
        this.hsl[1] = Math.max(0, Math.min(this.hsl[1], 1));
        this.hsl[2] = Math.max(0, Math.min(this.hsl[2], 1));
    } else {
        this.hsl = null;
    }

    if (typeof(a) === 'number') {
        this.alpha = a;
    } else {
        this.alpha = 1;
    }
    if (typeof(a) === 'number') {
        this.alpha = a;
    } else {
        this.alpha = 1;
    }
    if (typeof(perceptual) == 'boolean') {
        this.perceptual = perceptual;
    } else {
        this.perceptual = false;
    }
};

tree.Color.prototype = {
    is: 'color',
    'ev': function() { return this; },

    // If we have some transparency, the only way to represent it
    // is via `rgba`. Otherwise, we use the hex representation,
    // which has better compatibility with older browsers.
    toString: function() {
        if (this.hsl !== null) {
            if (this.alpha < 1.0) {
                if (this.perceptual) {
                    hsluv.hsluv_h = this.hsl[0];
                    hsluv.hsluv_s = this.hsl[1] * 100;
                    hsluv.hsluv_l = this.hsl[2] * 100;
                    hsluv.hsluvToRgb();
                    return 'rgba(' + [hsluv.rgb_r, hsluv.rgb_g, hsluv.rgb_b].map(function(c) {
                        return Math.round(c * 255);
                    }).concat(this.round(this.alpha, 2)).join(', ') + ')';
                }
                else {
                    return 'rgba(' + chroma.hsl(this.hsl[0], this.hsl[1], this.hsl[2]).rgb().map(function(c) {
                        return Math.round(c);
                    }).concat(this.round(this.alpha, 2)).join(', ') + ')';
                }
            } else {
                if (this.perceptual) {
                    hsluv.hsluv_h = this.hsl[0];
                    hsluv.hsluv_s = this.hsl[1] * 100;
                    hsluv.hsluv_l = this.hsl[2] * 100;
                    hsluv.hsluvToHex();
                    return hsluv.hex;
                }
                else {
                    return chroma.hsl(this.hsl[0], this.hsl[1], this.hsl[2]).hex();
                }
            }
        }
        return '';
    },

    isPerceptual: function() {
        return this.perceptual;
    },

    toPerceptual: function() {
        if (this.perceptual) {
            return this;
        }
        else {
            // transition via RGB, because HSL values cannot be directly
            // transformed into HUSL values easily
            var rgb = chroma.hsl(this.hsl[0], this.hsl[1], this.hsl[2]).rgb();
            hsluv.rgb_r = rgb[0] / 255;
            hsluv.rgb_g = rgb[1] / 255;
            hsluv.rgb_b = rgb[2] / 255;
            hsluv.rgbToHsluv();
            return new tree.Color([hsluv.hsluv_h, hsluv.hsluv_s / 100, hsluv.hsluv_l / 100], this.alpha, true);
        }
    },

    toStandard: function() {
        if (!this.perceptual) {
            return this;
        }
        else {
            // transition via RGB, because HUSL values cannot be directly
            // transformed into HSL values easily
            hsluv.hsluv_h = this.hsl[0];
            hsluv.hsluv_s = this.hsl[1] * 100;
            hsluv.hsluv_l = this.hsl[2] * 100;
            hsluv.hsluvToRgb();
            var hsl = chroma.rgb(hsluv.rgb_r * 255, hsluv.rgb_g * 255, hsluv.rgb_b * 255).hsl();
            return new tree.Color([hsl[0], hsl[1], hsl[2]], this.alpha, false);
        }
    },

    // Operations have to be done in RGB per-channel, if not,
    // channels will spill onto each other. Once we have
    // our result, in the form of an integer triplet,
    // we create a new Color node to hold the result.
    operate: function(env, op, other) {
        var result = [],
            rgb2;

        if (other instanceof tree.Color) {
            rgb2 = chroma(other.toString()).rgb();
        }
        else if (_.isArray(other)) {
            rgb2 = _.slice(other, 0, Math.max(other.length, 3));
        }
        else if (_.isObject(other)) {
            if (_.has(other, 'value')) {
                rgb2 = [other.value, other.value, other.value];
            }
            else {
                return;
            }
        }
        else {
            rgb2 = [other, other, other];
        }

        var rgb1 = chroma(this.toString()).rgb();

        for (var c = 0; c < 3; c++) {
            result[c] = tree.operate(op, rgb1[c] , rgb2[c]);
        }

        if (this.perceptual) {
            var normalize = function (x) {
                return x / 255;
            };
            result = hsluv.rgbToHsluv(_.map(result, normalize));
            result[1] = result[1] / 100;
            result[2] = result[2] / 100;
        }
        else {
            result = chroma(result).hsl();
        }

        return new tree.Color(result, this.alpha, this.perceptual);
    },

    getComponents: function() {
        if (this.hsl !== null) {
            return { h: this.hsl[0] || 0, s: this.hsl[1], l: this.hsl[2], a: this.alpha, perceptual: this.perceptual }
        }
        return null;
    },

    round: function(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
};

})(require('../tree'));
