<!DOCTYPE html>
<html>
<head>
	<?php 
		session_start();
		$isLogged = "false";
		if(array_key_exists("login",$_SESSION)){
			$isLogged = "true";
			
		}
	?>
	<meta charset = "utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link href="libs/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/public/style.css" rel="stylesheet">
	
	<script src = "libs/jquery-1.11.1.min.js"></script>
	<script src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script src = "libs/modernizr.custom.64329.js"></script>
	<script src = "libs/jclib.js"></script>
	<script src = "libs/functions.js"></script>
	<script src = "libs/sp.js"></script>
	<script>
		$(document).ready(loader);
		function loader(){
			initDB();
			hoverEffect();
			bindNavHover();
			var masterCat = ["MCategoryId","Name"];
			getRequest(null,0,CAT_URL,"#subcat","BEMCategory",masterCat);
			//var params = "req=" + JSON.stringify({ "ProductId": 1 });//JSON.stringify({ "CategoryId": 1, "PageNumber":1, "PageSize":20 });
			//getRequest(params,2,PROD_BY_ID_URL,"#subcat","dcProductresp","ProductId");
			var isLogged=<?php echo $isLogged ?>;
			console.log("isLogged: "+isLogged);
			refreshCart(isLogged);
		}
	</script>
</head>
<body onload="wait()">
<div id="loader" class="horizontal align flex-center">
	<div id="loaderHolder" class="vertical align-self-center">
		<img class="align-self-center" id="loadinglogo" src="css/images/logo.jpg">
		<img class="align-self-center" src="css/images/loadingall.gif">
	</div>
</div>
<div class="sparkley"></div>
	<header id="formHeader" class="full-bleed">
		<div class="mid">
			<section class="horizontal flex-end">
				<?php
					if($isLogged=="false"){
						$url = "register.php";
						echo '<button type="button" data-toggle="modal" data-target="#loginModal" class="btn btn-sm btn-default"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
							<button onclick="location.replace(\''.$url.'\')" type="button" class="btn btn-sm btn-danger"><i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Sign Up (Free)</button>
							<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#cartModal" type="button">
							<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;CART<span id="cartcount" class="badge"></span>
							</button>';
					}else{
						$first_name = $_SESSION['login'];
						$guname = $_SESSION['uname'];
						$url = "logout.php";
						echo '<button class="btn btn-primary btn-sm btn-form-header" data-toggle="modal" data-target="#cartModal" type="button">
						<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;CART<span id="cartcount" class="badge"></span></button>
						<button onclick="location.replace(\''.$url.'\')" type="button" class="btn btn-sm btn-danger btn-form-header"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Logout</button>
						<div class="horizontal-not-resp margined-sm flex-space-around"><p>Welcome</p>&nbsp;<p class="red-text" id="credsholder" data-uname="'.$guname.'">'.$first_name.'</p></div>';
					}
				?>
				<span id="lang">English&nbsp;&nbsp;|&nbsp;&nbsp;<i class="fa fa-flag"></i>&nbsp;PHP</span>
			</section>
		</div>
	</header>
	<header id="pagelogo" class="full-bleed">
		<div class="mid horizontal">
			<div class="horizontal flex-start flexed">
				<img id="mainlogo" src="css/images/logo.jpg">
			</div>
			<div class="horizontal flex-end flexed">
				<section class="horizontal"	id="searchform">
					<input type="text" class="inp-group-input" placeholder="Enter Search Here">
					<button type="button" class="btn btn-sm btn-default inp-group-btn"><i class="fa fa-search"></i></button>
				</section>
			</div>
		</div>
	</header>
	<div id="dividerline" class="full-bleed"></div>
	<div id="divider" class="full-bleed"></div>
	<header id="navheader" class="full-bleed">
		<nav class="mid">
			<ul class="horizontal flex-center">
				<li><a href="index.php">HOME</a></li>
				<li><a href="#">BEST SELLER</a></li>
				<li>
					<a href="#" id="navProd">PRODUCTS</a>
					<nav id="navsubcat"class="horizontal">
						<ul id="subcat" class="vertical">
							
						</ul>
						<ul id="subsubcat" class="vertical">
							
						</ul>
					</nav>
				</li>
				<li><a href="#">BEAUTY WALL</a></li>
				<li><a href="#">SALE!</a></li>
				<li><a href="about.php">CHERRY COSMETICS</a></li>
			</ul>
		</nav>
	</header>
	<section id="mainContent" class="full-bleed vertical">
		<article class="mid full-bleed horizontal flex-center">
			<div role="tabpanel">
				<ul class="nav nav-tabs nav-justified nav-tabs-white" role="tablist">
					<li role="presentation" class="active zero-radius">
						<a href="#about" aria-controls="about" role="tab" data-toggle="tab">
						<h4 class="red-text">ABOUT</h4></a>
					</li>
					<li role="presentation" class = "zero-radius">
						<a href="#order" aria-controls="order" role="tab" data-toggle="tab">
						<h4 class="red-text">ORDER PROCESS</h4></a>
					</li>
					<li role="presentation" class = "zero-radius">
						<a href="#shipment" aria-controls="shipment" role="tab" data-toggle="tab">
						<h4 class="red-text">SHIPMENT PROCESS</h4></a>
					</li>
					<li role="presentation" class = "zero-radius">
						<a href="#policies" aria-controls="policies" role="tab" data-toggle="tab">
						<h4 class="red-text">POLICIES</h4></a>
					</li>
				</ul>
				<div class="tab-content tab-content-white">
					<div role="tabpanel" class="tab-pane active" id="home">
						CHERRY KOSMETICS IS A START-UP BUSINESS SPECIALIZING IN MULTIPLE KOREAN BRAND PRODUCTS
						CREATED BY ERICSON KANG AND SEND RHEE, THE COMPANY FOUNDER. IT SOLVES THE GROWING NEED FOR
						KOREAN COSMETICS AND PERSONAL CARE PRODUCTS. ONLINE COSMETICS MULTI SHOP IN THE PHILIPPINE MARKET AND CHINA MARKET.
						OVER 100 KOREAN BRAND COSMETICS AND BEAUTY ITEMS WITH GOOD QUALITY AND AFFORDABLE PRICE WILL BE PRESENT TO OUR CLIENTS
						OF ONLINE COSMETIC MULTI SHOP.
						KOSMETICS CHERRY IS SUBTLE IN THE USE OF INGREDIENTS. MOST OUR BRANDS TEND TO GO FOR MORE NATURAL INGRIDIENTS THAT WILL BENEFIT
						EVERYONE'S SKIN. THESE PRODUCTS INCLUDE HERBAL THERAPHY PACKS, SOAPS, SKINCARE, MAKEUP, BODY AND HAIR CARE, MOISTURIZERS, NAIL CARE,
						AND SOME OTHER BEAUTY PRODUCTS. ALL SKIN CARE SETS ARE MADE FROM HERBS AND NATURAL INGREDIENTS.
					</div>
					<div role="tabpanel" class="tab-pane" id="order">
					</div>
					<div role="tabpanel" class="tab-pane" id="shipment">
					</div>
					<div role="tabpanel" class="tab-pane" id="policies">
					</div>
				</div>
			</div>
		</article>
	</section>
	<footer class="full-bleed horizontal flex-start">
		<div class="mid horizontal-not-resp">
			<section class="vertical">
				<h5 class="pink-text">CUSTOMER CARE</h5>
				<p class="pink-text">CONTACT US</p>
				<p class="indent pink-text">TEL NO.: 888-888-888</p>
				<p class="indent pink-text">OPERATING HOURS</p>
				<p class="indent pink-text">3:00 AM TO 6:00 PM</p>
				<p class="indent pink-text">MONDAY TO FRIDAY</p>
			</section>
			<section class="vertical">
				<h5 class="pink-text">PAYMENT OPTIONS</h5>
				<div class="horizontal">
					<a href="#"><img src="css/images/mastercard.png"></a>
					<a href="#"><img src="css/images/visa.png"></a>
				</div>
			</section>
			<section class="vertical">
				<h5 class="pink-text">INFORMATION</h5>
				<a href="#" class="indent pink-text">ABOUT US</a>
				<a href="#" class="indent pink-text">FAQ</a>
				<a href="#" class="indent pink-text">DELIVERY</a>
				<a href="#" class="indent pink-text">PRIVACY POLICY</a>
				<a href="#" class="indent pink-text">TERMS & CONDITIONS</a>
			</section>
		</div>
	</footer>
