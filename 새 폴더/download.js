function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

var table = document.querySelector("tbody");
var str = "";

function listDownload()
{
    for(var i = 0; i<table.childElementCount; i++)
    {
        var row = table.children[i];
        var string = "";
        for(var j=0; j<row.childElementCount; j++)
        {
            if(row.children[j].textContent){
                string = string.concat(row.children[j].textContent + " ");
            }
        }
        str = str.concat(string+ "\n");
    }
    download("test", str);
}
listDownload();

// python처럼 string에 인자값을 넣어줄 수 있는 javascript형 함수
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

////////////////////////////
//// csv로 저장하는 방법/////
////////////////////////////

function exportTableToCsv(tableId, filename) {
    if (filename == null || typeof filename == undefined)
        filename = tableId;
    filename += ".csv";

    var BOM = "\uFEFF";

// 인하대의 경우 tableId가 없으므로 
// getElementsByTagName을 사용하고 tagName인 tbody를 하드코딩해주었다.
    // var table = document.getElementById(tableId);
    var table = document.getElementsByTagName('tbody')[0];
    var csvString = BOM;
    for (var rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
        var rowData = table.rows[rowCnt].cells;
        for (var colCnt = 0; colCnt < rowData.length; colCnt++) {
            var columnData = rowData[colCnt].innerHTML;
            if (columnData == null || columnData.length == 0) {
                columnData = "".replace(/"/g, '""');
            }
            else {
                columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
            }
            csvString = csvString + '"' + columnData + '",';
        }
        csvString = csvString.substring(0, csvString.length - 1);
        csvString = csvString + "\r\n";
    }
    csvString = csvString.substring(0, csvString.length - 1);

    // IE 10, 11, Edge Run
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {

        var blob = new Blob([decodeURIComponent(csvString)], {
            type: 'text/csv;charset=utf8'
        });

        window.navigator.msSaveOrOpenBlob(blob, filename);

    } else if (window.Blob && window.URL) {
        // HTML5 Blob
        var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
        var csvUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', csvUrl);
        a.setAttribute('download', filename);
        document.body.appendChild(a);

        a.click()
        a.remove();
    } else {
        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
        var blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
        var csvUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.setAttribute('style', 'display:none');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', csvData);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click()
        a.remove();
    }
}

var majorList = document.querySelector("select");
for(var i=0; i<majorList.childElementCount; i++)
{
    var major = majorList.children[i];
    var isSelected = major.getAttribute('selected');
    if(!isSelected) { continue; }

    var title = major.innerText;

    var exportButton = document.createElement('button');
    exportButton.setAttribute('type', 'button');
    exportButton.setAttribute('onclick', "exportTableToCsv('example-table', '{0}')".format(title));
    exportButton.innerText = 'Export';
    document.body.appendChild(exportButton);

    exportButton.click();

    document.body.removeChild(exportButton);
}