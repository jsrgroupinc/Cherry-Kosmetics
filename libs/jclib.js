function queryBuilder(tablename, fields, aggre){
	this.args = [];
	this.fieldBuilder = "";
	this.argBuilder = " WHERE ";
	this.gridNo = 0;
	this.query = "";
	this.gfields = new Array();
	if(arguments.length > 0){
		this.tablename = tablename;
		this.fields = fields;
		if(arguments.length == 3){
			this.aggre = " "+aggre || "";
		}
	}
}

queryBuilder.prototype.argSetup = function(argField, operator, argValue, dataType, sqlOperator){
	this.args.push({
		"argField": argField,
		"operator": operator,
		"argValue": argValue,
		"dataType": dataType,
		"sqlOperator": sqlOperator || ""
	});
};

queryBuilder.prototype.fetchArgs = function(){
	for(var i = 0; i < this.args.length; i++){
		if(i == this.args.length-1){
			if(this.args[i].dataType.toString() == DATATYPE_STR()){
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " '" + this.args[i].argValue.toString() + "'";
			}else if(this.args[i].dataType.toString() == DATATYPE_MD5()){
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " md5('" + this.args[i].argValue.toString() + "')";
			}else{
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " " + this.args[i].argValue.toString();
			}
		}else{
			if(this.args[i].dataType.toString() == DATATYPE_STR()){
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " '" + this.args[i].argValue.toString() + "' " + this.args[i].sqlOperator.toString() + " ";
			}else if(this.args[i].dataType.toString() == DATATYPE_MD5()){
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " md5('" + this.args[i].argValue.toString() + "') ";
			}else{
				this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " " + this.args[i].argValue.toString() + " " + this.args[i].sqlOperator.toString() + " ";
			}
		}
	}
	return this.argBuilder;
};

queryBuilder.prototype.constructQuery = function(){
	if(this.args.length > 0){
		for(var i = 0; i < this.fields.length; i++){
			if(i == this.fields.length-1){
				this.fieldBuilder += this.fields[i];
			}else{
				this.fieldBuilder += this.fields[i] + ", ";
			}
		}
		for(var i = 0; i < this.args.length; i++){
			if(i == this.args.length-1){
				if(this.args[i].dataType.toString() == DATATYPE_STR()){
					this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " '" + this.args[i].argValue.toString() + "'";
				}else{
					this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " " + this.args[i].argValue.toString();
				}
			}else{
				if(this.args[i].dataType.toString() == DATATYPE_STR()){
					this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " '" + this.args[i].argValue.toString() + "' " + this.args[i].sqlOperator.toString() + " ";
				}else{
					this.argBuilder += this.args[i].argField.toString() + " " + this.args[i].operator.toString() + " " + this.args[i].argValue.toString() + " " + this.args[i].sqlOperator.toString() + " ";
				}
			}
		}
		this.query = "SELECT " + this.fieldBuilder + " FROM " + this.tablename + this.argBuilder;
	}else{
		for(var i = 0; i < this.fields.length; i++){
			if(i == this.fields.length-1){
				this.fieldBuilder += this.fields[i];
			}else{
				this.fieldBuilder += this.fields[i] + ", ";
			}
		}
		this.query = "SELECT " + this.fieldBuilder + " FROM " + this.tablename;
	}
	this.args.splice(0, this.args.length);
	if(this.aggre){
		this.query += this.aggre;
	}
	debug("QUERY BUILDER DEBUG", this.query);
	return this.query;
};

