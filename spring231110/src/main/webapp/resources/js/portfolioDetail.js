console.log("pnoVal>>> ", pnoVal);
console.log("portfolioWriter>>> ", portfolioWriter);//작성자 아이디
const authId = document.getElementById("authId").value; //세션 아이디
console.log("authId>>> ", authId);//작성자 아이디


//board좋아요
async function likeQtyToServer(pno,id){
    try {
        const url = "/portfolio/portfolioLike/"+pno+"/"+id;
        const config = {
            method: "post"
        };
        const resp = await fetch(url, config);
        const result = await resp.text();       
        return result;
    } catch (error) {
        console.log(error)
    }
}

document.getElementById("heart").addEventListener("click",()=>{
    let iconContainer=document.getElementById("iconContainer"); //아이콘 넣을 div
   if(portfolioWriter!=authId){
       likeQtyToServer(pnoVal,authId).then(result=>{   
           console.log("result>>"+result);
           if(parseInt(result)>0){
               iconContainer.innerHTML=`<svg id="heart" class="colorRed"
               xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-heart-fill"
               viewBox="0 0 16 16">
                   <path class="colorRed" fill-rule="evenodd"
                   d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                 </svg>`;
           }else{
               iconContainer.innerHTML=`<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path
                   d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
               </svg>`;
           }
           location.reload();
       })
   }
   })