// 实现功能： 自动执行 Generator 返回的 Promise 对象， 并且将 Promise 的结果在传入到 Generator 进行下一次运行。
function autoRunGen(gen) {
    let result = gen();
    result.next().value.then((data) => {
        return result.next(data).value;
    }).then((data)=> {
        result.next(data)
    })
}
/*参考文章 利用递归*/
function co(gen){
    let result = gen();

    function next(data){
        let result2 = result.next(data);
        if(result2.done) {
            return false;
        }else {
            result2.value.then(function(data) {
                next(data)
            })
        }
    }
    next();

}

function* fetchStepGen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    var jsonData = yield result.json();
    console.log(jsonData.bio); // "How people build software."
}

autoRunGen(fetchStepGen);
co(fetchStepGen);