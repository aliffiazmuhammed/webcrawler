const {normaliseurl} = require('./crawl')
const {test,expect} = require('@jest/globals')


test('strip url',()=>{
    const input = 'https://google.com/path'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('strip slash',()=>{
    const input = 'https://google.com/path/'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('to caps to lower',()=>{
    const input = 'https://Google.com/path'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('no paths',()=>{
    const input = 'https://google.com/'
    const actual = normaliseurl(input)
    const expected = 'google.com'
    expect(actual).toEqual(expected)
})