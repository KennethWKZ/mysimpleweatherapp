'use strict';

module.exports = {
    setBgColorClass: function setBgColorClass(temperature) {

        var bgColorClass = 'weather-widget ';

        if (temperature >= 30) {
            bgColorClass += 'very-warm';
        } else if (temperature > 20 && temperature < 30) {
            bgColorClass += 'warm';
        } else if (temperature > 10 && temperature < 20) {
            bgColorClass += 'normal';
        } else if (temperature > 0 && temperature < 10) {
            bgColorClass += 'cold';
        } else if (temperature <= 0) {
            bgColorClass += 'very-cold';
        }

        return bgColorClass;
    }
};