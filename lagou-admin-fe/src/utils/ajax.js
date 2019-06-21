function xhrGet(url,data){
    return new Promise((resolve,reject)=>{
      var xhr = new XMLHttpRequest();
      if(typeof data !== "function" && data instanceof Object){
            // 拼接字符串; 
            var _arr = [];
            for(var key in data){
                  _arr.push( `${key}=${data[key]}`)
            }     
            var _symbol = /\?/.test(url) ? "&" : "?";
            url += _symbol + _arr.join("&")
      }
      xhr.open("GET",url);
      xhr.send(null);
      xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200) 
            resolve(xhr.responseText);
      }
    })
}

function xhrPost(url,data){
    return new Promise((resolve,reject)=>{
          var xhr = new XMLHttpRequest();
          xhr.open("POST",url);
          xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          var _data = [];
          for(let key in data){
                _data.push(`${key}=${data[key]}`);
          }
          xhr.send(_data.join("&"));
          xhr.onload = function(){
                xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.status);
          }
    })
}

export default {
    xhrGet,
    xhrPost
}