"use strict"

$(document).ready(function(){
  //設定全域(Global) jQuery AJAX 預設值和事件處理
  $.ajaxSetup({
    beforeSend: ajaxGlobalBeforeSend
  })

  $(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
    ajaxGlobalError(jqxhr, settings, thrownError)
  });

  showLogin(loginRequired)
})

function addTab(title, url, iconCls){
  var tabsControl=$("#tabs")
  if (tabsControl.tabs("exists",title)) {
    tabsControl.tabs("select",title)
  }
  else {
    var urlHref = "<iframe frameborder='0' scrolling='auto' style='width:100%;height:100%' src='" + url + "'></iframe>";
    tabsControl.tabs("add",{
      iconCls: iconCls,
      title:title,
      content:urlHref,
      closable:true
    })
  }
}

function onLogin()
{
  if (loginRequired)
  {
    if (AdminInst == null)
    {
        if (!setCredentials(document.getElementsByName('uname')[0].value, document.getElementsByName('psw')[0].value))
        {
          loginCorrect(false)
          return
        }
        else
        {
          document.getElementById("userName").innerText = serverMethods().FetchCurrentUser().result
          loginCorrect(true)
          showLogin(false)
        }
    }
  }
  else
    showLogin(false)
}

function loginCorrect(isCorrect)
{
  var errorDiv = document.getElementById('loginError')
  if ( errorDiv != null )
  {
    errorDiv.innerHTML= isCorrect ? "" : "login incorrect"
  }
}

function showLogin(show)
{
  if (show)
  {
    $("#login-panel").dialog("open")
  }
  else
  {
    $("#login-panel").dialog("close")
  }
}

function ajaxGlobalBeforeSend(jqXHR) {
    var sessId = getSessionID();
    if(sessId != null)
    {
      jqXHR.setRequestHeader("Pragma", "dssession=" + sessId);
    }
    if (!(connectionInfo == null || connectionInfo.authentication == null))
    {
      jqXHR.setRequestHeader("Authorization", "Basic " + connectionInfo.authentication);
    }
}

/*
 * 請求出錯時的處理函式
 * @param jqXHR 經過 jQuery 再封裝的 XMLHttpRequest 物件
 * @param settings Object 型別，包含 AJAX 請求中所帶的選項
 * @param thrownError String 型別，包含 JavaScript 產生的例外內容
 */
function ajaxGlobalError(jqXHR, settings, thrownError){
    // 提示訊息：傳送 AJAX 請求到 "/index.html" 時出錯[404]error：Not Found
    // this = settings object
    var simpleErrorMessage = "[" + jqXHR.status + "] " + jqXHR.statusText
    console.log("傳送 AJAX 請求到'" + settings.url + "' 時出錯" + simpleErrorMessage)

    var fullErrorMessage = ""
    var JSONResultWrapper = parseHTTPResponse(jqXHR)
    if (JSONResultWrapper != null)
    {
        // Session 超時視為已登出
        if (JSONResultWrapper.SessionExpired != null)
        {
            closeAllTabs()
            AdminInst = null
            connectionInfo.authentication = null
            $("#login-panel").dialog("open")
            fullErrorMessage = "您已被登出：" + JSONResultWrapper.SessionExpired
        }
        else fullErrorMessage = JSONResultWrapper[Object.keys(JSONResultWrapper)[0]]
    }

    $.messager.show({
        title: jqXHR.statusText,
        msg: (fullErrorMessage!=="") ?  fullErrorMessage : thrownError
    })
}

function closeAllTabs() {
    $(".tabs li").each(function(index, obj) {
        // 取得所有可關閉的 tab
        var tab = $(".tabs-closable", this).text();
        $(".easyui-tabs").tabs('close', tab);
    });
}
