const checkAvatarUrl=(oldUrl, newUrl)=>{
    if(oldUrl.includes("www.gravatar.com")){
        return false;
    }
    return oldUrl!==newUrl
}

module.exports= checkAvatarUrl;