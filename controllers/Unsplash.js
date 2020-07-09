const fetch = require("node-fetch");

const serialize =function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const unsplash_methods = {
  searchOnQuery:  (queryobj) => {
   
    let queryString=serialize(queryobj)
  //  console.log(process.env.UNSPLASH_BASE_URL+"search/photos?+"+queryString+"client_id="+process.env.UNSPLASH_API)
    return fetch(process.env.UNSPLASH_BASE_URL+"search/photos?"+queryString+"&client_id="+process.env.UNSPLASH_API)
  },
  downloadTrigger:(url)=>{
    return fetch(url+"?client_id="+process.env.UNSPLASH_API)
  }
 
}
module.exports = unsplash_methods
