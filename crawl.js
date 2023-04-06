const {JSDOM} = require('jsdom')


const webcrawler = async(crawlurl)=>{
    try{
        const page = await fetch(crawlurl)
        if(page.status>399){
            console.log("cannot fetch url:bad connection")
            return
        }
        const contenttype = page.headers.get('content-type')
        if(!contenttype.includes('text/html')){
            console.log('content type not html')
            return
        }
        console.log(await page.text())

    }catch{
        console.log("cannot fetch the url")
    }
    
}

const geturlsfrom = (htmlbody,baseurl)=>{
    
    const dom = new JSDOM(htmlbody)
    const urls = []

    const allinks = dom.window.document.querySelectorAll('a')
    
    for(const allink of allinks){
        
        if(allink.href.slice(0,1)=='/'){
            //relative
            
            try{
                const acturl = `${baseurl}${allink.href}`
                var urlobj = new URL(acturl)
                urls.push(urlobj.href)
            }catch(err){
                console.log("err")
            }
        }else{
            //actual
            try{
                var urlobj = new URL(allink.href)
                urls.push(urlobj.href)
            }catch(err){
                console.log("err")
            }
            
        }
        
    }

    return urls
    
}



const normaliseurl = (url)=>{
    var urlobj = new URL(url)
    var slicedurl=`${urlobj.hostname}${urlobj.pathname}`
    if(slicedurl.length>0 && slicedurl.slice(-1)=='/'){
        
        return `${slicedurl.slice(0,-1)}`
    }
    return slicedurl
}


module.exports = {
    normaliseurl,
    geturlsfrom,
    webcrawler
}

