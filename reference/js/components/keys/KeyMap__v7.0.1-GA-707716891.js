Ext.define("Ozone.components.keys.KeyMap",{extend:"Ext.util.KeyMap",alternateClassName:"Ozone.KeyMap",singleton:true,previousKey:null,constructor:function(){this.callParent([document,[],Ozone.components.keys.EVENT_NAME])},addBinding:function(b){function a(c){Ext.applyIf(c,{shift:true,alt:true,activeInWidget:true,activeOutsideWidget:true})}Ext.isArray(b)?Ext.each(b,a):a(b);this.callParent(arguments)},processBinding:function(f,a){if(!f.activeOutsideWidget){return}if(this.checkModifiers(f,a)){var g=a.getKey(),j=f.fn||f.handler,k=f.scope||this,h=f.keyCode,b=f.defaultEventAction,c,e,d=new Ext.EventObjectImpl(a);for(c=0,e=h.length;c<e;++c){if((g===h[c]&&!this.previousKey)||(g===h[c]&&this.previousKey&&(this.compareHotKeys(f,this.previousKey)||!this.previousKey.exclusive))){this.set(f);if(j.call(k,g,a)!==true&&b){d[b]()}break}}}},reset:function(){this.previousKey=null},set:function(a){this.previousKey=a},handleKey:function(a,b){Ext.iterate(this.bindings,function(e,c,d){if(e.key==a.keyCode&&e.alt===a.altKey&&e.shift===a.shiftKey&&e.ctrl===a.ctrlKey&&(e.activeInWidget==a.fromWidget||e.activeOutsideWidget==!a.fromWidget)){var f=b?Ozone.util.parseJson(b).id:null;e.fn.call(e.scope,a.keyCode,a,f);return false}})},bindWidgetEvents:function(a){a.getEl().on(Ozone.components.keys.EVENT_NAME,function(b){b.fromWidget=true;this.handleKey(b,a.getEl().id);delete b.fromWidget},this)},compareHotKeys:function(c,b){if(c===b){return true}var a=true;Ext.Object.each(b,function(d,e){if(b[d]!==c[d]){a=false;return false}});return a}});