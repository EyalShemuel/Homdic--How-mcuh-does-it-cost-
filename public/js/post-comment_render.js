const type = 'post';
const massage =
  'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
const title = 'מזגן';
const NmTimesViewed = '36';
const postID = 'sklgkh78h89xchv';


const comment = 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
const postedBy = 'eyal shemuel'
const atTdate = "01/01/1999"



function buildOnePost(
  type /*post or comment*/,
  title,
  massage,
  PostImgSrc,
  NmTimesViewed,
  numberOfComments,
  postID,
  fName,
  lName
) {
  /*  */
  const AddCommentButton = ` <div id="AddCommentButton-${postID}" class="Notifications show" onclick="ShowAddComment('${postID}')">
    <span class="material-icons">
      add_circle_outline
    </span>`;
  /*  */
  const TimesViewed = ` <div id="TimesViewed">
    <span class="material-icons"> visibility </span>
    <p>נצפה ${NmTimesViewed} פעמים</p>
  </div>`;
  let leftButton;
  if (type == 'post') {
    leftButton = AddCommentButton;
  } else {
    if (type == 'comment') {
      leftButton = TimesViewed;
    } else {
      leftButton = 'error wrong input type';
    }
  }
  /*  */

  const html = `<div class="post">
    <div onclick='handleClickPost("${postID}")' data-id='${postID}' data-title='${title}' id="postheder">
    <p class="userInfo">${fName + ' ' + lName}</p>
      <h1 class="posttitle">${title}</h1>
      <p class="postbudy">${massage}</p>
      <img id="hederImg" src="${PostImgSrc}" alt="" />

    </div>
    <!--  add comment form -->
    <div id="addComment-${postID}" class="hide addComment">
      <!--hide -->     
    </div>
    <!--  end add comment form -->
    <div class="futter">
      <div id="NotificationsButton" class="Notifications" onclick="PostNotificationsButtonClicked()">
        <span class="material-icons"> notifications </span>
        <p>${numberOfComments} :מס תגובות</p>
      </div>
      <div id="FavoriteButton" class="Notifications" onclick="PostFavoriteButtonClicked()">
        <span class="material-icons"> favorite </span>
        <p>מועדפים</p>
      </div>
      <div id="cancelButton-${postID}" class="Notifications hide" onclick="HideAddComment('${postID}')">
        <span class="material-icons">
          add_circle_outline
        </span>
        <p>בטל</p>
      </div>
      <div id="leftButton">
      ${leftButton}
        <p>רשום תגובה</p>
      </div>
      </div>
      <div data-id='${postID}' data-title='${title}' class='deletePost' id='${postID}'></div>
    </div>
  </div>`;
  return html;
}



function buildOneComment(comment, postedBy, atTdate) {
  const Html =
    `<article class="comment">
   <div ID="bodyComment">
     <p>
      ${massage}
     </p>
   </div>
   <div id="authRouter">
     <p>add by:${postedBy} at ${atTdate}</p>
   </div>
 
   <div id="AddToFavoritButton">
     <span class="material-icons active center" title="הוסף פוסט זה למועדפים">
       favorite
     </span>
   </div>
  </article>`;

  return Html;
}



function renderPostsHeder(HederTitle, src) {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>${HederTitle}</h1>
        <img id="hederImg" src="/./${src}" alt="" />`
}
const renderNoPostsFound = (keywords) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>לא נמצאו פוסטים הכוללים: ${keywords}</h1>`
}
const renderSearchedPostsTitle = (keywords) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>תוצאות חיפוש - ${keywords}</h1><br>`
}
const renderTitleFoundPostsUser = (name) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h1>שלום ${name}, הפוסטים שפירסמת:</h1>`
}
const renderTitlePostForAdmin = (username) => {
  document.querySelector(`#categoryHeder`).innerHTML +=
    `<h2>פוסטים של שם משתמש: ${username}</h2>`
}
