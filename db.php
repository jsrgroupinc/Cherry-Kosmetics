<!DOCTYPE html>
<html>
<head>
	<?PHP

/* Read the environment.json file */
if(file_exists("/home/dotcloud/environment.json")) {
    /* configuration on dotCloud */
    require('env.php');
    
    $dsn = "mysql:dbname=$dbname;host=$host;port=$port";
}
else {
    /* your local configuration */
    $dsn = 'mysql:dbname=test;host=127.0.0.1;';
    $user = 'root';
    $password = 'root';
}

/* Create a PDO instance */
try {
    $dbh = new PDO($dsn, $user, $password);
}
catch(PDOException $e) {
    echo $e->getMessage();
    exit("PDO error occurred");
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
		}
	</script>
</head>
<body>
	<header id="formHeader" class="full-bleed">
		<div class="mid">
			<section class="horizontal flex-end">
				<button type="button" class="btn btn-sm btn-default"><i class="fa fa-key"></i>&nbsp;&nbsp;Login</button>
				<button onclick="location.replace('register.html')" type="button" class="btn btn-sm btn-danger"><i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Sign Up (Free)</button>
				<span id="lang">English&nbsp;&nbsp;|&nbsp;&nbsp;<i class="fa fa-flag"></i>&nbsp;PHP</span>
			</section>
		</div>
	</header>
	<header id="pagelogo" class="full-bleed">
		<div class="mid horizontal">
			<div class="horizontal flex-start flexed">
				<img src="css/images/mlogo.png">
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
				<li><a href="index.html">HOME</a></li>
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
				<li><a href="#">CHERRY COSMETICS</a></li>
			</ul>
		</nav>
	</header>
	<header id="mainbanner" class="full-bleed">
		<div class="full-bleed" id="bannerholder">
			<div class="mid">
				<img src="css/images/bannerimg.png">
			</div>
		</div>
	</header>
	<section id="mainContent" class="full-bleed vertical">
		<article class="mid">
			<div class="vertical white-back web-section shadowed">
				<div class="horizontal flex-center flex-space-around dashed-panel">
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">NEW</h4>
						<div class="red-frame">
							<img src="css/images/new.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">FEATURED</h4>
						<div class="red-frame">
							<img src="css/images/featured.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
					<a href="#" class="b-images white-back vertical">
						<h4 class="b-img-title">BEST</h4>
						<div class="red-frame">
							<img src="css/images/best.png">
						</div>
						<h4 class="toggled margined padded"></h4>
					</a>
				</div>
				<h4 class="ribbon-header red-back white"><div class="padded">STOP AND SHOP</div></h4>
				<div id="b-nav" class="horizontal flex-center dashed-panel">
					<a href="#" class="b-img-title"><h4>MAKEUP</h4></a>
					<a href="#" class="b-img-title"><h4>SKIN CARE</h4></a>
					<a href="#" class="b-img-title"><h4>BATH & BODY</h4></a>
					<a href="#" class="b-img-title"><h4>HAIR CARE</h4></a>
					<a href="#" class="b-img-title"><h4>NAILS</h4></a>
				</div>
			</div>
			<div class="vertical white-back web-section shadowed">
				<h4 class="ribbon-header white pink-back margined"><div class="dashed">BEAUTY WALL</div></h4>
				<div id="b-nav" class="horizontal flex-center margined">
					<a href="#"><img class="social-img" src="css/images/img1.png"></a>
					<a href="#"><img class="social-img" src="css/images/img2.png"></a>
					<a href="#"><img class="social-img" src="css/images/img3.png"></a>
					<a href="#"><img class="social-img" src="css/images/img4.png"></a>
				</div>
				<div id="b-nav" class="horizontal-not-resp flex-center">
					<a href="#" class="social-links" class="vertical"><img src="css/images/youtube.png"><p>watch tutorials</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/facebook.png"><p>like us</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/instagram.png"><p>follow us</p></a>
					<a href="#" class="social-links" class="vertical"><img src="css/images/twitter.png"><p>#listickplease</p></a>
				</div>
			</div>
			<div class="horizontal white-back web-section flex-center shadowed align-content-center">
				<h4 class="ribbon-left ribbon-left-offset ribbon-sm white pink-back padded align-self-center">
					<div class="dashed full-height align-self-center">
						<p>F&nbsp;&nbsp;E&nbsp;&nbsp;A&nbsp;&nbsp;T&nbsp;&nbsp;U&nbsp;&nbsp;R&nbsp;&nbsp;E&nbsp;&nbsp;D</p>
						<p>B&nbsp;&nbsp;R&nbsp;&nbsp;A&nbsp;&nbsp;N&nbsp;&nbsp;D&nbsp;&nbsp;S</p>
					</div>
				</h4>
				<a class="feat-links align-self-center" href="#"><img src="css/images/wellmade.png"></a>
				<a class="feat-links align-self-center" href="#"><img src="css/images/touch.png"></a>
				<a class="feat-links align-self-center" href="#"><img src="css/images/shara.png"></a>
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
</body>
</html>