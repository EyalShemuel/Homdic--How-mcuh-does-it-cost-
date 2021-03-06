//if admin display this.
const displayAdminCategory = async () => {
  let checkAdmin = await handleCheckAdmin();

  if (checkAdmin) {
    document.querySelector(".category__admin").style.display = "block";
  }
};
const handleDisplayAddCategory = () => {
  document.querySelector(".category__adminAddCategoryForm").style.display =
    "block";
};
// handle new category ( admin )
const handleNewCategory = (e) => {
  e.preventDefault();
  const newCategoryName = document.getElementById("categoryInput").value;
  const newCategoryImg = document.getElementById("categoryImgInput").value;

  fetch("/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCategoryName, newCategoryImg }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) {
        console.log("error adding category");
      } else {
        writeCategoiresToDom(data.categories);
      }
    });
};

// button to show menu of edit or delete for amdin.
const showEditOrDeleteCategory = (e) => {
  let deleteButton = document.querySelectorAll(".deleteCategory"),
    i;
  let editButton = document.querySelectorAll(".editCategory");

  for (i = 0; i < deleteButton.length; ++i) {
    deleteButton[i].style.display = "inline";
    editButton[i].style.display = "inline";
  }
  e.stopPropagation();
};
// button to hide menu of edit or delete for amdin.
const hideEditOrDeleteCategory = () => {
  let deleteButton = document.querySelectorAll(".deleteCategory"),
    i;
  let editButton = document.querySelectorAll(".editCategory");

  for (i = 0; i < deleteButton.length; ++i) {
    deleteButton[i].style.display = "none";
    editButton[i].style.display = "none";
  }
};
//delete category
const deleteCategory = (e) => {
  e.stopPropagation();
  const chosenCategoryid = e.target.parentNode.dataset.id;

  console.log('delete category')
  fetch("/category", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chosenCategoryid }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      writeCategoiresToDom(data.categories);
    });
};
//edit category
const editCategoryForm = (e) => {
  e.stopPropagation();
  const categoryName = e.target.parentNode.dataset.name;
  const categoryImg = e.target.parentNode.dataset.img;
  const categoryId = e.target.parentNode.dataset.id;
  document.querySelector(".category__edit").style.display = "block";

  let editCategoryFormHtml = `
    <label>שם קטגוריה: ${categoryName}</label>
    <img src="${categoryImg}">
    <form onsubmit="editCategory(event)">
    <input type="text" data-name='${categoryName}' data-id='${categoryId}' name='name' placeholder="שם חדש">
        <input type="text" data-img='${categoryImg}' name='img' placeholder="תמונה חדשה">
        <input type="submit" value="עדכן">
        <button onclick='hideAddCategoryAndEditForm()'>בטל</button>
    </form>
    <label>כל שדה שישאר ריק ישמור את הערך הישן</label>`;

  document.querySelector(".category__edit").innerHTML = editCategoryFormHtml;
};
const hideAddCategoryAndEditForm = () => {
  document.querySelector(".category__edit").style.display = "none";
  document.querySelector(".category__adminAddCategoryForm").style.display =
    "none";
};
const editCategory = (e) => {
  e.preventDefault();
  const categoryId = e.target.children.name.dataset.id;
  const oldCategoryName = e.target.children.name.dataset.name;
  const oldCategoryImg = e.target.children.img.dataset.img;
  let newCategoryName = e.target.children.name.value;
  let newCategoryImg = e.target.children.img.value;
  if (newCategoryName === "") {
    newCategoryName = oldCategoryName;
  }
  if (newCategoryImg === "") {
    newCategoryImg = oldCategoryImg;
  }

  fetch("/category", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId, newCategoryImg, newCategoryName }),
  })
    .then((res) => res.json())
    .then((data) => {
      writeCategoiresToDom(data.categories);
    });
};
