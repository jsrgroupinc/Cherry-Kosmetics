var LOCAL_DOMAIN = "http://192.168.2.22:8084",
	PROD_DOMAIN = "http://services.cherrykosmetics.com",
	SUBCAT_URL = PROD_DOMAIN+"/CategoryAjaxsvc.svc/getSubCategories",
	CAT_URL = PROD_DOMAIN+"/CategoryAjaxsvc.svc/getCategories",
	PROD_BY_ID_URL = PROD_DOMAIN+"/ProductAjaxsvc.svc/GetbyId",
	REG_USER_URL = PROD_DOMAIN+"/UserAjaxsvc.svc/RegisterUser",
	LOG_USER_URL = PROD_DOMAIN+"/UserAjaxsvc.svc/LoginUser",
	VALIDATE_USER_URL = PROD_DOMAIN+"/UserAjaxsvc.svc/CheckUserLogin",
	CART_URL = PROD_DOMAIN+"/OrderAjaxsvc.svc/AddListOrder",
	CART_URL_GET = PROD_DOMAIN+"/OrderAjaxsvc.svc/GetOrderbyUserName",
	CART_UPDATE = PROD_DOMAIN+"/OrderAjaxsvc.svc/UpdateOrder",
	CART_URL_DELETE = PROD_DOMAIN+"/OrderAjaxsvc.svc/RemovefromList",
	QUERY_PROD_URL = PROD_DOMAIN+"/ProductAjaxsvc.svc/GetAll", catids = [], holder = {},
	currentPage = 1, recPerPage = 12, numpages = 0, isValidPassReg = false, 
	COOKIE_PREFIX = "cart-btcart-";