<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header ribbon-header red-back white margined">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</h4>
			</div>
			<div id="loginForm" class="modal-body horizontal">
				<article class="vertical flexed">
					<input type="text" id="uname" placeholder="Username">
					<input type="password" id="pass" placeholder="Password">
					<button id="btlogin" type="button" onclick="logDefault()" class="btn btn-sm btn-danger"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
					<div id="logerror" class="alert alert-danger" role="alert">
						<div class="horizontal-not-resp flex-center">
						<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
						<span class="sr-only">Error:</span>
						<p id="errlog">Invalid username or password</p>
						</div>
					</div>
				</article>
				<article class="vertical flexed">
					<p class="horizontal-not-resp"><button type = "button" onclick="fbConnect()" id="btnlogfb" class="btn btn-default btn-social">
						<i class="fa fa-facebook-square soc-ic" id="fblogo"></i>&nbsp;Sign in with Facebook</button>
					</p>
					<!--<p class="horizontal-not-resp"><button type = "button" id="btnlogtwit" class="btn btn-default btn-social">
						<i class="fa fa-twitter-square soc-ic" onclick="twitterRequest()" id="twitterlogo"></i>&nbsp;Sign in with Twitter</button>
					</p>!-->
					
				</article>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div id="theCart" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header ribbon-header red-back white margined">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel"><i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Cart</h4>
			</div>
			<div id="cartForm" class="modal-body horizontal">
				<div class="panel panel-default">
					<div class="panel-heading" id="cartcountheader"></div>
					<table id="cartTable" class="table">
					</table>
					<div class="panel-heading horizontal flex-end" id="totalpurch"></div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" id="btncheckout" class="btn btn-info btn-primary btn-lg"><i class="fa fa-credit-card"></i>&nbsp;&nbsp;PROCEED TO CHECKOUT</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>