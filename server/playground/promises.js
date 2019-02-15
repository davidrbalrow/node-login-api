console.log('test1');
 
  function1 = (test) =>{
    console.log('func1');
   return new Promise(function(resolve, reject) {
        if (test==='hi'){
            console.log('if');  
        resolve(test);}
        else{
            console.log('else'); 
            reject('reject');
        }
      });

}

  
outerFunction = (outer) => {
 return function1(outer).then((value) => {
       console.log('then');
    console.log(value);
    return(value);
  }).catch((e)=>{return Promise.reject(e)});
}

newPageFunc = () => {
    outerFunction('his').then((res)=>{console.log('new page',res)}).catch
    ((e)=>{console.log(e)});
}


//newPageFunc();


// outerFunction = (outer) => {
//     function1(outer).then(function(value) {
//     console.log(value);
//   }).catch((e)=>{console.log(e)});
// }

// newPagefunc = () => {
//     outerFunction('hi').then((res)=>{console.log('new page',res)})
  
// }

function2 = async (test) =>{
    console.log('func2');
        if (test==='hi'){
            console.log('if2');  
        return(test);}
        else{
            console.log('else2'); 
            throw('reject');
        }
};

  
outerFunction2 = async (outer) => {
    try{

        const res = await function2(outer);
        return(res);
    }
    catch(e) {
        return(e);
    }
  
  };

newPageFunc2 = async () => {
    try{
       const res = await outerFunction2('his');
       console.log('new page2',res);
    } catch(e) {
        console.log(e)
    }
}


newPageFunc2();
