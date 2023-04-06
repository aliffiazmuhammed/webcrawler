const {normaliseurl,geturlsfrom} = require('./crawl')
const {test,expect} = require('@jest/globals')


test('normaliseurl strip url',()=>{
    const input = 'https://google.com/path'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('normaliseurl strip slash',()=>{
    const input = 'https://google.com/path/'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('normaliseurl to caps to lower',()=>{
    const input = 'https://Google.com/path'
    const actual = normaliseurl(input)
    const expected = 'google.com/path'
    expect(actual).toEqual(expected)
})

test('normaliseurl no paths',()=>{
    const input = 'https://google.com/'
    const actual = normaliseurl(input)
    const expected = 'google.com'
    expect(actual).toEqual(expected)
})

test('geturlsfrom',()=>{
    const htmlbody = `
    <html>
        <body>
            <a href = 'https://google.com'> >
                google.com
            </a>
        </body>
    </html>
    `
    const baseurl = 'https://google.com'

    const actual = geturlsfrom(htmlbody,baseurl)
    const expected = ['https://google.com/']
    expect(actual).toEqual(expected)
})


test('geturlsfrom paths',()=>{
    const htmlbody = `
    <html>
        <body>
            <a href = '/path/'> >
                google.com
            </a>
        </body>
    </html>
    `
    const baseurl = 'https://Google.com'

    const actual = geturlsfrom(htmlbody,baseurl)
    const expected = ['https://google.com/path/']
    expect(actual).toEqual(expected)
})

test('geturlsfrom both',()=>{
    const htmlbody = `
    <html>
        <body>
            <a href = '/path/'> >
                google.com
            </a>
            <a href = 'https://google.com/'> >
                google.com
            </a>
        </body>
    </html>
    `
    const baseurl = 'https://google.com'

    const actual = geturlsfrom(htmlbody,baseurl)
    const expected = ['https://google.com/path/','https://google.com/']
    expect(actual).toEqual(expected)
})

test('geturlsfrom invalid',()=>{
    const htmlbody = `
    <html>
        <body>
            <a href = 'invalid'> >
                google.com
            </a>
        </body>
    </html>
    `
    const baseurl = 'https://google.com'

    const actual = geturlsfrom(htmlbody,baseurl)
    const expected = []
    expect(actual).toEqual(expected)
})