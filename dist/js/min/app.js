function setValidityMsg(e,t,a){e.innerHTML=a;var i=e.parentNode;0===t?i.classList=["form-group has-warning"]:1===t&&(i.classList=["form-group has-success"])}var userName="";firebase.auth().onAuthStateChanged(function(e){e?userName=e.displayName:self.location.href="index.html"});var database=firebase.database(),ref=database.ref("events/"+userName),tableRef=document.querySelector("#tableEvents"),inputLocation=document.querySelector("#inputLocation"),eventName=document.querySelector("#inputEventName"),startTime=document.querySelector("#inputStartTime"),endTime=document.querySelector("#inputEndTime"),host=document.querySelector("#inputHost"),guestList=document.querySelector("#inputGuestList"),comment=document.querySelector("#inputComment"),type=document.querySelector("#inputType"),labelEventName=document.querySelector("#labelEventName"),labelStartTime=document.querySelector("#labelStartTime"),labelEndTime=document.querySelector("#labelEndTime"),labelHost=document.querySelector("#labelHost"),labelLocation=document.querySelector("#labelLocation"),labelComment=document.querySelector("#labelComment"),labelType=document.querySelector("#labelType"),validation=!1,startTimestamp,endTimestamp,currentTimestamp=new Date;!function(){eventName.addEventListener("input",function(){eventName.value.length>1?(setValidityMsg(labelEventName,1,"Event Name"),validation=!0):(setValidityMsg(labelEventName,0,"Event Name (required)"),validation=!1)}),type.addEventListener("input",function(){type.value.length>1?(setValidityMsg(labelType,1,"Event Type"),validation=!0):(setValidityMsg(labelType,0,"Event Type (required)"),validation=!1)}),inputLocation.addEventListener("input",function(){inputLocation.value.length>1?(setValidityMsg(labelLocation,1,"Location"),validation=!0):(setValidityMsg(labelLocation,0,"Location (required)"),validation=!1)}),comment.addEventListener("input",function(){comment.value.length>1?(setValidityMsg(labelComment,1,"Comment"),validation=!0):(setValidityMsg(labelComment,0,"Comment (required)"),validation=!1)}),host.addEventListener("input",function(){host.value.length>1?(setValidityMsg(labelHost,1,"Host"),validation=!0):(setValidityMsg(labelHost,0,"Host (required)"),validation=!1)}),startTime.addEventListener("keyup",function(){startTimestamp=new Date(startTime.value),startTimestamp>currentTimestamp?(setValidityMsg(labelStartTime,1,"Start Time"),validation=!0):(setValidityMsg(labelStartTime,0,"Start Time (it should start in the future)"),validation=!1)}),endTime.addEventListener("keyup",function(){endTimestamp=new Date(endTime.value),endTimestamp>startTimestamp?(setValidityMsg(labelEndTime,1,"End Time"),validation=!0):(setValidityMsg(labelEndTime,0,"End Time (End date-time should take place after Start date-time)"),validation=!1)})}(),ref.orderByKey().once("value").then(function(e){var t=e.val();for(var a in t[userName]){var i=t[userName][a],n=tableRef.insertRow(0);n.innerHTML="<th>"+i.name+"</th><th>"+i.type+"</th><th>"+i.host+"</th><th>"+i.startTime+"</th><th>"+i.location+"</th>"}}),ref.on("child_changed",function(e,t){var a=Object.keys(e.val()),i=e.val()[a[a.length-1]],n=tableRef.insertRow(0);n.innerHTML="<th>"+i.name+"</th><th>"+i.type+"</th><th>"+i.host+"</th><th>"+i.startTime+"</th><th>"+i.location+"</th>"}),document.querySelector("#submit").onclick=function(){if(eventName.value.length>1?(setValidityMsg(labelEventName,1,"Event Name"),validation=!0):(setValidityMsg(labelEventName,0,"Event Name (required)"),validation=!1),inputLocation.value.length>1?(setValidityMsg(labelLocation,1,"Location"),validation=!0):(setValidityMsg(labelLocation,0,"Location (required)"),validation=!1),comment.value.length>1?(setValidityMsg(labelComment,1,"Comment"),validation=!0):(setValidityMsg(labelComment,0,"Comment (required)"),validation=!1),host.value.length>1?(setValidityMsg(labelHost,1,"Host"),validation=!0):(setValidityMsg(labelHost,0,"Host (required)"),validation=!1),startTimestamp=new Date(startTime.value),startTimestamp>currentTimestamp?(setValidityMsg(labelStartTime,1,"Start Time"),validation=!0):(setValidityMsg(labelStartTime,0,"Start Time (it should start in the future)"),validation=!1),endTimestamp=new Date(endTime.value),endTimestamp>startTimestamp?(setValidityMsg(labelEndTime,1,"End Time"),validation=!0):(setValidityMsg(labelEndTime,0,"End Time (End date-time should take place after Start date-time)"),validation=!1),validation!==!1){var e={name:eventName.value,type:type.value,host:host.value,startTime:startTime.value,endTime:endTime.value,guestList:guestList.value,location:inputLocation.value,comment:comment.value},t=database.ref("events/"+userName).push();t.set(e);var a=document.querySelector('section[data-route="message"]');a.innerHTML='<div class="alert alert-success" role="alert">Created!</div>'}};