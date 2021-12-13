function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function twoDigit(num)
{
    if(num < 10) 
        return "00"+num;
    else if(num<100)
        return "0"+num;
    else 
        return num;
}

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

var list = document.querySelectorAll("div[id=contents]")[2];
var title = document.querySelectorAll("#container > h1 > yt-formatted-string")[0].innerText.slice(1,3);
var str = "";
    

function listDownload()
{
    for(let i = 0; i< list.childElementCount; i++)
    {
        // var chapterName = "{0}_{1}_chapter".format(title, twoDigit(i+1));
        var chapterBody = list.children[i].children[0].children[2].children[0].innerText;

        // var hrefName = "{0}_{1}_href".format(title, twoDigit(i+1));
        var hrefBody = list.children[i].children[0].href;

        var string = '{ name: "{0}", href: "{1}"},\n'.format(chapterBody, hrefBody);
        str = str.concat(string);
    }
    download(title, str);
}
listDownload();


///////////////////////////////////////////////////////////////////////////////////////////////////////////


var time = document.querySelector("div[id='divCurrentTime']");
var intTime = time.innerText.slice(time.innerText.search('/')+2,time.innerText.length) * 1;

function waiting()
{
    var b = document.querySelector("img[id='btn_nextPage']");
    b.click();
}

setTimeout(waiting, 1000* intTime, 1);






