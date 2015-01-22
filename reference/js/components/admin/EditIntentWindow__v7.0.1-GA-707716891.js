Ext.define("Ozone.components.admin.EditIntentWindow",{extend:"Ext.window.Window",alias:["widget.editintentwindow","widget.Ozone.components.admin.EditIntentWindow"],mixins:{widget:"Ozone.components.focusable.CircularFocus"},cls:"editintentwindow",callback:Ext.emptyFn,scope:undefined,action:undefined,dataType:undefined,send:undefined,receive:undefined,resizable:false,modal:true,initComponent:function(){var c=this;var b=Ozone.config.freeTextEntryWarningMessage;if(!this.scope){this.scope=this}Ext.apply(this,{layout:"fit",items:[{xtype:"panel",cls:"usereditpanel",layout:"fit",items:[{xtype:"panel",cls:"adminEditor",bodyCls:"adminEditor-body",layout:"fit",border:false,items:[{xtype:"form",itemId:"form",layout:"anchor",bodyCls:"properties-body",border:false,bodyBorder:true,preventHeader:true,padding:5,autoScroll:true,defaults:{anchor:"100%",msgTarget:"side",labelSeparator:"",margin:"5 5 0 5",listeners:{blur:{fn:function(e){e.changed=true;e.doComponentLayout()},scope:c},change:{fn:function(h,g,e,f){if(!h.changed&&h.isDirty()){h.changed=true}},scope:c},afterrender:{fn:function(g,e){var f=g.getComponentLayout();if(f.errorStrategies!=null){f.previousBeforeLayout=f.beforeLayout;f.beforeLayout=function(i,h){return this.previousBeforeLayout()||!this.owner.preventMark};f.errorStrategies.side={prepare:function(h){var i=h.errorEl;if(h.hasActiveError()&&h.changed){i.removeCls("owf-form-valid-field");i.removeCls("x-form-warning-icon");i.removeCls("owf-form-unchanged-field");i.addCls(Ext.baseCSSPrefix+"form-invalid-icon");f.tip=f.tip?f.tip:Ext.create("Ext.tip.QuickTip",{baseCls:Ext.baseCSSPrefix+"form-invalid-tip",renderTo:Ext.getBody()});f.tip.tagConfig=Ext.apply({},{attribute:"errorqtip"},f.tip.tagConfig);i.dom.setAttribute("data-errorqtip",h.getActiveError()||"");i.setDisplayed(h.hasActiveError())}else{if(h.hasActiveWarning&&h.hasActiveWarning()&&h.changed){i.removeCls(Ext.baseCSSPrefix+"form-invalid-icon");i.removeCls("owf-form-valid-field");i.removeCls("owf-form-unchanged-field");i.addCls("x-form-warning-icon");f.tip=f.tip?f.tip:Ext.create("Ext.tip.QuickTip",{iconCls:"x-form-warning-icon",renderTo:Ext.getBody()});f.tip.tagConfig=Ext.apply({},{attribute:"errorqtip"},f.tip.tagConfig);i.dom.setAttribute("data-errorqtip",h.getActiveWarning()||"");i.setDisplayed(h.hasActiveWarning())}else{if(h.changed){if(f.tip){f.tip.unregister(i)}i.removeCls(Ext.baseCSSPrefix+"form-invalid-icon");i.removeCls("x-form-warning-icon");i.removeCls("owf-form-unchanged-field");i.addCls("owf-form-valid-field");i.dom.setAttribute("data-errorqtip","");i.setDisplayed(true)}else{i.removeCls(Ext.baseCSSPrefix+"form-invalid-icon");i.removeCls("x-form-warning-icon");i.removeCls("owf-form-valid-field");i.dom.setAttribute("data-errorqtip","");i.setDisplayed(false)}}}},adjustHorizInsets:function(h,i){if(h.autoFitErrors){i.insets.right+=h.errorEl.getWidth()}},adjustVertInsets:Ext.emptyFn,layoutHoriz:function(h,i){h.errorEl.setStyle("left",i.width-i.insets.right+"px")},layoutVert:function(h,i){h.errorEl.setStyle("top",i.insets.top+"px")},onFocus:Ext.emptyFn}}},scope:c}}},items:[{xtype:"component",hidden:b==null||b=="",renderTpl:'<div id="{id}" class="{cls}"><div class="headerSpacer"></div>{message}</div>',renderData:{cls:(b&&b.length>0)?"dialogHeader":"",message:b?b:""}},{xtype:"textfield",name:"action",itemId:"nameField",value:c.action,fieldLabel:Ozone.util.createRequiredLabel("Action"),labelWidth:130,allowBlank:false,maxLength:255},{xtype:"textfield",name:"dataType",itemId:"dataTypeField",value:c.dataType,fieldLabel:Ozone.util.createRequiredLabel("Data Type"),labelWidth:130,allowBlank:false,maxLength:255},{xtype:"checkbox",name:"send",itemId:"sendChk",fieldLabel:"Send",labelWidth:130,submitValue:true,preventMark:true,checked:(c.send!=undefined)?c.send:true},{xtype:"checkbox",name:"receive",itemId:"receiveChk",fieldLabel:"Receive",labelWidth:130,submitValue:true,preventMark:true,checked:c.receive}]}],buttons:[{text:"OK",itemId:"ok",handler:function(k,n){var g=this.query("textfield");for(var j=0;j<g.length;j++){var m=g[j];if(!Ext.isFunction(m)){m.isValid();m.changed=true;m.doComponentLayout();if(m.getXType()=="textfield"){m.setValue(Ext.String.trim(m.getValue()))}}}var l=k.ownerCt.ownerCt;this.submitValues=l.getComponent("form").getValues();var f=l.getComponent("form").getForm().getFields().items;var h=false;for(m in f){if(f[m].name){this.submitValues["original"+f[m].name.charAt(0).toUpperCase()+f[m].name.slice(1)]=f[m].originalValue}if(f[m].xtype=="textfield"&&f[m].getValue()==""){h=true}}if(!h){this.callback.call(this.scope,this.submitValues);this.close()}},scope:this},{text:"Cancel",itemId:"cancel",handler:function(f,g){this.close()},scope:this}]}]}]});this.callParent(arguments);var d=this.down("#sendChk"),a=this.down("#receiveChk");d.on("change",function(){a.suspendEvents(false);a.setValue(true);a.resumeEvents()});a.on("change",function(){d.suspendEvents(false);d.setValue(true);d.resumeEvents()});this.on("afterrender",function(){this.setupFocus(this.down("#nameField").getFocusEl(),this.down("#cancel").getFocusEl())})}});