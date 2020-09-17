var UserData = (function () {

  var getToken = function () {
    return localStorage.getItem("token");    // Or pull this from cookie/localStorage
  };



  var removeToken = function () {
    localStorage.removeItem("token", "userName", "userid")
  }


  var setCurrentBoardData = function(data) {
    localStorage.setItem("boardId", data.boardid);
    localStorage.setItem("boardTitle", data.boardname);
  }
 
  var setCurrentBoardLists = function(data) {
    localStorage["lists"] = JSON.stringify(data);
  }

  var getCurrentBoardLists =function(){
   return  JSON.parse(localStorage.getItem("lists"))
  }

  var updateCurrentBoardTitle = function(data) {
    localStorage.setItem("boardTitle", data);
  }
 
  
  var getCurrentBoardTitle =function() {
    return localStorage.getItem("boardTitle")
  }

  var getCurrentBoardId =function() {
    return localStorage.getItem("boardId")
  }

  var setUserData = function (data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.username);
    localStorage.setItem("userId", data.user.id)
  }

  var getName = function () {
    return localStorage.getItem("userName")
  }

  var getId = function () {
    return localStorage.getItem("userId")
  }
  return {
    setUserData: setUserData,
    removeToken: removeToken,
    getToken: getToken,
    getName: getName,
    getId: getId,
    setCurrentBoardData:setCurrentBoardData,
    getCurrentBoardTitle:getCurrentBoardTitle,
    getCurrentBoardId:getCurrentBoardId,
    setCurrentBoardLists:setCurrentBoardLists,
    getCurrentBoardLists:getCurrentBoardLists,
    updateCurrentBoardTitle:updateCurrentBoardTitle
  }

})();

export default UserData;