var Ozone=Ozone||{};Ozone.util=Ozone.util||{};Ozone.util.Transport={version:Ozone.version.owfversion+Ozone.version.preference};Ozone.util.Transport.send=function(b){if(Ozone.log){Ozone.log.getDefaultLogger().debug("Transport Send",b.url,b.method,b.content)}var a=function(j){if(j==undefined||j==null){j=""}var k=j.indexOf("<body");if(k>-1){k=j.indexOf(">",k)+1;var e=j.indexOf("</body>",k);if(e>-1){j=j.substring(k,e)}else{j=j.substring(k)}}if(!Ozone.Msg){Ozone.util.ErrorDlg.show(j,200,50)}else{Ozone.Msg.alert("Server Error",j,null,this,{cls:"owfAlert"})}};if(!b.onFailure){b.onFailure=function(e){a(e)}}var h=b.method;var g=false;if(h=="PUT"||h=="DELETE"){h="POST"}if(h=="POST"){g=true}if(b.content==null){b.content={}}if(!(b.autoSendVersion===false)){b.content.version=Ozone.util.Transport.version}if(b.content.state){b.content.state=Ozone.util.toString(b.content.state)}var f=b.content;var d="json";if(b.handleAs!=null){d=b.handleAs}if(Ozone.util.isUrlLocal(b.url)&&!b.forceXdomain){return owfdojo.xhr(h.toUpperCase(),{url:b.url,content:b.content,preventCache:true,sync:b.async==false?true:false,timeout:b.timeout?b.timeout:0,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},load:function(k,j){if(Ozone.log){Ozone.log.getDefaultLogger().debug("Transport AJAX Return",k)}if(d=="json"){try{var l=Ozone.util.parseJson(k);b.onSuccess(l)}catch(m){b.onFailure(m.name+" : "+m.message)}}else{b.onSuccess(k)}},error:function(j,e){if(j.dojoType=="cancel"){return}if(j.status!=0){if(b.ignoredErrorCodes!=null&&b.ignoredErrorCodes.length>0&&owfdojo.indexOf(b.ignoredErrorCodes,j.status)>-1){b.onSuccess({})}else{b.onFailure(j.responseText,j.status)}}}},g)}else{try{var h=b.method;if(h=="PUT"||h=="DELETE"){h="POST"}var c=owfdojox.io.windowName.send(h.toUpperCase(),{url:b.url,content:f,preventCache:true,timeout:b.timeout?b.timeout:20000,load:function(e){try{var j=null;if(e&&typeof(e)==="string"){j=Ozone.util.parseJson(e)}else{j=e}if(j&&j.message&&j.message=="Timeout"){return b.onFailure("Error: Request timed out")}if(j.status===200){if(Ozone.log){Ozone.log.getDefaultLogger().debug("Transport AJAX Return",j.data)}if(d=="json"){b.onSuccess(j.data)}else{b.onSuccess(e)}}else{if(j.status===500||j.status===401){b.onFailure(j.data)}else{if(b.ignoredErrorCodes!=null&&b.ignoredErrorCodes.length>0&&owfdojo.indexOf(b.ignoredErrorCodes,j.status)>-1){b.onSuccess({})}else{b.onFailure(j.data,j.status)}}}return j}catch(k){b.onFailure(k.name+" : "+k.message)}},error:function(e){if(e.dojoType=="cancel"){return}if(e instanceof Error){b.onFailure(e.name+" : "+e.message)}else{b.onFailure(e)}}});return c}catch(i){b.onFailure(i.name+" : "+i.message)}}};Ozone.util.Transport.sendAndForget=function(a){var a=a;if(Ozone.log){Ozone.log.getDefaultLogger().debug("Transport SendAndForget",a.url,a.method,a.content)}var f=a.method;if(f=="PUT"||f=="DELETE"){f="POST"}var d=false;if(f=="POST"){d=true}if(a.content==null){a.content={}}if(a.autoSendVersion===false){a.content.version=Ozone.util.Transport.version}if(a.content.state){a.content.state=Ozone.util.toString(a.content.state)}var c=null;if(f=="GET"){c=owfdojo.objectToQuery(a.content)}else{c=a.content}if(Ozone.util.isUrlLocal(a.url)){owfdojo.xhr(f.toUpperCase(),{url:a.url,content:a.content,preventCache:true,sync:a.async==false?false:true},d)}else{try{var f=a.method;if(f=="PUT"||f=="DELETE"){f="POST"}var b=owfdojox.io.windowName.send(f.toUpperCase(),{url:a.url,content:c,preventCache:true})}catch(g){if(!Ozone.Msg){Ozone.util.ErrorDlg.show(Ozone.util.ErrorMessageString.sendAndForget,g.name+" : "+g.message,200,50)}else{Ozone.Msg.alert(Ozone.util.ErrorMessageString.sendAndForget,g.name+" : "+g.message)}}}};Ozone.util.Transport.sendToFirst=function(a){var b=a.urls.shift();if(b===undefined){if(a.onLastFailure!==undefined){a.onLastFailure()}return}var c=function(){Ozone.util.Transport.sendToFirst({urls:a.urls,method:a.method,onSuccess:a.onSuccess,onLastFailure:a.onLastFailure,content:a.content})};Ozone.util.Transport.send({url:b,method:a.method,onSuccess:a.onSuccess,onFailure:c,content:a.content})};