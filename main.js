const {webcrawler} = require('./crawl')

function main(){
    if(process.argv.length<3){
        console.log('website not entered')
        process.exit(1)
    }else if(process.argv.length>3){
        console.log('too many arguments')
        process.exit(1)
    }

    const crawlurl = process.argv[2]  
    webcrawler(crawlurl)  
}

main()