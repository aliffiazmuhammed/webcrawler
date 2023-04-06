const {webcrawler} = require('./crawl')

async function main(){
    if(process.argv.length<3){
        console.log('website not entered')
        process.exit(1)
    }else if(process.argv.length>3){
        console.log('too many arguments')
        process.exit(1)
    }

    const crawlurl = process.argv[2]  
    const pages=await webcrawler(crawlurl,crawlurl,{})  
    for(const page of Object.entries(pages)){
        console.log(page)
    }
}

main()