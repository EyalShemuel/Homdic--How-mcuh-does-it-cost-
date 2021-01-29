function HideAddComment(postID) {
  document
    .querySelector(`#AddCommentButton-${postID}`)
    .classList.replace("hide", "show");
  document
    .querySelector(`#cancelButton-${postID}`)
    .classList.replace("show", "hide");
  document
    .querySelector(`#addComment-${postID}`)
    .classList.replace("show", "hide");
}

function ShowAddComment(postID, numberOfComments) {
  document.querySelector(`#addComment-${postID}`).innerHTML = `<div>
    <p>הוסף תגובה</p>
    <form onsubmit='handleNewComment(event, "${postID}", "${numberOfComments}")'>
      <textarea style='resize: none;' name="message"></textarea>
      <input type='text' name="price" placeholder='מחיר'>
      <input type="submit" value="שלח">
    </form>
  </div>`;
  document
    .querySelector(`#AddCommentButton-${postID}`)
    .classList.replace("show", "hide");
  document
    .querySelector(`#cancelButton-${postID}`)
    .classList.replace("hide", "show");
  document
    .querySelector(`#addComment-${postID}`)
    .classList.replace("hide", "show");
}

function PostFavoriteButtonClicked() {
  document.querySelector("#FavoriteButton").classList.toggle("Toggled");
}

// delete post user/admin
const handleDeletePost = (e) => {
  const postId = e.target.parentNode.dataset.id;
  const postTitle = e.target.parentNode.dataset.title;

  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: `כותרת פוסט שנבחר: ${postTitle}<br>לא יהיה אפשר לשחזר מידע זה!`,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק פוסט!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.deleted) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "פוסט נמחק בהצלחה",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = window.location.href;
            if (url.includes("posts")) {
              location.reload();
            } else {
              window.location.href = "/categories.html";
            }
          } else {
            alert("תקלה במחיקת פוסט");
          }
        });
    }
  });
};
const handleClickPost = (postId) => {
  console.log(postId);
  window.location.href = `/comments.html?${postId}`;
};

