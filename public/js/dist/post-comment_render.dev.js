"use strict";

var type = 'post';
var massage = 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
var title = 'מזגן';
var NmTimesViewed = '36';
var postID = 'sklgkh78h89xchv';
var comment = 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך חקיגו רוגצה. לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיע';
var postedBy = 'eyal shemuel';
var atTdate = "01/01/1999";

function buildOnePost(type
/*post or comment*/
, title, massage, PostImgSrc, NmTimesViewed, numberOfComments, postID, fName, lName) {
  /*  */
  var AddCommentButton = " <div id=\"AddCommentButton-".concat(postID, "\" class=\"Notifications show\" onclick=\"ShowAddComment('").concat(postID, "')\">\n    <span class=\"material-icons\">\n      add_circle_outline\n    </span>");
  /*  */

  var TimesViewed = " <div id=\"TimesViewed\">\n    <span class=\"material-icons\"> visibility </span>\n    <p>\u05E0\u05E6\u05E4\u05D4 ".concat(NmTimesViewed, " \u05E4\u05E2\u05DE\u05D9\u05DD</p>\n  </div>");
  var leftButton;

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


  var html = "<div class=\"post\">\n    <div onclick='handleClickPost(\"".concat(postID, "\")' data-id='").concat(postID, "' data-title='").concat(title, "' id=\"postheder\">\n    <p class=\"userInfo\">").concat(fName + ' ' + lName, "</p>\n      <h1 class=\"posttitle\">").concat(title, "</h1>\n      <p class=\"postbudy\">").concat(massage, "</p>\n      <img id=\"hederImg\" src=\"").concat(PostImgSrc, "\" alt=\"\" />\n\n    </div>\n    <!--  add comment form -->\n    <div id=\"addComment-").concat(postID, "\" class=\"hide addComment\">\n      <!--hide -->     \n    </div>\n    <!--  end add comment form -->\n    <div class=\"futter\">\n      <div id=\"NotificationsButton\" class=\"Notifications\" onclick=\"PostNotificationsButtonClicked()\">\n        <span class=\"material-icons\"> notifications </span>\n        <p>").concat(numberOfComments, " :\u05DE\u05E1 \u05EA\u05D2\u05D5\u05D1\u05D5\u05EA</p>\n      </div>\n      <div id=\"FavoriteButton\" class=\"Notifications\" onclick=\"PostFavoriteButtonClicked()\">\n        <span class=\"material-icons\"> favorite </span>\n        <p>\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD</p>\n      </div>\n      <div id=\"cancelButton-").concat(postID, "\" class=\"Notifications hide\" onclick=\"HideAddComment('").concat(postID, "')\">\n        <span class=\"material-icons\">\n          add_circle_outline\n        </span>\n        <p>\u05D1\u05D8\u05DC</p>\n      </div>\n      <div id=\"leftButton\">\n      ").concat(leftButton, "\n        <p>\u05E8\u05E9\u05D5\u05DD \u05EA\u05D2\u05D5\u05D1\u05D4</p>\n      </div>\n      </div>\n      <div data-id='").concat(postID, "' data-title='").concat(title, "' class='deletePost' id='").concat(postID, "'></div>\n    </div>\n  </div>");
  return html;
}

function buildOneComment(comment, postedBy, atTdate) {
  var Html = "<article class=\"comment\">\n   <div ID=\"bodyComment\">\n     <p>\n      ".concat(massage, "\n     </p>\n   </div>\n   <div id=\"authRouter\">\n     <p>add by:").concat(postedBy, " at ").concat(atTdate, "</p>\n   </div>\n \n   <div id=\"AddToFavoritButton\">\n     <span class=\"material-icons active center\" title=\"\u05D4\u05D5\u05E1\u05E3 \u05E4\u05D5\u05E1\u05D8 \u05D6\u05D4 \u05DC\u05DE\u05D5\u05E2\u05D3\u05E4\u05D9\u05DD\">\n       favorite\n     </span>\n   </div>\n  </article>");
  return Html;
}

function renderPostsHeder(HederTitle, src) {
  document.querySelector("#categoryHeder").innerHTML += "<h1>".concat(HederTitle, "</h1>\n        <img id=\"hederImg\" src=\"/./").concat(src, "\" alt=\"\" />");
}

var renderNoPostsFound = function renderNoPostsFound(keywords) {
  document.querySelector("#categoryHeder").innerHTML += "<h1>\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05D4\u05DB\u05D5\u05DC\u05DC\u05D9\u05DD: ".concat(keywords, "</h1>");
};

var renderSearchedPostsTitle = function renderSearchedPostsTitle(keywords) {
  document.querySelector("#categoryHeder").innerHTML += "<h1>\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9 - ".concat(keywords, "</h1><br>");
};

var renderTitleFoundPostsUser = function renderTitleFoundPostsUser(name) {
  document.querySelector("#categoryHeder").innerHTML += "<h1>\u05E9\u05DC\u05D5\u05DD ".concat(name, ", \u05D4\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05E4\u05D9\u05E8\u05E1\u05DE\u05EA:</h1>");
};

var renderTitlePostForAdmin = function renderTitlePostForAdmin(username) {
  document.querySelector("#categoryHeder").innerHTML += "<h2>\u05E4\u05D5\u05E1\u05D8\u05D9\u05DD \u05E9\u05DC \u05E9\u05DD \u05DE\u05E9\u05EA\u05DE\u05E9: ".concat(username, "</h2>");
};