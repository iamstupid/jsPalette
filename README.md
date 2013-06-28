jsPalette
=========

A color managing tool
---------------

>JS palette,I created for managing(also for fun),because I am looking Caleb Evans' own website,and I played swatches.It's great fun.   

>Then I decided to save it,there is a save button on the page,but something wrong,it doesn't work.Then I explored the localStorage, it's json code is there,so I copied it to my computer.Then,I created this for managing my file.   

>I wrote it,and it works.Then I was going to add functions for it,also works.   
Now it can manage colors,mix and split,create collections and use.Also,it can change HEX color code into RGB.   
We use RGB to do operating and use HEX color code to output.   
   
HOW TO USE
---------
Include `palette.js` then init your collection   
(palette object is an array with a lot of additional methods)   
push your file and collection name into it   
(EXAMPLE:`palette.push({file:your file name,collections:[array of collections name]})`   
load a collection:`palette.init(collection name)`    
to use:`palette.use(collection name,index)`   
write a collection file
------------
```javascript
  var collects={
         "collections": [
            { "name": "blue", "swatches": ["dark blue", "#00b", "blue", "#03f", "#05f", "#07f", "#09f", "#0af", "#0cf", "#0df", "#0ef", "aqua", "#3ff", "#7ff", "#aff", "#bff", "#ccffff", "#309", "#60c", "#90f"] },
            { "name": "grayness", "swatches": ["black", "#222", "#444", "#666", "#888", "#aaa", "#111", "#333", "#555", "#777", "#999", "#bbb", "#222", "#444", "#666", "#888", "#aaa", "#ccc", "#333", "#555", "#777", "#999", "#bbb", "#ddd", "#444", "#666", "#888", "#bbb", "#ddd", "#fff"] },
            { "name": "rainbow", "swatches": ["red", "#f50", "#f90", "yellow", "#7f0", "lime", "#0f7", "aqua", "#07f", "blue", "#70f", "#f0f", "#f07", "#f00"] }
          ]
       }
```
>First,write `collects={`   
Then,write `collections`or`"collections"` `:[`   
`{name:"collection name",swatches:{dark green:"#070"}}`   
`]}`   
>This is very easy to manage.
