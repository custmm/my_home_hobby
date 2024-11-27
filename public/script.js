// DOM 요소
document.addEventListener("DOMContentLoaded", () => {
 // tabs 변수를 정의하여 버튼들을 가져옵니다.
    const tabs = document.querySelectorAll(".tab-btn");  // .tab-btn 클래스를 가진 모든 버튼
    const tabContents = document.querySelectorAll(".tab-content"); // .tab-content 클래스를 가진 모든 콘텐츠
    // tabs 요소가 존재하는지 확인
    if (!tabs) {
        console.error("tabs 요소를 찾을 수 없습니다.");
        return;
    }
    // tabs에 클릭 이벤트 추가
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const category = tab.dataset.category;  // 각 탭에 지정된 데이터 카테고리 값 가져오기
    
            // 탭 상태 초기화
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));
    
            // 클릭한 탭과 관련된 내용만 표시
            tab.classList.add("active");
            document.getElementById(`${category}-tab`).classList.add("active");
        });
    });
});
    const backToGalleryBtn = document.getElementById("backToGallery");
    const imageViewer = document.getElementById("image-viewer");
     // DOM 요소 존재 여부 확인
    function exampleFunction() {
        return "This is valid"; // 함수 내부에서 사용
    }
    if (!backToGalleryBtn)
        console.error("뒤로가기 버튼(#backToGallery)이 HTML에 존재하지 않습니다.");
        function exampleFunction() { // some code 
            return "This is valid"; 
        }
    if (!imageViewer) {
        console.error("이미지 뷰어(#image-viewer)가 HTML에 존재하지 않습니다.");
        function exampleFunction() { // some code 
            return "This is valid"; 
        }
        // 요소가 존재하면 이후 로직 실행
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const category = tab.dataset.category;
    
                // 탭 상태 초기화
                tabs.forEach((t) => t.classList.remove("active"));
                tabContents.forEach((content) => content.classList.remove("active"));
    
                // 선택된 탭 활성화
                tab.classList.add("active");
                document.getElementById(`${category}-tab`).classList.add("active");
            });
        });
    
        backToGalleryBtn.addEventListener("click", () => {
            imageViewer.style.display = "none";
            document.querySelector("main").style.display = "block";
        });

     // 기존 DOM 요소 초기화 및 이벤트 리스너 추가
    const selectModePage = document.getElementById("select-mode-page");  // 첫 페이지
    const galleryPage = document.getElementById("gallery-page");        // 갤러리 페이지
    const uploadSection = document.getElementById("upload-section");    // 업로드 섹션
    const viewSection = document.getElementById("view-section");        // 감상 섹션
    const uploadModeButton = document.getElementById("uploadModeButton"); // 업로드 모드 버튼
    const viewModeButton = document.getElementById("viewModeButton");   // 감상 모드 버튼
    const uploadBackButton = document.getElementById("uploadBackButton"); // 업로드 뒤로가기 버튼
    const viewBackButton = document.getElementById("viewBackButton");   // 감상 뒤로가기 버튼
    const selectedImage = document.getElementById("selectedImage");
    const selectedDescription = document.getElementById("selectedDescription");
    const fileInput = document.getElementById("fileInput");
    const categorySelect = document.getElementById("categorySelect");
    const subcategorySelect = document.getElementById("subcategorySelect");
    // subcategories 객체 정의
    const subcategories = {
        puzzle: ["300조각", "500조각", "1000조각"],
        bizz: ["보석비즈"],
        solidbodypuzzle: ["나무퍼즐", "우드락퍼즐", "크리스탈퍼즐"],
        block: ["디폼블럭", "활용부분"]
    };
    
    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지
    
        const fileInput = document.getElementById('fileInput');
        const formData = new FormData();
        formData.append('file', fileInput.files[0]); // 선택한 파일을 FormData에 추가
    
        try {
            const response = await fetch('http://localhost:2350/upload', {
                method: 'POST',   // POST 요청
                body: formData    // 업로드할 데이터
            });
    
            if (response.ok) {
                alert('파일 업로드 성공!');
            } else {
                const errorMessage = await response.text();
                alert(`업로드 실패: ${errorMessage}`);
            }
        } catch (error) {
            alert('업로드 중 문제가 발생했습니다. 네트워크를 확인하세요.');
            console.error('업로드 오류:', error);
        }
    });

    // 작은 카테고리 항목 동적 업데이트 함수
    function updateSubcategories(selectedCategory) {
        subcategorySelect.innerHTML = ""; // 기존 옵션을 초기화

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "작은 카테고리 선택";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        subcategorySelect.appendChild(defaultOption);

        if (subcategories[selectedCategory]) {
            subcategories[selectedCategory].forEach(subcategory => {
                const option = document.createElement("option");
                option.value = subcategory.toLowerCase();
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        }
    }
    // 큰 카테고리 선택 시 작은 카테고리 갱신
 categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    updateSubcategories(selectedCategory);
});

