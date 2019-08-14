// async function async1() {


//     console.log( 'async1 start' )


//     await async2()


//     console.log( 'async1 end' )


// }

// async function async2() {
//     console.log( 'async2' );
//     return Promise.resolve(undefined);
// }


// console.log('script start' )


// setTimeout( function () {


//     console.log( 'setTimeout' )


// }, 0 )


// async1();


// new Promise( function ( resolve ) {


//     console.log( 'promise1' )


//     resolve();


// } ).then( function () {


//     console.log( 'promise2' )


// } )

//2.
// console.log( 'script end' )

// function testSometing() {
//     console.log("执行testSometing");
//     return "testSometing";
// }

// async function testAsync() {
//     console.log("执行testAsync");
//     return Promise.resolve("hello async");
// }

// async function test() {
//     console.log("test start...");
//     const v1 = await testSometing();//关键点1
//     console.log(v1);
//     const v2 = await testAsync();
//     console.log(v2);
//     return v2;
// }

// let a =test();

// var promise = new Promise((resolve)=> { console.log("promise start.."); resolve("promise");});//关键点2
// promise.then((val)=> console.log(val));

// console.log("test end...")




// 'use strict'
var name = "windowsName";
var a = {
    name: "Cherry",
    fn: () => {
        console.log(this.name, this);
    }
}
a.fn(); //this--->window
window.a.fn(); //this--->window
let b = a.fn;
b(); //this --->window
//原因： 箭头函数指向当前当前函数的作用域  由于对象没有作用域 所以fn的作用域是全局作用域 所以this指向了window


// “use strict”
var name = "windowsName";
var a = {
    name: "Cherry",
    fn: function () {
        console.log(this.name, this);
    }
}
a.fn(); //this ---> a  因为a调用fn
window.a.fn(); //this --->a  window.a 这一步的时候 this指向window a.fn this指向a 最终this指向a
let b = a.fn; //b得到是fn的内存地址
b(); //this ---> window  当设置为严格模式的时候 this不会指向window 所以会报错
//如果没有用箭头函数 则会指向调用它的对象 

// “use strict”
var name = "windowsName";

function c() {
    var name = 'hqh';
    var a = {
        name: "Cherry",
        fn: () => {
            console.log(this.name, this);
        },
        fn2: function () {
            console.log(this);
        }
    }
    console.log(this);
    return a;
}
console.log(c()); //函数c中 this---window 指向调用它的对象
c().fn(); //this --->window 因为箭头函数内部的this是指向外层代码块的this， 箭头函数根本没有自己的this，导致内部的this指向了外层代码的this，这个指向在定义时就已经确定而不会在调用时指向其执行环境的（变量）对象。
window.c().fn(); //this --->window 箭头函数不会因为在调用时指向其执行环境的（变量）对象\
window.c().fn2(); //this --a 
let b = c().fn2;
b();


var obj = {
    age: 18,
    getAge: function () {
        console.log(this)  //obj 谁调用指向谁 指向obj
        var fn = function () {
            console.log(this) //window 函数中的this都指向window
        }
        return fn();
    }
}
console.log(obj.getAge());

var obj = {
    age: 18,
    getAge: function () {
        console.log(this) ////obj 谁调用指向谁 指向obj
        var fn = () => console.log(this); //obj 箭头函数根本没有自己的this，导致内部的this指向了外层代码的this  
        return fn();
    }
}
console.log(obj.getAge());

var o = {
    a: 10,
    b: {
        // a:12,
        fn: () => {
            console.log(this); //undefined
        }
    }
}
o.b.fn();