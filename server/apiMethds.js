var UMANJI_API_VERSION = 'v1'
var UMANJI_API_URL = 'http://52.24.76.87:3000/' + UMANJI_API_VERSION
// var UMANJI_API_URL = 'http://localhost:3000/' + UMANJI_API_VERSION


function queryToUrlparamString(query) {
  var paramString = "?"

  _.each(query, function(value, key) {
    paramString += key;
    paramString += '=' + value + "&";
  })
  return paramString;
}

Meteor.methods({
  loginApi (query) {
    try {
      var response = HTTP.post(UMANJI_API_URL + '/signin', {params: query});
      return response.data;
    } catch (error) {
        return error.response.data;
    }
  },

  signupApi (query) {
    try {
      var response = HTTP.post(UMANJI_API_URL + '/signup', {params: query});
      return response.data;
    } catch (error) {
        return error.response.data;
    }
  },

  findMainPostsApi(query) {
    query.type = 'POST'
    query.keywords = 'programer'

    var paramString = queryToUrlparamString(query)

    try {
        var response = HTTP.get(UMANJI_API_URL + '/channels' + paramString);
        return response.data;
    } catch (error) {
        console.log(error);
        error.response.data;
    }
  },


  createPostApi(query, access_token) {
    query.type = 'POST';
    query.keywords = 'programer';

    try {
      var response = HTTP.post(UMANJI_API_URL + '/channels?access_token='+access_token, {params: query});
      return response.data;
    } catch (error) {
      console.log('error', error);
       error.response.data;
    }
  },
});
