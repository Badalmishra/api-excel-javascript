var queryString = location.search
fetch('https://your-api-here'+queryString)
.then(res=>{
    console.log(res);
    if (Array.isArray(res)) {
        excelfyApi(res)
    } else {
        excelfyApi([{message:"api did't sent array of object"}])
    }
})
.catch(err=>{
    excelfyApi([{message:"no response was sent"}])
})

function excelfyApi(data){
    let work_book = XLSX.utils.book_new()
    let work_sheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(work_book,work_sheet,"Sheet1")
    let exported = XLSX.write(work_book,{bookType:'xlsx',type:'array'})
    saveAs(new Blob([exported],{type:'application/octet-stream'}),'excelfy_api.xlsx')
}