function getRequest(params,mod,uri,elem,parentField,fields){
	showLoader();
	$(elem).html('<img class="loader" src="css/images/loading.gif">');
	$.ajax({
		url: uri,
		type:"GET",
		data:params == null ? "" : params,
		dataType: "json",
		contentType:"application/json; charset=\"utf-8\"",
		success: function (xhr) {
			console.log(xhr);
			parseResponse(mod,xhr,elem,parentField,fields);
		},
		error: function (SOAPResponse) {
			//console.log(SOAPResponse);
			hideLoader();
		}
	});
}
function wait(){ 
	/*if(document.getElementById){
		document.getElementById('loader').style.display='none';
	}
	else{
		if(document.layers){
			document.waitpage.style.display='none';
		}
		else{
			document.all.waitpage.style.display='none';
		}
	}*/
}
function animateCarousel(speed){
	var width = 1133, numframes = 5,
		theBanner = $(".banner-full-bleed");
	setInterval(function(){
		var currentOffset = theBanner.css("left");
		console.log("currentOffset: "+currentOffset);
		console.log("(width*numframes)*-1: "+(width*numframes)*-1);
		if(parseInt(currentOffset) <= (width*numframes)*-1){
			theBanner.css("left","0");
		}else{
			theBanner.animate({
				"left":"-=1133"
			},400);
		}
	},speed);
}
function parseResponse(mod,resp,elem,parentField,fields){
	var xml = mod == 6 ? resp.d : $.parseXML(resp.d),
		result = "",parsed = [], builder = "", pageBuilder="";
		
	if(mod==3){
		$(xml).children().each(function(){
			console.log("$(this).find(totalrecord).text(): "+$(this).find("TotalRecord").text());
			numpages = Math.ceil( parseInt($(this).find("TotalRecord").text())/recPerPage );
		});
		$(xml).find(parentField).children().each(function(){
			//console.log(builder);
			builder = "{";
			for(var i=0;i<fields.length; i++){
				builder+= i==fields.length-1 ? "\""+(i==0?"id":i==1?"name":fields[i])+"\""+":"+"\""+$(this).find(fields[i]).text().replace(/\\/g, "/") +"\""+ "}" :
						"\""+(i==0?"id":i==1?"name":fields[i])+"\""+":"+"\""+$(this).find(fields[i]).text().replace(/\\/g, "/") + "\""+",";
			}
			parsed.push(JSON.parse(builder));
		});
		for(var i = 1; i <= numpages; i++){
			if(i==currentPage){
				pageBuilder+="<a href='javascript: paginate("+i+")' id='p-"+i+"' class='pages selected-page'>"+i+"</a>";
			}else{
				pageBuilder+="<a href='javascript: paginate("+i+")' id='p-"+i+"' class='pages'>"+i+"</a>";
			}
		}
		$('body .page-holder').each(function(){
			$(this).html(pageBuilder);
		});
	}else if(mod==5){
		//console.log(xml);
		var nodes = $(xml).find(parentField).children();	
		builder = "{";
		$(xml).find(parentField).children().each(function(i){
			//console.log($(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,""));
			if($(this).prop("tagName") == "ProductId"){
				builder += "\""+"id"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "ProductName"){
				builder += "\""+"name"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "BrandName"){
				builder += "\""+"BrandName"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "Description"){
				builder += "\""+"Description"+"\""+":"+"\""+ $(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, "'") + "\""+",";
			}else if($(this).prop("tagName") == "ImagePath"){
				builder += "\""+"ImagePath"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "QuantityPerUnit"){
				builder += "\""+"QuantityPerUnit"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "UnitPrice"){
				builder += "\""+"UnitPrice"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
			}else if($(this).prop("tagName") == "UnitsInStock"){
				builder += "\""+"UnitsInStock"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+"}";
			}
		});
		console.log(builder);
		parsed.push(JSON.parse(builder));
		console.info(builder);
	}else if(mod==6){
		if(xml == "Available"){
			regUser(true);
		}else{ loginUser(holder.email,holder.id); }
	}else if(mod==7){
		$(xml).find("Products").children().each(function(x){
			builder = "{";
			$(this).children().each(function(y){
				if($(this).prop("tagName") == "a:ImagePath"){
					builder += "\""+"ImagePath"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:OrderId"){
					builder += "\""+"OrderId"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:OrderdetailId"){
					builder += "\""+"OrderdetailId"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:Price"){
					builder += "\""+"Price"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:ProductId"){
					builder += "\""+"ProductId"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:ProductName"){
					builder += "\""+"ProductName"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+",";
				}else if($(this).prop("tagName") == "a:Quantity"){
					builder += "\""+"Quantity"+"\""+":"+"\""+$(this).text().replace(/\\/g, "/").replace(/(\r\n|\n|\r)/gm,"") + "\""+"}";
				}
			});
			parsed.push(JSON.parse(builder));
			//console.dir(parsed);		
		});
	}else{
		$(xml).children().find(parentField).each(function(){
			builder = "{";
			for(var i=0;i<fields.length; i++){
				builder+= i==fields.length-1 ? "\""+(i==0?"id":i==1?"name":fields[i])+"\""+":"+"\""+$(this).find(fields[i]).text() +"\""+ "}" :
						"\""+(i==0?"id":i==1?"name":fields[i])+"\""+":"+"\""+$(this).find(fields[i]).text() + "\""+",";
			}
			parsed.push(JSON.parse(builder));
		});	
	}
	
	switch(mod){
		case 0:
			var insertQuery = 'INSERT INTO "MCategory" (MCategoryId,Name) VALUES (?,?)',
				db = window.openDatabase("ckdb", "", "ckdb", 1024 * 1000);
			db.transaction(function(tx) {
				var mcatids = [];
				tx.executeSql('DELETE FROM MCategory');
				tx.executeSql('DELETE FROM Category');
				for(var i = 0; i < parsed.length; i++){
					var theId = parsed[i].id, theName = parsed[i].name;
					tx.executeSql(insertQuery, new Array(theId,theName));
					var selem = "#subsubcat", pfield = "BECategory", ifield = "CategoryId";
					result += "<li><a href='categories.php?catname="+parsed[i].name+"&catid="+parsed[i].id+
					"&scatid=&scatname=' onmouseover='fetchSubs(\""+selem+"\",\""+theId+"\")'>"+
					parsed[i].name+"</a></li>";
					showSubCat(4,SUBCAT_URL,selem,pfield,new Array(ifield,"Name","MCategoryId","MCategoryName"),theId);
				}
				$(elem).html(result);
			});
		break;
		case 1:
			for(var i = 0; i < parsed.length; i++){
				result +="<li><a href='categories.php?catname="+
					parsed[i].MCategoryName+"&catid="+parsed[i].MCategoryId+
					"&scatid="+parsed[i].id+"&scatname="+parsed[i].name+"' onmouseover='showCat()'>"+parsed[i].name+"</a></li>";
			}
			$(elem).html(result).show();
			hideLoader();
		break;
		case 2:
			for(var i = 0; i < parsed.length; i++){
				result += "<li><a href='categories.php?catname="+
					parsed[i].MCategoryName+"&catid="+parsed[i].MCategoryId+
					"&scatid="+parsed[i].id+"&scatname="+parsed[i].name+"' id='scat-"+parsed[i].id+"' class='pink-text'>"+parsed[i].name+"</a></li>";
			}
			$(elem).html(result).show();
			if(isNaN( parseInt( getParameterByName("scatid") ) )){
				$("#allLink").html("All "+getParameterByName("catname")).addClass("selected-cat-link");
				$("#paginationTitle").html( getParameterByName("scatname")==""?"All "+getParameterByName("catname"):getParameterByName("scatname") );
			}else{
				$("#allLink").html("All "+getParameterByName("catname")).attr("href","categories.php?catname="+
					getParameterByName('catname')+"&catid="+getParameterByName('catid'));
					$("#paginationTitle").html( getParameterByName("scatname")==""?"All "+getParameterByName("catname"):getParameterByName("scatname") );
				$("#scat-"+getParameterByName("scatid")).addClass("selected-cat-link");
			}
			console.info(parseInt( getParameterByName("scatid")));
			var params = "req=" + JSON.stringify({ "MasterCategory": parseInt( getParameterByName("catid") ), 
				"Category":isNaN(parseInt( getParameterByName("scatid")))?0:parseInt( getParameterByName("scatid")), "BrandId":0, "PageNumber":currentPage, "PageSize":recPerPage });
				getRequest(params,3,QUERY_PROD_URL,"#itemGrid","products",new Array("ProductId","ProductName","Image","QuantityPerUnit","UnitPrice"));
		break;
		case 3:
			$.ajax({
				url:"server/checkSession.php",
				type:"POST",
				data:"c=1",
				success:function(xhr){
					result = "<div class='grid horizontal'>";
					var ctr = 0, isLogged=xhr;
					for(var i = 0; i < parsed.length; i++){
						var img = parsed[i].Image==""?"css/images/notavail.jpg":PROD_DOMAIN+parsed[i].Image,
							qty = parsed[i].QuantityPerUnit==""?"N/A":parsed[i].QuantityPerUnit,
							divid = "detail-"+parsed[i].id, cartid="btcart-"+parsed[i].id,favid="btfav-"+parsed[i].id;
						var catname = getParameterByName("catname"),
							catid = getParameterByName("catid"),
							scatid = getParameterByName("scatid"),
							scatname = getParameterByName("scatname"),
							url = "productdetail.php?ProductId="+parsed[i].id+"&catname="+
							catname+"&catid="+catid+
							"&scatid="+scatid+"&scatname="+scatname;
						result+="<div onmouseout='itemHovOut(\""+divid+"\",\""+cartid+
						"\")' onmouseover='itemHover(\""+divid+"\",\""+cartid+
						"\")' class='grid-item grid-link vertical-resp flex-center white-back'>"+
							"<img src='"+img+"'>"+
							"<div id='"+divid+"' class='align-content-center prod-detail vertical'>"+
							"<h5 class='black-text'>"+addslashes(parsed[i].name)+"</h5>"+
							"<p class='black-text'>"+parsed[i].QuantityPerUnit+"</p>"+
							"<p class='black-text'>P"+parseFloat(parsed[i].UnitPrice).toFixed(2)+"</p>"+
							"<button type='button' id='"+cartid+"' data-toggle='modal' data-target='#cartModal' class='btn btn-info btn-sm bt-cart' onclick='cacheCart(\""+parsed[i].id+"\",1,\""+img+"\",\""+addslashes(parsed[i].name)+"\",\""+parsed[i].UnitPrice+"\","+isLogged+")'><i class='fa fa-shopping-cart'></i>&nbsp;&nbsp;ADD TO CART</button>"+
							"<button type='button' id='"+favid+"' class='btn btn-danger btn-sm bt-fav'><i class='fa fa-heart'></i>&nbsp;&nbsp;ADD TO WISHLIST</button>"+
							"<button type='button' onclick='location.replace(\""+url+"\")' class='btn btn-warning btn-sm bt-more'><i class='fa fa-plus-circle'></i>&nbsp;&nbsp;MORE DETAILS</button>"+
							"</div>"+
						"</div>";
						if(ctr == 3){
							ctr=0;
							result+="</div><div class='grid horizontal'>"
						}else{ ctr++; }
					}
					$(elem).html(result).show();
					hideLoader();
				},
				error:function(xhr){
					hideLoader();
				}
			});
			
		break;
		case 4:
		//sync subcats
			var insertQuery = 'INSERT INTO "Category"(CategoryId,Name,MCategoryId,MCategoryName) VALUES (?,?,?,?)',
				db = window.openDatabase("ckdb", "", "ckdb", 1024 * 1000);
			db.transaction(function(tx) {
				for(var i = 0; i < parsed.length; i++){
					tx.executeSql(insertQuery, new Array(parsed[i].id,parsed[i].name,parsed[i].MCategoryId,parsed[i].MCategoryName));
				}
				hideLoader();
			});
		break;
		case 5:
			$.ajax({
				url:"server/checkSession.php",
				type:"POST",
				data:"c=1",
				success:function(xhr){
					var isLogged=xhr, img = parsed[0].ImagePath==""?"css/images/notavail.jpg":PROD_DOMAIN+parsed[0].ImagePath,
						pgal = "<img class='pink-bordered prod-img' src='"+img+"'>",
						pdet = "<h3 class='red-text align-self-flex-start'>"+addslashes(parsed[0].name)+"</h3>"+
								"<h5 class='zero-margin align-self-flex-start'>"+parsed[0].BrandName+"</h5>"+
								"<h4 class='zero-margin align-self-flex-start'>P"+parseFloat(parsed[0].UnitPrice).toFixed(2)+
								"</h4><div class='vertical' id='boxes'>"+
								"<article class='actions horizontal'>"+
									"<div class='vertical flexed'>"+
										"<div class='btholder'>"+
											"<button data-toggle='modal' data-target='#cartModal' onclick='cacheCart(\""+parsed[0].id+"\",1,\""+img+"\",\""+addslashes(parsed[0].name)+"\",\""+parsed[0].UnitPrice+"\","+isLogged+")' type='button' class='btn btn-danger btn-lg no-radius padded'><i class='fa fa-shopping-cart'></i>"+
											"&nbsp;&nbsp;ADD TO CART</button>"+
										"</div>"+
										"<div class='sharebox vertical'>"+
											"<div class='horizontal flex-center'>"+
												"<h5 class='pink-text'>SHARE:</h5>"+
												"<a href='#' class='red-back thin-circle social-share'><i class='fa fa-facebook'></i></a>"+
												"<a href='#' class='red-back social-share'><i class='fa fa-instagram'></i></a>"+
												"<a href='#' class='red-back social-share'><i class='fa fa-twitter'></i></a>"+
											"</div>"+
											"<div class='horizontal'>"+
												"<button type='button' class='red-text bt-heart zero-margin btn btn-sm btn-default inp-group-input'><i class='fa fa-heart'></i></button>"+
												"<button type='button' class='red-text bt-wish zero-margin btn btn-sm btn-default inp-group-btn'>ADD TO WISHLIST</button>"+
											"</div>"+
										"</div>"+
									"</div>"+
									"<div class='vertical flexed spacer'>"+
									"</div>"+
								"</article>"+
								"<article class='vertical maindesc'>"+
									"<div role='tabpanel'>"+
										"<ul class='nav nav-tabs' role='tablist'>"+
											"<li role='presentation' class='active zero-radius'><a href='#home' aria-controls='home' role='tab' data-toggle='tab'><h4>PRODUCT DESCRIPTION</h4></a></li>"+
											"<li role='presentation'><a href='#profile' aria-controls='profile' role='tab' data-toggle='tab'><h4 class='pink-text'>INGREDIENTS</h4></a></li>"+
										"</ul>"+
										"<div class='tab-content'>"+
											"<div role='tabpanel' class='tab-pane active' id='home'>"+parsed[0].Description+"</div>"+
											"<div role='tabpanel' class='tab-pane' id='profile'>...</div>"+
										"</div>"+
									"</div>"+
								"</article>"+
								"</div>";
					$("#prodgallery").html(pgal);
					$("#proddetails").html(pdet);	
					hideLoader();
				},
				error:function(xhr){
					console.log(xhr);
					hideLoader();
				}
			});
		break;
		case 6:
		break;
		case 7:
			/*
			ImagePath: "/Cherry Kosmetic Products/CK-0082(2).jpg"
			OrderId: "8"
			OrderdetailId: "12"
			Price: "668"
			ProductId: "82"
			ProductName: "[SUAVISS] Colmado Lime Body Wash"
			Quantity: "1"
			*/
			var format='<tr><th></th><th></th><th>Price</th><th>Quantity</th><th>SubTotal</th></tr>',
				itemCount=0,totalPurchase=0;
			for(var i = 0; i < parsed.length; i++){
				var id = parsed[i].ProductId,
					quantity = parsed[i].Quantity,
					img = parsed[i].ImagePath,
					pname = parsed[i].ProductName,
					price = parseFloat(parsed[i].Price).toFixed(2),
					subtotal = price*quantity;
				format += '<tr>';
				format += '<td><img class="cart-prod-img" src="'+PROD_DOMAIN+img+'"></td>';
				format += '<td>';
				format += '<h4>'+pname+'</h4>';
				format += '<div class="horizontal">';
				format += '<button type="button" class="btn btn-default btn-danger"><i class="fa fa-heart"></i>&nbsp;&nbsp;Move to Wishlist</button>';
				format += '<button type="button" onclick="deleteCartItem(\''+id+'\',true)" class="btn btn-default"><i class="fa fa-ban"></i>&nbsp;&nbsp;Remove Item</button>';
				format += '</div>';
				format += '</td>';
				format += '<td>P'+price+'</td>';
				format += '<td><input id="q-'+id+'" onchange="quantityRefresh(\''+id+'\',this.value,\''+img+'\',\''+pname+'\',\''+price+'\',true)" type="number" min="1" max="99" value="'+quantity+'"></td>';
				format += '<td id="sub-'+id+'">P'+parseFloat(subtotal).toFixed(2)+'</td>';
				format += '</tr>';
				itemCount++;
				totalPurchase+=subtotal;
			}
			
			format+='</div>';
		
			if(itemCount>0){
				$("#cartcountheader").html("You have "+itemCount+" item(s) in your cart");
				$("#totalpurch").html("TOTAL AMOUNT: P"+parseFloat(totalPurchase).toFixed(2));
				$("#cartTable").html(format);
				$("#cartcount").html(itemCount);
			}else{
				$("#cartcountheader").html("You have 0 item(s) in your cart");
				$("#cartTable").html("No items found");
				$("#cartcount").html(0);
			}
			hideLoader();
		break;
	}
}
function fetchSubs(elem,catid){
	console.info("catid: "+catid);
	var selectQuery = 'SELECT * FROM "Category" WHERE "MCategoryId" = "' + catid + '"',
		db = window.openDatabase("ckdb", "", "ckdb", 1024 * 1000);
	db.transaction(function(tx) {
		tx.executeSql(selectQuery, [], function(tx, results) {
            if (results.rows.length == 0) {
				console.info("There was a problem fetching sub categories");
            } else {
				var result = "";
                for(var i = 0; i < results.rows.length; i++){
					result +="<li><a href='categories.php?catname="+
					results.rows.item(i).MCategoryName+"&catid="+results.rows.item(i).MCategoryId+
					"&scatid="+results.rows.item(i).CategoryId+"&scatname="+results.rows.item(i).Name+"' onmouseover='showCat()'>"+
					results.rows.item(i).Name+"</a></li>";
				}
				$(elem).html(result);
            }
        });
	});
}
function fetchCat(elem){
	showLoader();
	var selectQuery = 'SELECT * FROM "MCategory"',
		db = window.openDatabase("ckdb", "", "ckdb", 1024 * 1000);
	db.transaction(function(tx) {
		tx.executeSql(selectQuery, [], function(tx, results) {
			
            if (results.rows.length == 0) {
				console.info("There was a problem fetching sub categories");
            } else {
				var result = "";
                for(var i = 0; i < results.rows.length; i++){
					var theId = results.rows.item(i).MCategoryId, theName = results.rows.item(i).Name;
					var selem = "#subsubcat", pfield = "BECategory", ifield = "CategoryId";
					result += "<li><a href='categories.php?catname="+theName+"&catid="+theId+
					"&scatid=&scatname=' onmouseover='fetchSubs(\""+selem+"\",\""+theId+"\")'>"+
					theName+"</a></li>";
				}
				$(elem).html(result);
            }
        });
	});
}
function paginate(page){
	currentPage=page;
	$(".selected-page").removeClass("selected-page");
	$("#"+currentPage).addClass("selected-page");
	var params = "req=" + JSON.stringify({ "MasterCategory": parseInt( getParameterByName("catid") ), 
				"Category":isNaN(parseInt( getParameterByName("scatid")))?0:parseInt( getParameterByName("scatid")), "BrandId":0, "PageNumber":currentPage, "PageSize":recPerPage });
				getRequest(params,3,QUERY_PROD_URL,"#itemGrid","products",new Array("ProductId","ProductName","Image","QuantityPerUnit","UnitPrice"));
}
function itemHover(id,cid){
	$("#"+id).css("background","#e1817a");
	//$("#"+cid).show();
}
function itemHovOut(id,cid){
	$("#"+id).css("background","#fff");
	//$("#"+cid).hide();
}

