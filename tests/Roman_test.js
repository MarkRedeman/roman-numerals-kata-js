var Roman = require ('../src/roman.js');
var should = require('should');

describe("Conversion of digits to roman numerals", function() {
    converter = new Roman();

    it("Converst single digits", function() {
        converter.toNumeral(1).should.equal('I');
        converter.toNumeral(2).should.equal('II');
        converter.toNumeral(3).should.equal('III');
        converter.toNumeral(5).should.equal('V');
        converter.toNumeral(10).should.equal('X');
        converter.toNumeral(50).should.equal('L');
        converter.toNumeral(100).should.equal('C');
        converter.toNumeral(500).should.equal('D');
        converter.toNumeral(1000).should.equal('M');
    });

    it("Throws an error when an invalid digit is given", function() {
        // assert.throws(
        (function() {
            converter.toNumeral(0);
        }).should.throw("The given digit is invalid.");
    })

    describe("It supports subtractive forms", function() {
        converter = new Roman();

        it("Gets subsequent substraction symbols", function() {
            assertSubtractionSymbolIs(0, 100, 'C');
            assertSubtractionSymbolIs(1, 100, 'C');
            assertSubtractionSymbolIs(2, 10, 'X');
            assertSubtractionSymbolIs(3, 10, 'X');
            assertSubtractionSymbolIs(4, 1, 'I');
            assertSubtractionSymbolIs(5, 1, 'I');
            assertSubtractionSymbolIs(6, 0, '');

            function assertSubtractionSymbolIs(index, digit, glyph) {
                var symbol = converter.getSubtractionSymbol(index);
                symbol.digit.should.equal(digit);
                symbol.glyph.should.equal(glyph);
            }
        })

        it("It applies the substraction principle", function() {
            converter.toNumeral(4).should.equal('IV');
            converter.toNumeral(9).should.equal('IX');
            converter.toNumeral(40).should.equal('XL');
            converter.toNumeral(90).should.equal('XC');
            converter.toNumeral(400).should.equal('CD');
            converter.toNumeral(900).should.equal('CM');
        });

        it("Converts digits to roman numerals", function() {
            converter.toNumeral(2014).should.equal('MMXIV');
        });

    });

    describe("It can disable subtractive forms", function() {
        converter = new Roman();
        it("Can be set to disable subtractive forms", function() {
            converter.setSubtractiveForm(false);
            converter.getSubtractiveForm().should.equal(false);
        })

        it("Doesn't care about subtractive forms", function() {
            converter.toNumeral(4).should.equal('IIII');
        });

        it("Converts digits to roman numerals", function() {
            converter.toNumeral(2014).should.equal('MMXIIII');
        });
    });

});

describe("Conversion of roman numerals to digits", function() {
    converter = new Roman();

    describe("Conversion without subtractive forms",function() {

        it("Converts basic numerals to digits", function() {
            converter.toArabic("I").should.equal(1);
            converter.toArabic('V').should.equal(5);
            converter.toArabic('X').should.equal(10);
            converter.toArabic('L').should.equal(50);
            converter.toArabic('C').should.equal(100);
            converter.toArabic('D').should.equal(500);
            converter.toArabic('M').should.equal(1000);
        });

        it("Converts combined numerals to digits", function() {
            converter.toArabic("II").should.equal(2);
            converter.toArabic("III").should.equal(3);
        });

        // it("Converts roman numerals to digits", function() {
        //     converter.toArabic('MMXIIII').should.equal(2014);
        // });

        it("Gets the digit corresponding to a glyph", function() {
            converter.getDigitFromGlyph("I").should.equal(1);
            converter.getDigitFromGlyph("X").should.equal(10);
        });
    });

    describe("It supports subtractive forms", function() {


        it("Handles subtracting values", function() {
            converter.toArabic("IV").should.equal(4);
        });

        // it("Converts IV to 4", function() {
        //     converter.toArabic('IV').should.equal(4);
        // });

        // it("Converts digits to roman numerals", function() {
        //     converter.toArabic('MMXIV').should.equal(2014);
        // });

    });
})