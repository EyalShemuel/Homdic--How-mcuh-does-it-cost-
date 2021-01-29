const HtmlNewPostForm = () =>{
  const html = `<img class='closeNewPost' onclick="hideNewPostBox()" src="https://www.freeiconspng.com/thumbs/close-button-png/black-circle-close-button-png-5.png">
  <h1 class='box'>פוסט חדש</h1>
  <form class='box' enctype="multipart/form-data" onsubmit="handleNewPost(event)">
      <label class="box mustChoose">חייב לבחור קטגוריה</label>
      <select required name='category' class='box' id="category" name="category"></select>
      <label class='box' required for="title">כותרת</label>
      <input class='box' name="title" required placeholder='כותרת' type="text" maxlength="45" id="title">
      <label class='box' for="desc">שאלה</label>
      <textarea class='box' name="desc" required placeholder='תיאור השאלה' maxlength="250" id='desc' type="text"></textarea>
      <label class='img box' name='imgLable' for="img">העלה תמונה</label>
      <input class='box imgUpload' onchange='handleImgSelect()' id='img' type="file" style="visibility:hidden;display: none;" name="img" accept="image/*">
      <span class='box' id="file-chosen"></span>
      <input class='box' type="submit" value="פרסם">
  </form> `
  return html;
}
const displayPostBox = (e) => {
  e.stopPropagation();
  let postBox = document.querySelector(".newPostBox");
  postBox.innerHTML = HtmlNewPostForm();
  postBox.style.display = "block";
  setTimeout(function () {
    postBox.style.opacity = "1";
    postBox.style.transform = "none";
    getCategoiresCheckBox();
  }, 100);
};


const hideNewPostBox = () => {
  let postBox = document.querySelector(".newPostBox");
  postBox.style.opacity = "0";
  postBox.style.transform = "rotate3d(1, .5, .5, 180deg) scale(0.1)";
  setTimeout(function () {
    postBox.style.display = "none";
  }, 100);
};

// document.onclick = function (e) {

//     className = e.target.className
//     const classNameInclude = className.includes('box')

//     if (!classNameInclude) {
//         hideNewPostBox()
//     }
// }
const handleImgSelect = () => {
  const imgUpload = document.querySelector(".imgUpload");
  const fileChosen = document.querySelector("#file-chosen");
  let file = imgUpload.files[0];
  fileChosen.textContent = file.name;
  //uploadImageFile(file);
};

const getCategoiresCheckBox = () => {
  let categoryCheckBox = document.getElementById("category");
  let categoriesNames = `<option selected value='choseCategory' hidden>בחר קטגוריוה</option>`;
  fetch("/category/get")
    .then((res) => res.json())
    .then((data) => {
      let categories = data.categories;
      categories.forEach((category) => {
        categoriesNames += `<option data-id='${category._id}' value="${category._id}">${category.Name}</option>`;
      });
      categoryCheckBox.innerHTML = categoriesNames;
    });
};

const uploadImageFile = (file) => {
  let formData = new FormData();
  formData.append('img', file);
  fetch("/posts/uploadImg", {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
    },
    body: formData,
  })
  alert('the img has transferd')
}

const handleNewPost = async (e, file) => {
  e.preventDefault();
  const user = await getUserWhoPosted();
  let categoryId = e.target.children.category.value;
  const title = e.target.children.title.value;
  const desc = e.target.children.desc.value;
  const img = e.target.children.img;
 let imgFile = img.files[0];
  const userId = user.id;
  const userFname = user.fName;
  const userLname = user.lName;

  if (categoryId === "choseCategory") {
    categoryId = undefined;
  }


  let formData = new FormData();  
  formData.append('categoryId', categoryId);
  formData.append('title', title);
  formData.append('desc', desc);
  formData.append('userId', userId);
  formData.append('userFname', userFname);
  formData.append('userLname', userLname);
  formData.append('img', imgFile,imgFile.name);
  fetch("/posts", {
    method: "POST",
    headers: {
        
    },
       body: formData,
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (!data.posted) {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "אנא בדוק שכל השדות תקינים",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "פוסט פורסם בהצלחה",
          showConfirmButton: false,
          timer: 2000,
        });
        hideNewPostBox();

        window.location.href = `/posts.html?${categoryId}`;
      }
    });
};
