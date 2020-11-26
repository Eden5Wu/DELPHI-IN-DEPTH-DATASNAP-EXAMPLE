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
    
    $('#dg').datagrid({url: DsUrl + 'TServerMethods1/FetchEmployees'})
})

function addEmployee(){
    $('#dlg').dialog('open').dialog('setTitle','New User')
    $('#fm').form('clear')
    url = DsUrl + 'TServerMethods1/"AddEmployee"'
}

function editEmployee(){
  var row = $('#dg').datagrid('getSelected')
  if (row){
    $('#dlg').dialog('open').dialog('setTitle','Edit User')
    $('#fm').form('load',row)
    url = DsUrl + 'TServerMethods1/"EditEmployee"/?EmpNo=' + row.EmpNo
  }
}

/*
* 把序列化的表單陣列轉成 JSON 物件
*/
function objectifyForm(formArray) {
  var returnArray = {}
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value']
  }
  return returnArray
}

function saveEmployee(){
  var form = $("#fm")
  var formData = objectifyForm(form.serializeArray()) // serializeArray 表單化為序列化陣列
  $.ajax({
      url: url,
      type : "POST",
      data : JSON.stringify(formData),
      cache: false,
      processData: false,
      success : function(data)
      {
                    $('#dlg').dialog('close')		// 關閉對話框
                    $('#dg').datagrid('reload')	    // 重新讀取此頁資料
      }
  })
}

function dropEmployee(){
    var row = $('#dg').datagrid('getSelected')
    if (row){
        $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
            if (r){
              $.ajax({
                  url: DsUrl + 'TServerMethods1/"DropEmployee"/' + row.EmpNo,
                  type : "POST",
                  cache: false,
                  processData: false,
                  success : function(data)
                  {
                                $('#dg').datagrid('reload')	    // 重新讀取此頁資料
                  }
              })
            }
        })
    }
}

function searchEmployee(){
  $("#dg").datagrid("load",{
    search_field: $("#search_field").val(),
    search_value: $("#search_value").val()
  })
}
