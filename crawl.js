const normaliseurl = (url)=>{
    var urlobj = new URL(url)
    var slicedurl=`${urlobj.hostname}${urlobj.pathname}`
    if(slicedurl.length>0 && slicedurl.slice(-1)=='/'){
        
        return `${slicedurl.slice(0,-1)}`
    }
    return slicedurl
}


module.exports = {
    normaliseurl
}

