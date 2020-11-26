"use strict"

function onload(){
  $(window).resize(function(){
    $("#logindiv").window("center");
  });
  // 註冊 Tree.removeAll 函式
  $.extend($.fn.tree.methods, {
    removeAll:function(jq){
      return jq.each(function(){
        var roots = jq.tree("getRoots");
        for(var i=roots.length-1; i>=0; i--){
          jq.tree("remove", roots[i].target);
        }
      })
    }
  })

  $("#treeMenu").tree("removeAll");  // 把展示資料清除

  if (loginRequired)
  {
    showLogin(true);
  }
  else
  {
    showLogin(false);
  }
}

function onLogin(){
  if (loginRequired)
  {
    if (AdminInst == null)
    {
        if (!setCredentials(document.getElementById('userField').value, document.getElementById('passwrdField').value))
        {
          loginCorrect(false);
          return;
        }
        else
        {
          loginCorrect(true);
          showLogin(false);
        }
    }
    AdminInst.closeSession();
  }
  else
    showLogin(false);
}

function loginCorrect(isCorrect)
{
  var errorDiv = document.getElementById('loginError');
  if ( errorDiv != null )
  {
    errorDiv.innerHTML= isCorrect ? "" : "login incorrect";
  }
}

function showLogin(show)
{
  var loginDiv = $("#logindiv");
  var contentDiv = document.getElementById('contentdiv');
  var logoutDiv = document.getElementById('logoutdiv');

  if (show)
  {
    // show div
    loginDiv.window('open');
    contentDiv.style.display="none";
    logoutDiv.style.display="none";
    $("#mainBody").layout("collapse","west");
    $("#treeMenu").tree("removeAll");
    var count = $('#contentTabs').tabs('tabs').length;
    for(var iter=count-1; iter>0; --iter){
      $('#contentTabs').tabs('close',iter);
    }
  }
  else
  {
      // show div
      loginDiv.window('close');
      contentDiv.style.display="block";
      logoutDiv.style.display="block";
      $("#mainBody").layout("expand","west");
      fetchTreeMenu()
  }
}

function onLogout(){
  AdminInst = null;
  connectionInfo.authentication = null;
  serverMethods().executor.closeSession();
  showLogin(true);
}

function addTab(title, url){
  var tabsControl=$("#contentTabs");
  if (tabsControl.tabs("exists",title)) {
    tabsControl.tabs("select",title);
  }
  else {
    var urlHref = "<iframe width='100%' height='100%' frameborder='0' scrolling='auto' src='" + url + "'></iframe>";
    tabsControl.tabs("add",{
      title:title,
      content:urlHref,
      closable:true
    });
  }
}

function fetchTreeMenu(){
  var menuData = [{
        "id":1,
        "text":"常用的EasyUI元件介紹",
        "iconCls":"icon-help",
        "children":[{
            "text":"LinkButton連結按鈕",
            "attributes":{"url":"/subforms/linkbutton.html"}
          },{
            "text":"Form表單容器",
            "attributes":{"url":"/subforms/form.html"}
          },{
            "text":"Accordion手風琴容器",
            "attributes":{"url":"/subforms/accordion.html"}
          },{
            "text":"Tree樹容器",
            "attributes":{"url":"/subforms/tree.html"}
          },{
            "text":"Message氣泡訊息",
            "attributes":{"url":"/subforms/message.html"}
          },{
            "text":"DataGrid資料表格",
            "attributes":{"url":"/subforms/datagrid.html"}
          }
        ]
    }]
  $("#treeMenu").tree({
    data: menuData,
    onClick: function(node){
      if (node.attributes){
        addTab(node.text, node.attributes.url);
      }
    }
  });

  var menuJSDSData = [{
        "id":1,
        "text":"AJAX DataSnap",
        "iconCls":"icon-help",
        "children":[{
            "text":"AJAX for Vanilla JS",
            "attributes":{"url":"/subforms/js-vanillajs.html"}
          },{
            "text":"AJAX for jQuery",
            "attributes":{"url":"/subforms/js-jquery.html"}
          },{
            "text":"AJAX for JavaScript API",
            "attributes":{"url":"/subforms/js-jsapi.html"}
          }
        ]
    }]
  $("#treeJSDSMenu").tree({
    data: menuJSDSData,
    onClick: function(node){
      if (node.attributes){
        addTab(node.text, node.attributes.url);
      }
    }
  });
}