const getRenderPostComments = () => {
  const url = window.location.href;
  const postId = url.split("?")[1];

  fetch(`/comments/${postId}`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.status === "unauthorized") {
        window.location.href = "index.html";
      } else {
        const post = data.post;
        const comments = data.comments;
        let userInfo = await getUserInfo();
        let userId = userInfo.id;
        let isAdmin = false;
        isAdmin = await handleCheckAdmin();
        let isUsersPost = false;
        const isFavorite = await checkIfPostFavorite(post._id, userId);

        const postCreatedTime = Date.parse(post.createdAt)
        const timeAgo = timeSince(postCreatedTime)

        if (post.publishedBy === userId) {
          isUsersPost = true;
        }

        const html = buildOnePost(
          "post",
          post.title,
          post.desc,
          post.img,
          postCreatedTime,
          timeAgo,
          "0",
          comments.length,
          post._id,
          post.fName,
          post.lName,
          isFavorite
        );
        app.style.top = "8%";
        let newAppSection = app.innerHTML.replace(
          '<div class="commenstsSection">',
          html + '<div class="commenstsSection">'
        );
        app.innerHTML = newAppSection;

        if (isUsersPost || isAdmin) {
          document.getElementById(
            `${post._id}`
          ).innerHTML = `<button class='deletePostButton' style="display:block;" onclick="handleDeletePost(event)">מחק פוסט</button>`;
        }

        comments.forEach(async (comment) => {
          userInfo = await getUserInfo();
          userId = userInfo.id;
          let isUsersComment = false;
          if (comment.publishedBy === userId) {
            isUsersComment = true;
          }
          // const date = comment.createdAt;
          // const x = date.split("T")[1];
          // const when = x.split("+")[0];

          const commentCreatedTime = Date.parse(comment.createdAt)
          const timeAgo = timeSince(commentCreatedTime)
          console.log(timeAgo)

          const liked = await checkIfUserLikedComment(comment._id, userId);
          const likesAmount = await checkHowMuchLikes(comment._id);
          const app = document.querySelector(".commenstsSection");
          const fullComment = buildOneComment(
            comment.desc,
            comment.price,
            comment.fName,
            comment.lName,
            commentCreatedTime,
            timeAgo,
            comment._id,
            liked,
            likesAmount,
            isUsersComment
          );
          app.innerHTML += fullComment;
        });
      }
    });
};
const checkIfUserLikedComment = async (commentId, userId) => {
  let checkLike = false;
  await fetch("/comments/user/like/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      checkLike = data.checkLike;
    });

  return checkLike;
};
const checkHowMuchLikes = async (commentId) => {
  let likedAmount;
  await fetch("/comments/likedAmount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  })
    .then((res) => res.json())
    .then((data) => {
      likedAmount = data.likeAmount;
    });
  return likedAmount;
};
const handleNewComment = async (e, postID, numberOfComments) => {
  e.preventDefault();
  let user = await getUserWhoPosted();

  const userId = user.id;
  const fName = user.fName;
  const lName = user.lName;

  const commentMessage = e.target.children.message.value;
  const commentPrice = e.target.children.price.value;

  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postID,
      userId,
      fName,
      lName,
      commentMessage,
      commentPrice,
    }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.posted) {
        const url = window.location.href;
        if (url.includes("posts")) {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "תגובה פורסמה בהצלחה",
            showConfirmButton: false,
            timer: 1500,
          });
          HideAddComment(postID)
          handleShowPostsComments(numberOfComments, postID)
          // handleClickPost(postID);
        } else {
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "תגובה פורסמה בהצלחה",
            showConfirmButton: false,
            timer: 1500,
          });
          HideAddComment(postID)
          handleShowPostsComments(numberOfComments, postID)
        }
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "אנא בדוק שכל השדות תקינים",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};
const handleDeleteComment = (commentId) => {
  Swal.fire({
    title: "האם את/ה בטוח/ה?",
    html: `לא יהיה אפשר לשחזר מידע זה!`,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "לא, בטל!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "כן, מחק תגובה!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.deleted) {
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "תגובה נמחקה בהצלחה",
              showConfirmButton: false,
              timer: 1500,
            });
            location.reload();
          }
        });
    }
  });
};
const handleLikeComment = async (commentId) => {
  let user = await getUserWhoPosted();
  const userId = user.id;

  fetch("/comments/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, userId }),
  })
    .then((res) => res.json())
    .then(async () => {
      const likesAmount = await checkHowMuchLikes(commentId);
      document.querySelector(
        `.likeComment-${commentId}`
      ).innerHTML = `<span onclick="handleUnLikeComment('${commentId}')" class="material-icons active center liked" title="הורד לייק">favorite_border
      </span><span class='likesAmount' >${likesAmount}</span>`;
    });
};
const handleUnLikeComment = async (commentId) => {
  let user = await getUserWhoPosted();
  const userId = user.id;

  fetch("/comments/like", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, userId }),
  })
    .then((res) => res.json())
    .then(async () => {
      const likesAmount = await checkHowMuchLikes(commentId);
      document.querySelector(
        `.likeComment-${commentId}`
      ).innerHTML = `<span onclick="handleLikeComment('${commentId}')" class="material-icons active center unliked" title="לייק לתגובה">favorite_border
      </span><span class='likesAmount'>${likesAmount}</span>`;
    });
};
const handleFavoritePost = async (postID) => {
  let user = await getUserWhoPosted();
  const userId = user.id;

  fetch("/posts/favorite/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postID, userId }),
  })
    .then((res) => res.json())
    .then(async () => {
      document.querySelector(
        `.fav-${postID}`
      ).innerHTML = `<span class="material-icons fav" onclick="handleDeleteFavoritePost('${postID}')"> star </span><p>מועדפים</p>`;
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "פוסט נוסף למועדפים",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};
const handleDeleteFavoritePost = async (postID) => {
  let user = await getUserWhoPosted();
  const userId = user.id;
  fetch("/posts/favorite/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postID, userId }),
  })
    .then((res) => res.json())
    .then(async () => {
      const url = window.location.href;
      const params = url.split("?")[1];

      document.querySelector(
        `.fav-${postID}`
      ).innerHTML = `<span class="material-icons notFav" onclick="handleFavoritePost('${postID}')"> star </span><p>מועדפים</p>`;
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "פוסט נמחק מהמועדפים",
        showConfirmButton: false,
        timer: 1500,
      });
      if (params.includes("myfavorites")) {
        location.reload();
      }
    });
};
const checkIfPostFavorite = async (postID, userId) => {
  let checkFav = false;
  await fetch("/posts/favorite/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postID, userId }),
  })
    .then((res) => res.json())
    .then((data) => {
      checkFav = data.checkFav;
    });

  return checkFav;
};

