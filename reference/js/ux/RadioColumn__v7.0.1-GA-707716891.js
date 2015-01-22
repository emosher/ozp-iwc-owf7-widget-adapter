Ext.define("Ext.ux.RadioColumn",{extend:"Ext.grid.column.Column",alias:"widget.radiocolumn",_radioCls:Ext.baseCSSPrefix+"grid-column-radio",_radioClsOn:Ext.baseCSSPrefix+"grid-column-radio-on",_radioClsOff:Ext.baseCSSPrefix+"grid-column-radio-off",_radioClsOver:Ext.baseCSSPrefix+"grid-column-over",processEvent:function(g,j,l,a,h,f){if(g=="mousedown"||(g=="keydown"&&(f.getKey()==f.ENTER||f.getKey()==f.SPACE))){var c=j.panel.store.getAt(a);var k=this.cellDisabled(j,c);if(!k){c.set(this.dataIndex,true);this.fireEvent("change",this,c);for(var b=0;b<j.panel.store.data.items.length;b++){c=j.panel.store.getAt(b);if(b!==a){c.set(this.dataIndex,false)}}}return false}else{if(g=="mouseover"){var d=Ext.fly(l);d.addCls(this._radioClsOver);return this.callParent(arguments)}else{if(g=="mouseout"){var d=Ext.fly(l);d.removeCls(this._radioClsOver);return this.callParent(arguments)}else{return this.callParent(arguments)}}}},cellDisabled:function(b,a){return false},renderer:function(g,c,b,h,e,d){var f=this.columns[e];var a=[f._radioCls];if(!g||"false"==g){a.push(f._radioClsOff)}else{a.push(f._radioClsOn)}return'<div class="'+a.join(" ")+'">&#160;</div>'}});