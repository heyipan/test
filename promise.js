/*new Promise((resolve,reject)=> {
    resolve('1111');
});*/
class Promise2 {
    constructor(executor){
        const self = this;
        this.status = 'pending'; //等待态
        this.value  = undefined; // 表示当前成功的值
        this.reason = undefined; // 表示是失败的值
        const resolve=(value)=>{ // 成功的方法
            if(self.status === 'pending'){
                self.status = 'resolved';
                self.value = value;
            }
        }
        const reject = (reason)=>{ //失败的方法
            if(self.status === 'pending'){
                self.status = 'rejected';
                self.reason = reason;
            }
        }
        executor(resolve,reject);
    }
     then(onFufiled,onRejected) {
        let timer = null;
        timer = setInterval(()=> {
            if (this.status !== 'pending') {
                if (this.status === 'resolved') {
                    onFufiled(this.value);
                }
                if (this.status === 'rejected') {
                    onRejected(this.reason);
                }
                clearInterval(timer);
            }
        },0)

    }
}
function timeout(ms) {
    return new Promise2((resolve,reject) => {
        setTimeout(resolve, ms);
       /* console.log(111);
        resolve();*/
    });
}

timeout(3000).then(() => {
    console.log('我3秒后被输出');
});