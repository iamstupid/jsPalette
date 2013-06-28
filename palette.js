var palette = Array();
palette.loaded = [];
palette.init = palette.load = function (collectionName) {
    var name="";
    for (i in this) {
        var x = false;
        for (j in this[i].collections) {
            if (this[i].collections[j] == collectionName) {
                name = this[i].file;
                x = true;
                break;
            }
        }
        if (x) {
            break;
        }
    }
    if (name == "") {
        console.log("can't find file.")
        return  this;
    } else {
        var s=false;
        for (x in this.loaded) {
            if (this.loaded[x] == name) {
                s = true;
                break;
            }
        }
        if (s) {
            return this;
        } else {
            importScripts(name);
            this.loaded.push(name);
            var col = (collects["collections"]);
            this.colletions=this.colletions.concat(col);
            return this;
        }
    }
}
var collects;
palette.colletions = [];
palette.use = function (collection, index) {
    for (i in this.colletions) {
        if (this.colletions[i].name == collection) {
            return this.colletions[i].swatches[index];
        }
    }
    return false;
}
palette.hex="0123456789ABCDEF"
palette.grayness = function (n) {
    if (n < 256 && Math.floor(n) == n && n > -1) {
        var a = n % 16;
        var b = Math.floor(n / 16);
        a = this.hex[a];
        b = this.hex[b];
        var s = String(b).concat(String(a));
        s = "#" + s + s + s;
        return s;
    } else {
        return false;
    }
}
function toByte(n){
    n=Math.floor(n);
    n=(n<0?0:n);
    n=(n>255?255:n);
    return n;
}
function tByteS(params) {
    for (i in params) {
        params[i] = toByte(params[i]);
    }
    return params;
}
palette.rgb = function (r, g, b) {
    var thiss = Object({ value: {r:0,g:0,b:0}});
    thiss.value = tByteS({ r: r, g: g, b: b });
    return thiss;
}
function toHex(thiss) {
    var x = tByteS(thiss.value);
    var n = 0;
    var a = 0, b = 0, s = "#", ss = "";
    for (i in x) {
        n = x[i];
        a = (n) % 16;
        b = Math.floor(n / 16);
        a = palette.hex[a];
        b = palette.hex[b];
        ss = String(b).concat(String(a));
        s += ss;
    }
    return s;
}
if (!importScripts) {
    var importScripts = (function (globalEval) {
        try {
            var xhr = new XMLHttpRequest;
            return function importScripts() {
                var
                args = Array.prototype.slice.call(arguments)
                , len = args.length
                , i = 0
                , meta
                , data
                , content
                ;
                for (; i < len; i++) {
                    if (args[i].substr(0, 5).toLowerCase() === "data:") {
                        data = args[i];
                        content = data.indexOf(",");
                        meta = data.substr(5, content).toLowerCase();
                        data = decodeURIComponent(data.substr(content + 1));
                        if (/;\s*base64\s*[;,]/.test(meta)) {
                            data = atob(data);
                        }
                        if (/;\s*charset=[uU][tT][fF]-?8\s*[;,]/.test(meta)) {
                            data = decodeURIComponent(escape(data));
                        }
                    } else {
                        xhr.open("GET", args[i], false);
                        xhr.send(null);
                        data = xhr.responseText;
                    }
                    globalEval(data);
                }
            };
        }
        catch(e) {
            function importScripts(arr) {
                for (i in arr) {
                    file = arr[i];
                    document.write('<script type="text/javascript" src="' + file + '"></script>');
                }
            }
        }
    }(eval));
}
var hexExp=/[0-9,a-f,A-F]/
var hexpattern="0123456789ABCDEF"
function check(hex) {
    if (hex[0] == "#") {
        if (hex.length == 4 || hex.length == 7) {
            isHex = true;
            for (var i = 1; i < hex.length;i++) {
                if (!hexExp.test(hex[i])) {
                    isHex = false;
                }
            }
            if (isHex) {
                return true;
            }
        }
    }
    return false;
}
function expand(hex) {
    if (check(hex)) {
        if (hex.length == 4) {
            var a = hex[1], b = hex[2], c = hex[3];
            hex = "#" + a + a + b + b + c + c;
        }
        return hex;
    }
    return false;
}
function hexCode(hex) {
    var x = new RegExp("[" + hex + "]");
    return hexpattern.search(x);
}
function hexToRGB(hex) {
    hex = expand(hex);
    if (hex) {
        for (i in hex) {
            window["temp" + i] = String(hex[i]).toUpperCase();
        }
        r = hexCode(temp1) * 16 + hexCode(temp2);
        g = hexCode(temp3) * 16 + hexCode(temp4);
        b = hexCode(temp5) * 16 + hexCode(temp6);
        return palette.rgb(r, g, b);
    }
    return false;
}
palette.colorMix = function (rgb1, rgb2) {
    for (i in rgb1.value) {
        rgb1.value[i] = Math.floor((rgb1.value[i] + rgb2.value[i]) / 2);
    }
    return rgb1;
}
palette.mixAll = function (arr) {
    var r=0, g=0, b=0;
    for (i in arr) {
        if (check(arr[i])) {
            arr[i] = hexToRGB(arr[i]);
        }
    }
    for(i in arr){
        r += arr[i].value.r;
        g += arr[i].value.g;
        b += arr[i].value.b;
    }
    r = r / (arr.length);
    g = g / (arr.length);
    b = b / (arr.length);
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return toHex(palette.rgb(r, g, b));
}
palette.create = function (collectionname, collectionvalue) {
    this.colletions = this.colletions.concat({ name: collectionname, swatches: collectionvalue });
    return palette;
}
palette.save = function () {
    localStorage.__jsPaletteCollections__extensiblefunction__save__saved = JSON.stringify(this.colletions);
    return palette;
}
palette.restore = function () {
    this.colletions = JSON.parse(localStorage.__jsPaletteCollections__extensiblefunction__save__saved);
    return palette;
}
palette.setTo = function (element, color, isFore) {
    isFore = (isFore ? "color" : "background-color");
    var colorHex =color;
    if (!check(color)) {
        colorHex=toHex(color);
    }
    element.style[isFore] = colorHex;
    return palette;
}
palette.rgb.stringify = function (rgb) {
    rgb = rgb.value;
    return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
}
palette.splitColor = function (mixedColor, oneColorIn) {
    if (check(mixedColor)) {
        mixedColor = hexToRGB(mixedColor);
    }
    if (check(oneColorIn)) {
        oneColorIn = hexToRGB(oneColorIn);
    }
    for (i in mixedColor.value) {
        window["temp" + i] = mixedColor.value[i] * 2 - oneColorIn.value[i];
    }
    return palette.rgb(tempr, tempg, tempb);
}
