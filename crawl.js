const {JSDOM} = require('jsdom')

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
    geturlsfrom
}

