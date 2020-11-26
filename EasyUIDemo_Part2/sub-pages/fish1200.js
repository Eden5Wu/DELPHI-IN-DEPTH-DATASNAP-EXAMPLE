"use strict"

var windowParent = window.parent
$$SessionID$$ = windowParent.$$SessionID$$
connectionInfo = window.parent.connectionInfo
AdminInst = windowParent.AdminInst

var DsUrl = AdminInst.getURLPrefix()

var url = ''

$(document).ready(function(){
    //設定全域(Global) jQuery AJAX 預設值和事件處理
    $.ajaxSetup({
        beforeSend: windowParent.ajaxGlobalBeforeSend
    })

    $(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
        windowParent.ajaxGlobalError(jqxhr, settings, thrownError)
    });

    $('#dg').datagrid({
        url: DsUrl + 'TServerMethods1/FetchFishs',
        view: detailview,
        detailFormatter:function(index,row){
            return '<div id="ddv-' + index + '" style="padding:5px 0"></div>'
        },
        onExpandRow: function(index,row){
            $('#ddv-'+index).panel({
                border:false,
                cache:false,
                href: DsUrl + 'TServerMethods1/FetchFishPhoto/'+row.Species_No,
                extractor: function(data){
                    var rowObj = JSON.parse(data).result[0]
                    return '<table class="dv-table" border="0" style="width:100%;">' +
                        '  <tr>' +
                        '    <td rowspan="3" style="width:140px">' +
                        // 使用檔案路徑
                        //'      <img src="../images/' + rowObj.Species_No + '.png" style="width:130px;margin-right:10px" />' +
                        // 使用資料庫圖檔
                        '      <img src="'+ decodeArrayBuffer(rowObj.Graphic) +'" style="width:130px;margin-right:10px" />' +
                        '    </td>' +
                        '    <td class="dv-label">Category: </td>' +
                        '    <td>'+ rowObj.Category +'</td>' +
                        '    <td class="dv-label">Common Name: </td>' +
                        '    <td>'+ rowObj.Common_Name +'</td>' +
                        '  </tr>' +
                        '  <tr>' +
                        '    <td class="dv-label">Length cm: </td>' +
                        '    <td>'+ rowObj.Length_cm +'</td>' +
                        '    <td class="dv-label">Length in: </td>' +
                        '    <td>'+ rowObj.Length_in +'</td>' +
                        '  </tr>' +
                        '  <tr>' +
                        '    <td class="dv-label">Species_Name: </td>' +
                        '    <td colspan="2">'+ rowObj.Species_Name +'</td>' +
                        '  </tr></table>'
                },
                onLoad:function(){
                    $('#dg').datagrid('fixDetailRowHeight',index);
                }
            });
            $('#dg').datagrid('fixDetailRowHeight',index);
        }
    });
})

function onExportExcel(){
  $('#dg').datagrid('toExcel','dg.xls')    // export to excel
}

function onPrint(){
  $('#dg').datagrid('print','DataGrid')    // print
}

function decodeArrayBuffer(buffer) {
    var mime;
    var a = new Uint8Array(buffer);
    var nb = a.length;
    if (nb < 4)
        return null;
    var b0 = a[0];
    var b1 = a[1];
    var b2 = a[2];
    var b3 = a[3];
    if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
        mime = 'image/png';
    else if (b0 == 0xff && b1 == 0xd8)
        mime = 'image/jpeg';
    else
        return null;
    var binary = "";
    for (var i = 0; i < nb; i++)
        binary += String.fromCharCode(a[i]);
    var base64 = window.btoa(binary);

    return 'data:' + mime + ';base64,' + base64;
}