function showSubCat(mod,uri,selem,parentField,fields,catid){
	var params = "req=" + JSON.stringify({ "MCategory": catid });
	getRequest(params,mod,SUBCAT_URL,selem,"BECategory",fields);
}
function hideSubCat(elem){
	$(elem).hide();
}
function showCat(){
	$("#navsubcat").show();
	$("#subcat").show();
}

function hoverEffect(){
	$("body .b-images").each(function(){
		$(this).hover(function(){
			$(this).find(".red-frame").css("border","none");
			var title = $(this).find(".b-img-title").html();
			$(this).find(".b-img-title").hide();
			$(this).find('.toggled').html(title).css("color","#e03c31");
		},function(){
			$(this).find(".red-frame").css("border","2px solid #e03c31");
			$(this).find(".b-img-title").show();
			$(this).find('.toggled').html("");
		});
	});	
}

function validatePassword(){
	var pass = $("#rpass").val(),
		cpass = $("#cpass").val();
	if(pass.length > 0 || cpass.length > 0){
		if(pass == cpass){
			$("#glyph").attr("class","fa fa-check-circle").css("color","rgb(0,91,171)");
			$("#rpass").css("border-color","rgb(0,91,171)");
			$("#cpass").css("border-color","rgb(0,91,171)");
			isValidPassReg=true;
		}else{
			$("#glyph").attr("class","glyphicon glyphicon-exclamation-sign").css("color","rgb(255,0,0)");
			$("#rpass").css("border-color","rgb(255,0,0)");
			$("#cpass").css("border-color","rgb(255,0,0)");
			isValidPassReg=false;
		}
	}else{
		$("#glyph").attr("class","glyphicon glyphicon-exclamation-sign").css("color","rgb(255,0,0)");
		$("#rpass").css("border-color","rgb(255,0,0)");
		$("#cpass").css("border-color","rgb(255,0,0)");
		isValidPassReg=false;
	}
	$("#passerror").show();
}
function logDefault(){
	var uname = $("#uname").val(),
		pass = document.getElementById("pass").value;
	console.log(uname);
	console.log(pass);
	if(uname !== "" && pass !== ""){
		$("#logerror").hide();
		loginUser(uname,pass);
	}else{
		$("#logerror").show();
	}
}
function validateForm(isSocial){
	$("#fielderror").hide();
	$("#btreg").attr("class","btn btn-sm btn-danger disabled");
	var isEmp = 0, errmsg = "";
	if(isValidPassReg){
		$("#formHolder [data-req='1']").each(function(){
			if($(this).val() == ""){
				isEmp++;
				$(this).css("border-color","rgb(255,0,0)");
			}
		});
		if(isEmp>0){
			errmsg = "Complete all the required fields";
			$("#fielderror").show();
			$("#errfield").html(errmsg);
		}else{
			//register user
			regUser(isSocial);
		}
		$("#btreg").attr("class","btn btn-sm btn-danger");
	}else{
		errmsg = "Passwords Do Not Match";
		$("#fielderror").show();
		$("#errfield").html(errmsg);
		$("#btreg").attr("class","btn btn-sm btn-danger");
	}
}
function regUser(isSocial){
	var params = {
		req:{
			"EmailId": isSocial?holder.email:String( $("#email").val() ),
			"Password": isSocial?holder.id:String( $("#rpass").val() ),
			"FirstName": isSocial?holder.firstName:String( $("#fname").val() ),
			"LastName": isSocial?holder.lastName:String( $("#lname").val() ),
			"Mobile": isSocial?holder.lastName:String( $("#mobile").val() ),
			"NickName": isSocial?"":String( $("#nname").val() ),
			"Birthdate": isSocial?"1/1/1975":String( $("#bdate").val() ).replace("-","/").replace("-","/")	
		}
	},errmsg="";
	params = JSON.stringify(params);
	$.ajax({
		url:REG_USER_URL,
		data:params,
		type:"POST",
		dataType: "json",
		contentType:"application/json; charset=\"utf-8\"",
		success: function (xhr) {
			if(isSocial){
				loginUser(holder.email,holder.id);
			}else{
				var resp = xhr.d;
				console.info(resp);
				if(resp=="Success"){
					$("#formHolder [data-clear='1']").each(function(){
						$(this).val("");
						$(this).css("border-color","rgb(192,192,192)");
					});
					if(!isSocial){
						$("#fielderror").hide();
						$("#regsuccess").show();
					}
				}else{
					if(!isSocial){
						errmsg = "Something went wrong processing your registration. Please try again.";
						$("#regsuccess").hide();
						$("#fielderror").show();
						$("#errfield").html(errmsg);
					}
				}
			}
		},
		error: function (SOAPResponse) {
			errmsg = "Something went wrong processing your registration. Please try again.";
			$("#regsuccess").hide();
			$("#fielderror").show();
			$("#errfield").html(errmsg);
		}
	});
}
var isSubSubHovered = false, isSubHovered = false;
function bindNavHover(){
	$("#navProd").hover(function(){
		$("#navsubcat,#subcat").show();
		$("#subsubcat").hide();
		isSubSubHovered = false;
		isSubHovered = true;
	},function(){
		if(!isSubHovered){
			$("#navsubcat,#subcat").hide();
			isSubHovered = false;
		}
	});
	$("#subcat").hover(function(){
		$("#subsubcat").show();
		isSubHovered = true;
	},function(){
		setTimeout(function(){
			if(!isSubSubHovered){
				$("#subcat, #navsubcat").hide();
				$("#subsubcat").hide();
				isSubSubHovered = false;
			}
		},500);
	});
	$("#subsubcat").hover(function(){
		$("#subsubcat").show();
		isSubSubHovered = true;
	},function(){
		$("#subsubcat").hide();
		isSubSubHovered = false;
		isSubHovered = false;
		setTimeout(function(){
			if(!isSubHovered){
				$("#navsubcat,#subcat").hide();
				isSubHovered = false;
			}
		},500);
	});
}
function initDB(){
	var db = window.openDatabase("ckdb", "", "ckdb", 1024 * 1000);
	db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "MCategory"(MCategoryId TEXT,Name TEXT)', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS "Category"(CategoryId TEXT,Name TEXT,MCategoryId TEXT,MCategoryName TEXT)', []);
    });
}
function loginUser(uname,pass){
	$("#btlogin").attr("disabled","disabled");
	var params = JSON.stringify({
            req: {
                "UserName": uname,
                "Password": pass
            }
		});
	$.ajax({
		url:LOG_USER_URL,
		type:"POST",
		data:params,
		dataType: "json",
		contentType:"application/json; charset=\"utf-8\"",
		success:function(xhr){
			console.log("LoginUser");
			console.dir(xhr);
			if(xhr.d == "Success"){
				generateSession(uname);
			}
		},
		error:function(xhr){
			console.dir(xhr);
		}
	});
}
function generateSession(uname){
	console.log("generateSession: "+uname);
	$.ajax({
		url:"server/sessionGenerate.php",
		type:"POST",
		data:"uname="+uname+"&first_name="+holder.firstName,
		success:function(xhr){
			console.log("generateSession: "+xhr);
			location.reload();
		},
		error:function(xhr){
			console.log("generateSession failed !");
			console.dir(xhr);
			$("#btlogin").removeAttr("disabled");
		}
	});
}
function cacheCart(pid,q,img,name,price,isLogged){
	showLoader();
	var p = parseInt(price)*parseInt(q);
	document.cookie = COOKIE_PREFIX+pid+"="+pid+"~"+q+"~"+img+"~"+name+"~"+p;
	refreshCart(isLogged==0?false:true);
}
function quantityRefresh(pid,q,img,name,price,isLogged){
	showLoader();
	var p = price*q, totalPurchase = 0;
	console.log(p);
	if(!isLogged){
		document.cookie = COOKIE_PREFIX+pid+"="+pid+"~"+q+"~"+img+"~"+name+"~"+price;
		var cookies = document.cookie.split(";");
		for(var i = 0; i < cookies.length;i++){
			var name=cookies[i].split("=")[0], value=cookies[i].split("=")[1];
			if(name.indexOf(COOKIE_PREFIX)>-1){
				var cdetails = value.split("~"),
					quantity = cdetails[1],
					pprice = parseFloat(cdetails[4]).toFixed(2),
					subtotal = pprice*quantity;
				totalPurchase+=subtotal;
			}
		}
		$("#sub-"+pid).html("P"+parseFloat(p).toFixed(2));
		$("#totalpurch").html("TOTAL AMOUNT: P"+parseFloat(totalPurchase).toFixed(2));
		hideLoader();
	}else{
        var theUsername = String( $("#credsholder").attr("data-uname") ),
			values = {
						req: {
							"UserName": "pradeljc@gmail.com",
							"ProductId": pid,
							"Quantity": q,
							"Price": p
						}
					};
		$.ajax({
			url:CART_UPDATE,
			type:"POST",
			data:JSON.stringify(values),
			dataType: "json",
			contentType:"application/json; charset=\"utf-8\"",
			success: function (xhr) {
				console.log(xhr);
				refreshCart(true);
			},
			error: function (xhr) {
				console.log(xhr);
				hideLoader();
			}
		});
	}
}
function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace('"', '').
        replace("'", "").replace(/;/g, "");
}

