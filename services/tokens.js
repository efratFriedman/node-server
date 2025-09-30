const TOKENS=[];

const isTokenActive=(token)=>TOKENS.includes(token);
const addToken=(token)=>{TOKENS.push(token)};

const removeToken=(token)=>{
    const index=TOKENS.indexOf(token);
    if(index>-1){
        TOKENS.splice(index,1);
    }
}

module.exports={isTokenActive,addToken,removeToken};
