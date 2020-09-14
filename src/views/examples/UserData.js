var UserData = (function() {
  
    var getToken = function() {
      return localStorage.getItem("token");    // Or pull this from cookie/localStorage
    };
  
    var setToken = function(token) {
      localStorage.setItem("token", token)    
      // Also set this in cookie/localStorage
    };

    var removeToken = function() {
        localStorage.removeItem("token")
    }
  
    return {
      getToken: getToken,
      setToken: setToken,
      removeToken:removeToken
    }
  
  })();
  
  export default UserData;