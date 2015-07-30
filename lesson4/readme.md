//本节主要学习 nodejs的 异步并发  

//异步不多说，ajax中的异步跟这个一样

这里主要是利用了 回调函数来实现并发

可以这样理解，40个请求，每个请求对于node来说都是异步的，但是这里的并发只得是等这40条请求都已经被异步处理完后，再来执行一个回调。`callback`

课程中举了两个例子：
1.采用计数器，每个异步请求完成后，计数器加1，很明显，我们这里要等到计数器到40之后才进行总的回调处理；


而用eventproxy来处理的话，
```js
var ep = new eventProxy();
ep.all('data1_event', 'data2_event',  'data3_event', function (data1, data2, data3){
        var html = fuck(data1, data2, data3);
        render(html);
    });

$.get('http://data1_source', function (data){
        ep.emit('data1_event', data);
    });

$.get('http://data2_source', function (data){
        ep.emit('data2_event', data);
    });

 $.get('http://data3_source', function (data){
        ep.emit('data3_event', data);
    });   
```
每个异步请求使用处理完之后，就通过emit来告诉eventProxy的ep实例，某某事件已经被处理完成；  这时，并不会再做什么处理，只有所有事件都完成的时候，就会调用all后面的function来fuck所有的数据，统一处理。  

eventProxy的after API是指重复异步动作：

```js
var ep = new eventProxy();
ep.after('got_file', files.length, function (list){
    //在所有的异步执行结束后才执行下面的代码，这时候，所有的文件的内容都会被存在list数组中

    });
for(var i=0; i<files.length; i++){
    fs.readFiles(files[i], 'utf-8', function (err, content){
        //触发结果事件，通知ep这一次的异步请求处理完了
        ep.emit('got_file', content);
        });
}
```

上述代码的意思是 用相同的方式分别读取一系列文件；只有当这一系列文件都被读取完之后，才会触发回调事件
