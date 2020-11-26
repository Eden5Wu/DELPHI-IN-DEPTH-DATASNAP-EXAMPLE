/*
Copyright (c) 2006-2009 Brenton Fletcher (http://i.bloople.net i@bloople.net)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
if (!Array.prototype.toJSONString)
{
Array.prototype.toJSONString=function(){var a=['['],b,i,l=this.length,v;function p(s){if(b){a.push(',');}
a.push(s);b=true;}
for(i=0;i<l;i+=1){v=this[i];switch(typeof v){case'undefined':case'function':case'unknown':break;case'object':if(v){if(typeof v.toJSONString==='function'){p(v.toJSONString());}}else{p("null");}
break;default:p(v.toJSONString());}}
a.push(']');return a.join('');};Boolean.prototype.toJSONString=function(){return String(this);};Date.prototype.toJSONString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getFullYear()+'-'+
f(this.getMonth()+1)+'-'+
f(this.getDate())+'T'+
f(this.getHours())+':'+
f(this.getMinutes())+':'+
f(this.getSeconds())+'"';};Number.prototype.toJSONString=function(){return isFinite(this)?String(this):"null";};Object.prototype.toJSONString=function(){var a=['{'],b,i,v;function p(s){if(b){a.push(',');}
a.push(i.toJSONString(),':',s);b=true;}
for(i in this){if(this.hasOwnProperty(i)){v=this[i];switch(typeof v){case'undefined':case'function':case'unknown':break;case'object':if(v){if(typeof v.toJSONString==='function'){p(v.toJSONString());}}else{p("null");}
break;default:p(v.toJSONString());}}}
a.push('}');return a.join('');};(function(s){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};s.parseJSON=function(){try{if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(this)){return eval('('+this+')');}}catch(e){}
throw new SyntaxError("parseJSON");};s.toJSONString=function(){if(/["\\\x00-\x1f]/.test(this)){return'"'+this.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+this+'"';};})(String.prototype);
}