const handleShowPostsComments = (numberOfComments, postId) => {

  const app = document.querySelector(`.renderComment-${postId}`);

  if (app.innerHTML.length > 0) {
    handleHidePostsComments(numberOfComments, postId)
  } else {

    fetch(`/comments/${postId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === "unauthorized") {
          window.location.href = "index.html";
        } else {
          document.querySelector(`.commentArrow-${postId}`).innerHTML
            = `<span data-id='${postId}' data-comments='${numberOfComments}' onclick="handleHidePostsComments('${numberOfComments}', '${postId}')" class="material-icons">arrow_upward</span>
         <p data-id='${postId}' data-comments='${numberOfComments}' onclick="handleHidePostsComments('${numberOfComments}', '${postId}')">תגובות: ${numberOfComments}</p>`;

          app.innerHTML = ''
          let commentsHtml = ''
          const comments = data.comments;
          let userInfo = await getUserInfo();
          let userId = userInfo.id;
          let isAdmin = false;
          isAdmin = await handleCheckAdmin();

          for (i = 0; i < comments.length; i++) {
            userInfo = await getUserInfo();
            userId = userInfo.id;
            let isUsersComment = false;
            if (comments[i].publishedBy === userId) {
              isUsersComment = true;
            }
            const commentCreatedTime = Date.parse(comments[i].createdAt)
            const timeAgo = timeSince(commentCreatedTime)

            const liked = await checkIfUserLikedComment(comments[i]._id, userId);
            const likesAmount = await checkHowMuchLikes(comments[i]._id);
            const fullComment = buildOneComment(
              comments[i].desc,
              comments[i].price,
              comments[i].fName,
              comments[i].lName,
              comments[i],
              timeAgo,
              comments[i]._id,
              liked,
              likesAmount,
              isUsersComment
            );
            commentsHtml += fullComment
          }
          // comments.forEach(async (comment) => {
          //   userInfo = await getUserInfo();
          //   userId = userInfo.id;
          //   let isUsersComment = false;
          //   if (comment.publishedBy === userId) {
          //     isUsersComment = true;
          //   }

          // const commentCreatedTime = Date.parse(comment.createdAt)
          // const timeAgo = timeSince(commentCreatedTime)

          // const liked = await checkIfUserLikedComment(comment._id, userId);
          // const likesAmount = await checkHowMuchLikes(comment._id);
          // const fullComment = buildOneComment(
          //   comment.desc,
          //   comment.price,
          //   comment.fName,
          //   comment.lName,
          //   commentCreatedTime,
          //   timeAgo,
          //   comment._id,
          //   liked,
          //   likesAmount,
          //   isUsersComment
          // );
          // app.innerHTML += fullComment;
          // });
          app.innerHTML = commentsHtml;
          app.innerHTML += `<button class='hideCommentsButton' onclick="handleHidePostsComments('${numberOfComments}', '${postId}')">החבא תגובות</button>`
        }
      });
  }
}
const handleHidePostsComments = (numberOfComments, postId) => {
  document.querySelector(`.commentArrow-${postId}`).innerHTML
    = `<span data-id='${postId}' data-comments='${numberOfComments}' onclick="handleShowPostsComments('${numberOfComments}', '${postId}')" class="material-icons">arrow_downward</span>
  <p data-id='${postId}' data-comments='${numberOfComments}' onclick="handleShowPostsComments('${numberOfComments}', '${postId}')">תגובות: ${numberOfComments}</p>`;

  const app = document.querySelector(`.renderComment-${postId}`);
  app.innerHTML = ''
}
