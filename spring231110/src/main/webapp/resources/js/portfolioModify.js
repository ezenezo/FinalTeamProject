
console.log("여기오냐1")

    const authId = document.getElementById("authId").value; //세션 아이디
    console.log("authId>",authId);
    console.log("pnoVal>",pnoVal);

    /*필수정보란*/
    //토글
    let toggle=0;
    let essential2Div = document.querySelector(".essential2");
    let essential1Div = document.querySelector(".essential1");
    let essential1Left =document.getElementById("essential1Left")

    // document.getElementById("essential2Btn").addEventListener('click',()=>{
    
    //   if(toggle==0){
    //   essential2Div.style.display="block";
    //   essential1Div.style.borderBottom = "none";
    //   essential1Left.innerHTML=`<span class="material-symbols-outlined" id="essential2Btn">
    //   expand_less
    //   </span>`;
    //   toggle=1;
    //   }else{
    //     essential2Div.style.display="none";
    //     essential1Left.innerHTML=`<span class="material-symbols-outlined" id="essential2Btn"> expand_more </span>`;
    //     toggle=0;
    //   }
    // })

    document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'essential2Btn') {
        if (toggle == 0) {
            essential2Div.style.display = "block";
            essential1Div.style.borderBottom = "none";
            essential1Left.innerHTML = `<span class="material-symbols-outlined" id="essential2Btn">
                                            expand_less
                                        </span>`;
            toggle = 1;
        } else {
            essential2Div.style.display = "none";
            essential1Left.innerHTML = `<span class="material-symbols-outlined" id="essential2Btn"> expand_more </span>`;
            toggle = 0;
        }
    }
    });


        //------------------------------------------- 

        console.log("여기오냐2")
    // pdto.pvo.homeType의 값을 가져와서 JavaScript 변수에 할당
    let mainImgFvoVal = document.getElementById("mainImgFvo").value;
    let titleVal = document.getElementById("title").value;
    let homeTypeVal = document.getElementById("homeType").value;
    let homeSizeVal = document.getElementById("homeSize").value;
    let roomCntVal = document.getElementById("roomCnt").value;
    let familyTypeVal = document.getElementById("familyType").value;
    let homeStyleVal = document.getElementById("homeStyle").value;
    // let pnoVal = document.getElementById("pnoVal").value;
    console.log("mainImgFvoVal>"+mainImgFvoVal);
    console.log("titleVal>"+titleVal);
    console.log("homeTypeVal>"+homeTypeVal);
    console.log("homeSizeVal>"+homeSizeVal);
    console.log("roomCntVal>"+roomCntVal);
    console.log("homeStyleVal>"+homeStyleVal);
  

        // num1Select ID를 가진 <select> 요소 가져오기
        let num1Select = document.getElementById("num1Select");
        let num2Select = document.getElementById("num2Select");
        let num3Select = document.getElementById("num3Select");
        let num4Select = document.getElementById("num4Select");
        console.log("여기오냐3")
        // 선택하고자 하는 값과 일치하는 옵션을 찾아서 선택 상태로 설정
        for (let i = 0; i < num1Select.options.length; i++) {
            if (num1Select.options[i].value === homeTypeVal) {
                num1Select.options[i].selected = true;

                break; // 일치하는 옵션을 찾았으면 반복문 종료
            }
        }
        for (let i = 0; i < num2Select.options.length; i++) {
            if (num2Select.options[i].value === roomCntVal) {
                num2Select.options[i].selected = true;
                break; // 일치하는 옵션을 찾았으면 반복문 종료
            }
        }
        for (let i = 0; i < num3Select.options.length; i++) {
            if (num3Select.options[i].value === familyTypeVal) {
                num3Select.options[i].selected = true;
                break; // 일치하는 옵션을 찾았으면 반복문 종료
            }
        }
        for (let i = 0; i < num4Select.options.length; i++) {
            if (num4Select.options[i].value === homeStyleVal) {
                num4Select.options[i].selected = true;
                break; // 일치하는 옵션을 찾았으면 반복문 종료
            }
        }

    // ---------------------------------------------------------
    console.log("여기오냐4")
    



        const editor = new toastui.Editor({
            el: document.querySelector('#editor'),      // 에디터를 적용할 요소 (컨테이너)
            height: '500px',                             // 에디터 영역의 높이 값 (OOOpx || auto)
            initialEditType: 'wysiwyg',                 // 최초로 보여줄 에디터 타입 (markdown || wysiwyg)
            // initialValue:contentVal,                            // 내용의 초기 값으로, 반드시 마크다운 문자열 형태여야 함
            previewStyle: 'vertical',                    // 마크다운 프리뷰 스타일 (tab || vertical)
            placeholder: '내용을 입력해 주세요.',
            viewer: true,  // 뷰어 모드로 설정
    exts: ['scrollSync', 'colorSyntax', 'uml', 'chart'],  // 사용할 확장 기능 지정
    sanitizer: {
        allowedTags: ['p', 'br', 'img','div'],  // 에디터에서 허용할 태그 목록
    },
            /* start of hooks */
            hooks: {
                async addImageBlobHook(blob, callback) { // 이미지 업로드 로직 커스텀
                    try {
                        console.log("여기오냐6")
                        /*
                        * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
                        *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
                        */
                        const formData = new FormData();
                        formData.append('image', blob);

                        // 2. FileApiController - uploadEditorImage 메서드 호출
                        const response = await fetch('/portfolio/image-upload', {
                            method : 'POST',
                            body : formData,
                            headers: {
                                'Accept': 'text/plain;charset=UTF-8',
                            }
                        });
                        console.log("여기오냐7")
                        // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
                        const filename = await response.text();
                        console.log('서버에 저장된 파일명 : ', filename); 
                        
                    /*   const para2=await response.text();
                        let parts=responseString.split("|");
                        const url=parts[0];
                        console.log("url>>"+url);
                        const filename=parts[1];
                        console.log("filename>>"+filename); */

                        // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
                        const imageUrl = "/portfolio/image-print/"+filename;
                        console.log("imageUrl>>"+imageUrl);
                        callback(imageUrl, 'image alt attribute');
                        console.log("202131205여기통과하는지");

                    } catch (error) {
                        console.error('업로드 실패 : ', error);
                    }
                }
            }
            /* end of hooks */
        });

    
            document.getElementById('modBtn').addEventListener('click',modifyPost);
                
            // 게시글 저장
            async function modifyPost() {
            let homeTypeVal = document.getElementById('num1Select').value;
            let roomCntVal = document.getElementById('num2Select').value;
            let familyTypeVal = document.getElementById('num3Select').value;
            homeSizeVal = document.getElementById('homeSize').value;
            let homeSizeValInt= parseInt(homeSizeVal, 10);//int로 변환(10진수)
            let homeStyleVal = document.getElementById('num4Select').value;
            console.log("homeTypeVal>>",homeTypeVal);
            console.log("roomCntVal>>",roomCntVal);
            console.log("familyTypeVal>>",familyTypeVal);
            console.log("homeSizeVal>>",homeSizeVal);
            console.log("homeSizeValInt>>",homeSizeValInt);

                // 1. 콘텐츠 입력 유효성 검사
                if (editor.getMarkdown().length < 1) {
                    alert('에디터 내용을 입력해 주세요.');
                    throw new Error('editor content is required!');
                }

                let titleVal=document.getElementById('title').value;
                const introduction = editor.getHTML();
                const fileInput = document.getElementById('chooseFile');
                const imageFile = fileInput.files[0];
                console.log("titleVal ",titleVal);
                console.log("introduction ",introduction);
    
            

                const formData = new FormData();
                formData.append('pno',pnoVal);
                formData.append('title', titleVal);
                formData.append('introduction', introduction);
                formData.append('homeType', homeTypeVal);
                formData.append('roomCnt', roomCntVal);
                formData.append('familyType', familyTypeVal);
                formData.append('homeSize', homeSizeValInt);
                formData.append('imageFile', imageFile);
                formData.append('homeStyle', homeStyleVal);
                console.log('homeStyleVal>>{}',homeStyleVal);

                // postModifyPortfolio(formData).then(result=>{
                //     if(result>0){
                //         alert("수정이 완료되었습니다.");
                //         console.log("result>>"+result);
                //         window.location.href = '/portfolio/portfolioDetail?pno='+pnoVal;
                        
                //     }else{
                //         alert("수정 실패");
                //     }
                // })
                try {
                    const response = await fetch('/portfolio/postModifyPortfolio', {
                    method: 'POST',
                    body: formData,
                    });
            
                    const postId = await response.json();              
                    window.location.href = '/portfolio/portfolioDetail?pno='+pnoVal;
                } catch (error) {
                    console.error('수정 실패: ', error);
                };                    
            }


            // async function postModifyPortfolio(formData){
            //     try {
            //         const url = "/portfolio/postModifyPortfolio";
            //         const config={
            //             method: "post",
            //             body: formData
            //         };
                   
            //         const resp = await fetch(url, config);
            //         const result = await resp.text(); //isOk
            //         return result;
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
    // -------------------------------------------------------커버사진 받기
    function DropFile(dropAreaId, fileListId) {
        let dropArea = document.getElementById(dropAreaId);
        let fileList = document.getElementById(fileListId);
    
        function preventDefaults(e) { // 이벤트의 기본 동작을 막고 이벤트 전파를 중지시킵니다.
        e.preventDefault(); 
        e.stopPropagation();
        }
    
        function highlight(e) { //드래그 영역에 파일을 가져왔을 때 스타일을 변경하여 사용자에게 시각적 피드백을 제공
        preventDefaults(e);
        dropArea.classList.add("highlight");
        }
    
        function unhighlight(e) { //드래그 영역에서 나갔을 때의 스타일을 변경
        preventDefaults(e);
        dropArea.classList.remove("highlight");
        }
    
        function handleDrop(e) {//파일을 드롭했을 때 호출되며, handleFiles 함수를 호출하여 파일을 처리
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;
    
        handleFiles(files);
    
        const fileList = document.getElementById(fileListId);
        if (fileList) {
            fileList.scrollTo({ top: fileList.scrollHeight });
        }
        }
    
        function handleFiles(files) {//드롭된 파일들을 배열로 변환한 후 각 파일을 previewFile 함수로 전달
        files = [...files];
        // files.forEach(uploadFile);
        files.forEach(previewFile);
        }
    
        function previewFile(file) {//파일을 미리보기하는데 사용(renderFile 함수를 호출하여 파일을 렌더링)
        console.log(file);
        renderFile(file);
        }
    
        function renderFile(file) {// 파일을 읽고, 파일을 렌더링합니다. 미리보기 이미지를 업데이트
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = dropArea.getElementsByClassName("preview")[0];
            img.src = reader.result;
            img.style.display = "block";
        };
        }
    
        dropArea.addEventListener("dragenter", highlight, false);
        dropArea.addEventListener("dragover", highlight, false);
        dropArea.addEventListener("dragleave", unhighlight, false);
        dropArea.addEventListener("drop", handleDrop, false);
    
        return {
        handleFiles
        };
    }
    
    const dropFile = new DropFile("drop-file", "files");