function buildArguments(form, callback){
	var qbuilder = new queryBuilder();
	$("#"+form+" input[class='form-control']").each(function(index){
		
		var dom = String( $(this).attr("data-args") ),
			domVal = $("#"+dom).val(),
			operator = String( $(this).attr("data-op") );
		if(dom.indexOf('static') <= 0){
			var dataType = String( $(this).attr("data-type") );
			if(index < parseInt($("#"+form+" input[class='form-control']").length)-1){
				qbuilder.argSetup(dom, operator, domVal, dataType, SQL_OPERATOR_AND());
			}else{				
				qbuilder.argSetup(dom, operator, domVal, dataType);
			}
		}
	});
	if(typeof callback == "function"){
		callback(qbuilder.fetchArgs());
	}
}
function removeDupAssoc(arr,u_key){
	var key = "";
	for(obj in arr[0]){
		console.log(obj);
		if(String( obj ) == u_key){
			key = String( obj );
		}
	}
	for(var x = 0; x < arr.length; x++){
		for(var z = 0; z < arr.length; z++){
			if(z !== x){
				if(arr[x].key == arr[z].key){
					arr.splice(x,1);
				}
			}
		}
	}
	console.log(JSON.stringify(arr));
	return arr;
}
function formatDate(date){
	return (new Date(date).getMonth() + 1) + "/"+new Date(date).getDate() + "/" + new Date(date).getFullYear();
}

function currentDate(){
	var now = new Date();
	return now;
}
function dateCompare(sdate, edate){
	var s = parseFloat(new Date(sdate).getTime());
	var e = parseFloat(new Date(edate).getTime());
	if(s >= e){
		return false;
	}else{
		return true;
	}
}

function restrictNumericInput(e){
	var charCode = (e.which) ? e.which : e.keyCode;
	if(charCode > 31 && (charCode < 48 || charCode > 57)){
		return false;
	}else{
		return true;
	}
}

function restrictInputAllowDash(e){
	var charCode = (e.which) ? e.which : e.keyCode;
	if(charCode > 31 && (charCode < 48 || charCode > 57)){
		if(charCode == 45){
			return true;
		}else{
			return false;
		}
	}else{
		return true;
	}
}
function forceToUpper(integ){
	var theElem = $("#"+integ);
	var inp = theElem.val();
	theElem.val(inp.toUpperCase());
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function wait(loadingMask){ 
	if(document.getElementById){
		document.getElementById(loadingMask).style.visibility='hidden';
	}
	else{
		if(document.layers){
			document.waitpage.visibility = 'hidden';
		}
		else{
			document.all.waitpage.style.visibility = 'hidden';
		}
	}
}

function getParameterStr(url,name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(url);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function showAlert(msg, isSuccess){
	if(!isSuccess){
		$(".alert").attr("class","alert alert-danger").html(msg).show();
	}else{
		$(".alert").attr("class","alert alert-success").html(msg).show();
	}
}

function hideAlert(){
	$(".alert").hide();
}

function ajaxRequest(url, type, dataType, data, callback){
	$.ajax({
		url: url,
		type: type,
		data: data,
		//dataType: dataType,
		success: function(xhr){
			//console.dir(xhr);
		},
		error: function(xhr){
			console.dir("ERROR");
			//console.dir("status: "+xhr.status);
			//console.dir(JSON.stringify(xhr));			
		}
	}).done(function(data){
		if(typeof callback == "function"){
			callback(data);
		}
	});
}

function disableButtons(){
	$("button").attr("disabled","disabled");
}

function enableButtons(){
	$("button").removeAttr("disabled");
}
/*****************************************************************************
CONSTANT VARIABLES
******************************************************************************/

function DATATYPE_INT(){
	return 0;
}

function DATATYPE_STR(){
	return 1;
}

function DATATYPE_DATE(){
	return 2;
}
function DATATYPE_MD5(){
	return 3;
}

function SQL_OPERATOR_OR(){
	return "OR";
}

function SQL_OPERATOR_AND(){
	return "AND";
}

function OPERATOR_EQ(){
	return "=";
}

function OPERATOR_NOT_EQ(){
	return "<>";
}


function OPERATOR_GR(){
	return ">";
}
function OPERATOR_GTE(){
	return ">=";
}
function OPERATOR_LT(){
	return "<";
}
function OPERATOR_LTE(){
	return "<=";
}