function deleteCartItem(name,isLogged){
	showLoader();
	var date = new Date();
    date.setTime(date.getTime()+(-1*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+expires;
	if(isLogged){
		var theUsername = String( $("#credsholder").attr("data-uname") ),
			values = JSON.stringify({
                "req": {
                    "UserName": theUsername,
                    "ProductId": name
                }
            });
		$.ajax({
			url:CART_URL_DELETE,
			type:"POST",
			data:values,
			dataType: "json",
			contentType:"application/json; charset=\"utf-8\"",
			success: function (xhr) {
				console.log(xhr);
				refreshCart(true);
			},
			error: function (xhr) {
				console.log(xhr);
			}
		});
	}else{
		refreshCart(false);
	}
}
function refreshCart(isLogged){
	var cookies = document.cookie.split(";"),
		itemCount = 0, format='<tr><th></th><th></th><th>Price</th><th>Quantity</th><th>SubTotal</th></tr>',
		totalPurchase = 0;
	if(!isLogged){
		for(var i = 0; i < cookies.length;i++){
			var name=cookies[i].split("=")[0], value=cookies[i].split("=")[1];
			//console.log(name.indexOf(COOKIE_PREFIX+"81") + " - " + name);
			if(name.indexOf(COOKIE_PREFIX)>-1){
				var cdetails = value.split("~"),
					id = cdetails[0],
					quantity = cdetails[1],
					img = cdetails[2],
					pname = cdetails[3],
					price = parseFloat(cdetails[4]).toFixed(2),
					subtotal = price*quantity;
				format += '<tr>';
				format += '<td><img class="cart-prod-img" src="'+img+'"></td>';
				format += '<td>';
				format += '<h4>'+pname+'</h4>';
				format += '<div class="horizontal">';
				format += '<button type="button" class="btn btn-default btn-danger"><i class="fa fa-heart"></i>&nbsp;&nbsp;Move to Wishlist</button>';
				format += '<button type="button" onclick="deleteCartItem(\''+name+'\',false)" class="btn btn-default"><i class="fa fa-ban"></i>&nbsp;&nbsp;Remove Item</button>';
				format += '</div>';
				format += '</td>';
				format += '<td>P'+price+'</td>';
				format += '<td><input id="q-'+id+'" onchange="quantityRefresh(\''+id+'\',this.value,\''+img+'\',\''+pname+'\',\''+price+'\',false)" type="number" min="1" max="99" value="'+quantity+'"></td>';
				format += '<td id="sub-'+id+'">P'+parseFloat(subtotal).toFixed(2)+'</td>';
				format += '</tr>';
				itemCount++;
				totalPurchase+=subtotal;
				//console.info(totalPurchase);
			}
		}
		format+='</div>';
		
		if(itemCount>0){
			$("#cartcountheader").html("You have "+itemCount+" item(s) in your cart");
			$("#totalpurch").html("TOTAL AMOUNT: P"+parseFloat(totalPurchase).toFixed(2));
			$("#cartTable").html(format);
			$("#cartcount").html(itemCount);
		}
		hideLoader();
	}else{
		console.log("cookies.length: "+cookies.length);
		if(cookies.length>1){
			var theUsername = String( $("#credsholder").attr("data-uname") ),
				cHolder = {
				"req":{
						"UserName":theUsername,
						"ProductIds":[]
					}
				};
			for(var i = 0; i < cookies.length;i++){
				var name=cookies[i].split("=")[0], value=cookies[i].split("=")[1];
				console.info(name+" = "+value);
				if(name.indexOf(COOKIE_PREFIX)>-1){
					var cdetails = value.split("~"),
						id = cdetails[0],
						quantity = cdetails[1],
						img = cdetails[2],
						pname = cdetails[3],
						price = parseFloat(cdetails[4]).toFixed(2),
						subtotal = price*quantity;
					cHolder.req.ProductIds.push({
						"ProductId":id,
						"Quantity":quantity,
						"Discount":0,
						"Price":subtotal
					});
					var date = new Date();
					date.setTime(date.getTime()+(-1*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
					document.cookie = name+"="+expires
				}
			}
			console.log("cHolder: "+theUsername);
			console.dir(JSON.stringify(cHolder));
			$.ajax({
				url:CART_URL,
				type:"POST",
				data:JSON.stringify(cHolder),
				dataType: "json",
				contentType:"application/json; charset=\"utf-8\"",
				success: function (xhr) {
					console.log(xhr);
					refreshCart(true);
				},
				error: function (xhr) {
					console.log(xhr);
				}
			});
		}else{
			var theUsername = String( $("#credsholder").attr("data-uname") );
			console.log("theUsername: "+theUsername);
			$.ajax({
				url:CART_URL_GET,
				type:"GET",
				data:"req="+JSON.stringify({"UserName":theUsername}),
				dataType: "json",
				contentType:"application/json; charset=\"utf-8\"",
				success: function (xhr) {
					console.log(xhr);
					//var cartFields = ["Discount","ImagePath","OrderId","OrderdetailId","Price","ProductId","ProductName","Quantity","TotalperUnit"];
					parseResponse(7,xhr,"","BEOrderDetail","");
				},
				error: function (xhr) {
					console.log(xhr);
					hideLoader();
				}
			});
		}
	}
	
}
function showLoader(){
	$("#loader").show();
}
function hideLoader(){
	$("#loader").hide();
}
/*
JSON.stringify({
            req: {
                ""UserName"": 'email1323@email.com',
                ""Password"": '1234'
            }
        } );"
[10:32:46 AM] EA: UserAjaxsvc.svc/LoginUser
[10:32:52 AM] EA: POST
*/
/*************************************************
					TWITTER INTEGRATION
**************************************************/
/*window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));
twttr.events.bind('login', function (event) {
  // Do something there
  alert('login');
});*/
function twitterRequest(){
	$.ajax({
		url: "http://api.twitter.com/oauth/request_token",
		type: "POST",
		beforeSend: function (request){
			var authorizationToken = 'OAuth oauth_consumer_key="3cpNlt6GEGVAX2xGXnqPAyWJL", oauth_nonce="ded226a9b93b81a5e150987ed361aecc", oauth_signature="d%2FGI4u6pdaStyInqYnh844Tz40I%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1423202058", oauth_version="1.0"';
            request.setRequestHeader("Authorization", authorizationToken);
        },
		success: function(xhr){
			console.log("SUCCESS TWITTER");
			console.dir(xhr);
		},
		error: function(xhr){
			console.log("ERROR TWITTER");
			console.dir(xhr);
		}
	});
}
/*************************************************
			FACEBOOK INTEGRATION
**************************************************/
function fbConnect(){
	FB.login(function(response) {
		if (response.status === 'connected') {
			testAPI();
		}
	}, { scope: 'email' });
}
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Please log ' +
       // 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
function fbConnect(){
	FB.login(function(response) {
		if (response.status === 'connected') {
			testAPI();
		}
	}, { scope: 'email' });
}
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1522447084654303',
		status     : true, // check login status
		cookie     : false, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});
	FB.Event.subscribe('auth.authResponseChange', function(response) {
		// Here we specify what we do with the response anytime this event occurs. 
		if (response.status === 'connected') {
			console.log("true");
		}
	}, { scope: 'email,education,work' });
};
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "http://connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

function testAPI() {
	FB.api('/me', function(response) {
		console.log(JSON.stringify(response));
		var fb_prof = "<b>" + response.first_name + " " + response.last_name + "</b></br>";
		fb_prof += response.work !== undefined ? ( response.work[0].position !== undefined ? response.work[0].position.name + " at " + response.work[0].employer.name + "</br>" : response.work[0].employer.name + "</br>" ) : "";
		fb_prof += response.work !== undefined ? ( response.work[0].position !== undefined ? "<b>Current</b> " + response.work[0].position.name + "</br></br>" : "</br></br>" ) : "";
		fb_prof += "</br></br>";
		fb_prof += "<b>Experience</b></br>";
		if(response.work !== undefined){
			for(var i = 1; i < response.work.length; i++){
				fb_prof += (response.work[i].position !== undefined ? response.work[i].position.name + " at " + response.work[i].employer.name + "</br>" : response.work[i].employer.name + "</br>");
				fb_prof += (response.work[i].start_date !== undefined ? response.work[i].start_date + " - " : "");
				fb_prof += (response.work[i].end_date !== undefined ? response.work[i].end_date + "</br>" : "</br>");
				fb_prof += "</br></br>";
			}
		}
		
		if(response.education !== undefined && response.education.length > 0){
			fb_prof += "<b>Education</b> </br> ";
			for(var i = 0; i < response.education.length; i++){
				fb_prof += "<b>" + response.education[i].school.name + "</b></br>" + response.education[i].type + "</br></br>";
			}
		}
		holder = {
			"id":response.id,
			"email":response.email,
			"firstName":response.first_name,
			"lastName":response.last_name
		};
		//console.dir(holder);
		validateAccount(holder);
	});
}
function validateAccount(holder){
	//VALIDATE_USER_URL
	var params = "req="+JSON.stringify({"EmailId":holder.email});
	getRequest(params,6,VALIDATE_USER_URL,"","","");
}