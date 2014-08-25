module.exports = (function() {
    var RomanNumeralConverter = function() {
        this.subtractive = true;

        this.symbols = RomanNumeralConverter.symbols;
    };

    RomanNumeralConverter.symbols = [
        { digit: 1000, glyph: 'M'},
        { digit: 500, glyph: 'D'},
        { digit: 100, glyph: 'C'},
        { digit: 50, glyph: 'L'},
        { digit: 10, glyph: 'X'},
        { digit: 5, glyph: 'V'},
        { digit: 1, glyph: 'I'}
    ];

    RomanNumeralConverter.prototype = {
        getSubtractiveForm: function() {
            return this.subtractive;
        },

        setSubtractiveForm: function(enabled) {
            this.subtractive = enabled ? true : false;

            if (this.subtractive) {
                // this.symbols = RomanNumeralConverter.subtractive_symbols;
            }
        },

        toNumeral: function(number) {
            if (! this.isValidDigit(number)) {
                throw new Error("The given digit is invalid.");
            }

            numeral = '';

            // Go through all available symbols
            for (var i = 0; i < this.symbols.length; i++) {
                var digit = this.symbols[i].digit;
                var glyph = this.symbols[i].glyph;

                // To adhere to the substraction principle, we check what the
                // next symbol will be.
                var subSymbol = this.getSubtractionSymbol(i);
                var subDigit = subSymbol.digit;
                var subGlyph = subSymbol.glyph;

                while (number >= digit - subDigit) {
                    if (number < digit) {
                        // If the number's value is less than the current
                        // symbol, we apply the substitution principle.
                        numeral += subGlyph;
                        number += subDigit;
                    }
                    // Add the current symbol to our numeral
                    number -= digit;
                    numeral += glyph;
                }
            };

            return numeral;
        },

        getSubtractionSymbol: function(index) {
            if (! this.subtractive || this.symbols[index].digit == 1) {
                return { digit: 0, glyph: '' }
            }
            index += 1;
            var digit = this.symbols[index].digit;
            if (digit === 5 || digit === 50 || digit === 500) {
                index += 1;
            }
            return this.symbols[index];
        },

        isValidDigit: function(digit) {
            return typeof digit == "number"
                && isFinite(digit)
                && digit % 1 === 0
                && digit != 0;
        },

        toArabic: function(numeral) {
            var result = 0;
            // TODO apply subtraction rule, check if next value is larger than the current
            var symbols = this.symbols;

            for (var i = 0; i < numeral.length; i++) {
                var current_glyph = numeral[i];
                var current_digit = this.getDigitFromGlyph(current_glyph);

                result += current_digit;

                if (i + 1 < numeral.length) {
                    next_glyph = numeral[i + 1];
                    var next_digit = this.getDigitFromGlyph(next_glyph);
                    // TODO check if this sequence is valid
                    if (next_digit > current_digit) {
                        result += next_digit - 2 * current_digit;
                        i++;
                    }
                }
            };

            return result;
        },

        getDigitFromGlyph: function(glyph) {
            for (var i = 0; i < this.symbols.length; i++) {
                if (glyph == this.symbols[i].glyph) {
                    return this.symbols[i].digit;
                }
            };
        }
    }

    return RomanNumeralConverter;
}())