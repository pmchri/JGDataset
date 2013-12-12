(function(d){JGDataset.prototype.getMappedRowTemplate=(function(e){return this._mappingTemplateList[e];});window.JGDataset.prototype.validator=(function(){return d(this).JGDSValidator.apply(d(this),arguments);});function c(g,f){for(var e in f){if(e.toUpperCase()==g.toUpperCase()){return f[e];}}return undefined;}d.widget("jg.JGDSValidator",{_validators:{},validators:function(e){if(Object.isNull(e)){return this._validators;}this._validators=d.extend(this._validators,e);},validatorEngine:function(e){if(Object.isNull(e)){return this.validateEngine;}this.validateEngine=d.extend(this.validateEngine,e);},commonFailedMessages:function(e){if(Object.isNull(e)){return this.commonFailedMessages;}this.commonFailedMessages=d.extend(this.commonFailedMessages,e);},failedMessages:{},failedMessages:function(e){if(Object.isNull(e)){return this.failedMessages;}this.failedMessages=e;},bindedDataset:function(){return this.element.get(0);},_create:function(){var e=this;var f=this.element.get(0);this.element.on(JGDataset._customTriggerKey_whenColumValueChanged,function(g,i,h){e.singleValidate(i,h,function(){});});this.element.on(JGDataset._customTriggerKey_whenColumnAdded,function(g,h){e.refresh();});this.element.on(JGDataset._customTriggerKey_whenColumnRemoved,function(g,h){e.refresh();});f.fullValidate=function(g){e.fullValidate(g);};this.refresh();},refresh:function(){this._isValid=false;var e=this.element.get(0);var f=d("<div/>").html(e._mappingRowElement.clone());var g=e.getColumnCount();for(var h=0;h<g;++h){var k=e.getColumn(h).name;var r=f.find("["+JGDataset.STR_MAP_COLUMNNAME+"]").filter(function(){return d(this).attr(JGDataset.STR_MAP_COLUMNNAME).toUpperCase()==k;});r=d("<div />").html(r);this._validators[k]=new Array();var j=r.find("[required]");var m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"required"});}j=r.find("[maxLength]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));this._validators[k].push({name:"maxLength",length:parseInt(p.attr("maxLength"))});}j=r.find("[minLength]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));this._validators[k].push({name:"minLength",length:parseInt(p.attr("minLength"))});}j=r.find("[length]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));this._validators[k].push({name:"length",length:parseInt(p.attr("length"))});}j=r.find("[equals]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));this._validators[k].push({name:"equals",value:p.attr("equals")});}j=r.find("[range]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));var q=p.attr("range").split(",");this._validators[k].push({name:"range",from:parseInt(q[0]),to:parseInt(q[1])});}j=r.find("[rangeLength]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));var q=p.attr("rangeLength").split(",");this._validators[k].push({name:"rangeLength",from:parseInt(q[0]),to:parseInt(q[1])});}j=r.find("[pattern]");m=j.length;for(var l=0;l<m;++l){var p=d(j.get(l));this._validators[k].push({name:"pattern",pattern:p.attr("pattern")});}j=r.find("[patternWord]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternWord"});}j=r.find("[patternAlphabet]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternWord"});}j=r.find("[patternAlphanum]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternAlphanum"});}j=r.find("[patternEmail]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternEmail"});}j=r.find("[patternNumber]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternNumber"});}j=r.find("[patternPhone]");m=j.length;for(var l=0;l<m;++l){this._validators[k].push({name:"patternPhone"});}var i=this;j=r.find("*").each(function(){var u=d(this).get(0).attributes;var s=u.length;for(var v=0;v<s;++v){var t=u[v];if(new RegExp("(custom-validator-)+","gi").test(t.name)){i._validators[k].push({name:t.name,value:t.value});}}});var o=e.getRowCount();for(var n=0;n<o;++n){this._updateErrorLabel(k,n,"");}}},_recursiveSingleValidate:function(k,m,f,i){var h=this;var g=this.element.get(0);var j=g.getColumnValue(k,m);var p=this._validators[k];i=Object.NVL(i,function(){});var e=this._validationResult[k];if(Object.isNull(e)){this._validationResult[k]=e={rowIndex:m,failedData:{}};}if(Object.isNull(p)){i.apply(g,e);return;}f=Object.NVL(f,0);var o=p.length;if(f==o){i.apply(g,e);return;}var l=p[f];var q=l.name.toLowerCase();var n=c(q,this.validateEngine);if(Object.isNull(n)){this._recursiveSingleValidate(k,m,f+1,i);return;}n.apply(g,[l,k,m,j,function(x){if(!x){var s={name:l.name};var u=c(k,h.failedMessages);var v=null;if(!Object.isNull(u)){var t=c(l.name,u);if(!Object.isNull(t)){v=t;}}if(Object.isNull(v)){v=Object.NVL(c(l.name,h.commonFailedMessages),"");}var r=(function(y){return new RegExp("\\{("+y+")\\}","gi");});v=v.replace(r("columnName"),k);v=v.replace(r("rowIndex"),m);v=v.replace(r("columnValue"),j);for(var w in l){v=v.replace(r(w),l[w]);}h._updateErrorLabel(k,m,v,true);e.failedData[l.name]=s;if(h.options.stepValidation){f=o-1;}}else{delete e.failedData[l.name];}h._updateValidatation();h._recursiveSingleValidate(k,m,f+1,i);}]);},singleValidate:function(g,e,f){this._updateErrorLabel(g,e,"",false);this._recursiveSingleValidate(g.toUpperCase(),e,0,f);},_validationResult:{},validationResult:function(){return this._validationResult;},_isValid:false,_updateValidatation:function(){for(var g in this._validationResult){var e=this._validationResult[g].failedData;for(var f in e){this._isValid=false;return;}}this._isValid=true;},isValid:function(){return this._isValid;},_recursiveFullValidate:function(i,g,h){var e=this;var f=this.element.get(0);var k=f.getColumnCount();var j=f.getRowCount();i=Object.NVL(i,0);g=Object.NVL(g,0);h=Object.NVL(h,function(){});if(i==k){h.apply(f,this._validationResult);return;}else{if(i<k&&g==j){this._recursiveFullValidate(i+1,0,h);return;}else{this.singleValidate(f.getColumn(i).name,g,function(l){e._recursiveFullValidate(i,g+1,h);});return;}}},fullValidate:function(e){this._recursiveFullValidate(0,0,e);}});function a(g){var f=0;var e=g.length;for(var h=0;h<e;++h){f+=g.charCodeAt(h)>128?2:1;}return f;}function b(g,e){var f=new RegExp(g,"gi");return f.test(e);}d.jg.JGDSValidator.prototype.options={errorMessageTag:"<span style='display:block;' />",stepValidation:true};d.jg.JGDSValidator.prototype.commonFailedMessages={required:"field is required",maxLength:"max length : {length}",minLength:"min length : {length}",length:"length : {length}",range:"range : {from} ~ {to}",rangeLength:"length : {from} ~ {to}",equals:"equals : {value}",pattern:"pattern : {pattern}",patternWord:"pattern word",patternAlphabet:"pattern alphabet",patternAlphanum:"pattern alphanum",patternEmail:"pattern email",patternNumber:"pattern number",patternPhone:"pattern phone"};d.jg.JGDSValidator.prototype.validateEngine={_customVaildate:function(i,h,e,g,f){this[i.name](i,h,e,g,f);},required:function(i,h,e,g,f){f((0<a(Object.NVL(g,""))));},maxLength:function(i,h,e,g,f){f((i.length>=a(Object.NVL(g,""))));},minLength:function(i,h,e,g,f){f((i.length<=a(Object.NVL(g,""))));},length:function(i,h,e,g,f){f((i.length==a(Object.NVL(g,""))));},range:function(j,i,e,h,g){var f=parseInt(h);g(j.from<=f&&j.to>=f);},rangeLength:function(j,i,f,h,g){var e=a(Object.NVL(h,""));g(j.from<=e&&j.to>=e);},equals:function(i,h,e,g,f){f(i.value==g);},pattern:function(i,h,e,g,f){f(b(i.pattern,g));},patternWord:function(i,h,e,g,f){f(b("^[\\w]+$",g));},patternAlphabet:function(i,h,e,g,f){f(b("^[a-zA-Z]+$",g));},patternAlphanum:function(i,h,e,g,f){f(b("^[0-9a-zA-Z]+$",g));},patternEmail:function(i,h,e,g,f){f(b("^[\\w\\-\\.]+@[\\w\\-\\.]+\\.[\\w]{1,5}$",g));},patternNumber:function(i,h,e,g,f){f(b("^[\\-]?[0-9]+$",g));},patternPhone:function(i,h,e,g,f){f(b("^[0-9]{2,4}-[0-9]{3,4}-[0-9]{3,4}$",g));},columnEquals:function(j,i,e,h,f){var g=j.value;f(this.getColumnValue(g,e)===h);},columnNotEquals:function(j,i,e,h,f){var g=j.value;f(this.getColumnValue(g,e)!==h);}};d.jg.JGDSValidator.prototype._updateErrorLabel=(function(l,n,i,m){var g=this.element.get(0);var k=g.getMappedRowTemplate(n);if(Object.isNull(k)){return;}var j=k.find("["+d.jg.JGDSValidator.STR_ERRORCOLUMNNAME+"]").filter(function(){var p=l.toUpperCase();var o=d(this).attr(d.jg.JGDSValidator.STR_ERRORCOLUMNNAME).toUpperCase();return(p==o);});var h=j.length;for(var f=0;f<h;++f){var e=d(j.get(0));e.show();i=d(this.options.errorMessageTag).html(i);if(Object.NVL(m,false)){e.append(i);}else{if(i.html().length==0){e.html("");e.hide();}else{e.html(i);}}}});d.jg.JGDSValidator.STR_ERRORCOLUMNNAME="jg-error-column";d(JGDS).on("afterload",function(){var e=d("[jg-dataset-validator][jg-dataset]");d.each(e,function(f){d(JGDS(d(this).attr("jg-dataset"))).JGDSValidator();});});})(jQuery);