// 처음 로딩 시 기본적으로 'puzzle' 카테고리의 작은 카테고리 표시
updateSubcategories(categorySelect.value);

 // 업로드 모드 선택 시
 uploadModeButton.addEventListener("click", () => {
    // 모든 섹션 숨기기
    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });

    // 업로드 모드 섹션만 표시
    selectModePage.style.display = "none"; // 첫 페이지 숨기기
    galleryPage.style.display = "block"; // 갤러리 페이지 표시
    uploadSection.style.display = "block"; // 업로드 섹션만 표시
    viewSection.style.display = "none"; // 감상 섹션 숨기기
});

// 감상 모드 선택 시
viewModeButton.addEventListener("click", () => {
    // 모든 섹션 숨기기
    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });

    // 감상 모드 섹션만 표시
    selectModePage.style.display = "none"; // 첫 페이지 숨기기
    galleryPage.style.display = "block"; // 갤러리 페이지 표시
    viewSection.style.display = "block"; // 감상 섹션만 표시
    uploadSection.style.display = "none"; // 업로드 섹션 숨기기
});
    // 뒤로가기 버튼 클릭 시
    uploadBackButton.addEventListener("click", () => {
        galleryPage.style.display = "none"; // 갤러리 페이지 숨기기
        selectModePage.style.display = "block"; // 첫 페이지 표시
        uploadSection.style.display = "none"; // 업로드 섹션 숨기기
    });

    viewBackButton.addEventListener("click", () => {
        galleryPage.style.display = "none"; // 갤러리 페이지 숨기기
        selectModePage.style.display = "block"; // 첫 페이지 표시
        viewSection.style.display = "none"; // 감상 섹션 숨기기
    });
;

    // 파일 선택 시 미리보기 표시
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];  // 선택된 파일
        const previewContainer = document.getElementById("imagePreviewContainer");  // 미리보기 컨테이너
        const previewImage = document.getElementById("imagePreview");  // 미리보기 이미지

        if (file) {
            const reader = new FileReader();  // 파일 리더 객체 생성
            reader.onload = (e) => {
                previewImage.src = e.target.result;  // 미리보기 이미지 설정
                previewContainer.style.display = "block";  // 미리보기 컨테이너 표시
            };
            reader.readAsDataURL(file);  // 파일을 읽어 이미지 URL 생성
        } else {
            previewImage.src = "";  // 파일이 없을 경우 이미지 초기화
            previewContainer.style.display = "none";  // 미리보기 컨테이너 숨김
        }
    });

// 업로드 시 서브카테고리 동적 변경
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value; // 올바르게 값을 가져옵니다.
    updateSubcategories(selectedCategory);
    });
    // 처음 로딩 시 기본적으로 'puzzle' 카테고리의 작은 카테고리 표시
    updateSubcategories(categorySelect.value);

    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault(); // 폼의 기본 동작 방지

    // 업로드 데이터를 FormData로 준비
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("category", categorySelect.value);
    formData.append("subcategory", subcategorySelect.value);
    formData.append("description", descriptionInput.value);

    // 서버에 데이터 전송
    fetch("/upload", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            alert("게시물이 작성되었습니다!");
            console.log(data); // 디버그를 위해 응답 로그 출력
        })
        .catch((error) => {
            console.error("업로드 중 오류 발생:", error);
            alert("업로드에 실패했습니다. 다시 시도해주세요.");
        });
});

    // 탭 전환 처리
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const category = tab.dataset.category;

            // 탭 상태 초기화
            tabs.forEach((t) => t.classList.remove("active"));
            tabContents.forEach((content) => content.classList.remove("active"));

            // 선택된 탭 활성화
            tab.classList.add("active");
            document.getElementById(category).classList.add("active");

            // 이미지 표시 초기화
            imageList.innerHTML = "";
            fetchImages(category);
        });
    });
// 이미지 불러오기
function fetchImages(category = "") {
    fetch("/files")
        .then((response) => response.json())
        .then((files) => {
            imageList.innerHTML = ""; // 기존 이미지 초기화
            files.forEach((file) => {
                if (category === "" || file.includes(category)) {
                    const img = document.createElement("img");
                    img.src = file;
                    img.alt = "Uploaded image";
                    img.style.width = "150px";
                    img.style.margin = "10px";
                    imageList.appendChild(img);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching images:", error);
        });
    };

// 뒤로가기 버튼 클릭 시 갤러리로 돌아가기
backToGalleryBtn.addEventListener("click", () => {
    imageViewer.style.display = "none";
    document.querySelector("main").style.display = "block";
})
};

