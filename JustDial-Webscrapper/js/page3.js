<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
 <head> 
  <title>Just Dial - India's No.1 local search engine</title> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
  <link rel="stylesheet" href="tools/css/style.css?v=12.69" type="text/css"> 
  <script type="text/javascript">
var cookie_domain = ".justdial.com";
</script> 
  <script src="tools/js/main.js?v=12.69" type="text/javascript" charset="utf-8"></script> 
  <script type="text/javascript" src="tools/js/jquery.min.js?v=12.69"></script> 
  <script type="text/javascript">
$(document).ready(function(){ 
        variable_cmp_name();
        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        window.addEventListener(orientationEvent, function() {	
        setTimeout(function(){variable_cmp_name();},250);
       }); 
       
       }); 

    
function variable_cmp_name(){
	    var useragent="";
        var namedivwidth=(61/100)*($(window).width()-55);
        if($(window).width()>350)
        {
          namedivwidth=(70/100)*($(window).width()-70);  
        }
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Nokia/i.test(navigator.userAgent)) {
        useragent=navigator.userAgent;
        }
        if(useragent.search(/Wildfire/i)>-1)
        {
		namedivwidth=(57/100)*($(window).width()-70);            
        }
	    if(window.orientation==90 || window.orientation==-90)
	    {
	    namedivwidth=(70/100)*($(window).width()-70);
	    }
        var buttondivwidth=(20/100)*($(window).width()-100);
        $('.result').css('width',namedivwidth);
        $('.result_right').css('width',buttondivwidth);
        var div_width=$(".title").width();
        for(var i=0;i<10;i++)
	    {
		var companyname=$(".cmpny"+i).attr('value');
		var obj=$(".cmpny"+i).find(".comp_name_text");
		if(useragent.search(/NokiaC5-00/i)>-1)
        {
		var new_com_name=companyname.substring(0,9)+"...";
        obj.html(new_com_name);
		}else
		{	
		var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.font = "12px Arial";
        var string_width=ctx.measureText(trim(obj.attr('value'))).width;
        var pixcels_per_char=string_width/trim(obj.attr('value')).length;
        var string_of_string_to_display=div_width/(pixcels_per_char+3);
        if(string_of_string_to_display<companyname.length){
			var new_com_name=companyname.substring(0,string_of_string_to_display)+"...";
           obj.html(new_com_name);
        }else{
           obj.html(companyname);
        }
        } 	
		}

    
}     

function nearMe()
{
	detecting_pop = '';
	if(getCookie('geoLocation') != 'Notfound' && detecting_pop == '1')
	{
		msg_popup();
	}
	else
	{
	   display_msg("Detecting Location");
	}

	urlpart			= '';
	what			= get_id_value("what");
	var i			= what.indexOf('');
	what			= (i > 0) ? trim(what.substring(0,i)) : what;
	catid			= get_id_value("catid");
	stype			= get_id_value("stype");
	city			= get_id_value("city");
	docid			= get_id_value("docid");
	rnd1			= get_id_value("rnd1");
	rnd2			= get_id_value("rnd2");
	rnd3			= get_id_value("rnd3");
	subcat			= get_id_value("subcat");
	sortby			= 'nearme';
	vertical		= get_id_value("vertical");
	
	var asflg			= '';
	var enflg			= '';
	var enid			= '';
	var skipLowestPrice	= (enid && enflg) ? '&skip=1' : '';
	
	if(window.blackberry)
	{
	   // set to Autonomous mode
		if(blackberry.location != undefined)
		{
			blackberry.location.setAidMode(0);
			
			var lati = blackberry.location.latitude;
			var longi = blackberry.location.longitude;
			
			if(lati > 0 && longi > 0)
			{
				if(getCookie('geoLocation') != 'Notfound' && detecting_pop == '1')
				{
					$.msg( 'unblock' );
				}
				setCookie('geoLocation','Found');
				window.location = 'search.php?stype=' + stype + '&what=' + what + '&catid=' + catid + '&lat=' + lati + '&long=' + longi + "&nearme=1&nearme_auto=1&city=" + city + "&docid=" + docid + "&rnd1=" + rnd1 + "&rnd2=" + rnd2 + "&rnd3=" + rnd3 + "&subcat=" + subcat + "&sortby=" + sortby + "&vertical=" + vertical + "&asflg=" + asflg + "&enflg=" + enflg+ "&enid=" + enid + skipLowestPrice ;
			}
			else
			{
				gps_error("Couldn't Detect Location");
			}
		}
		else
		{
			gps_error("Couldn't Detect Location");
		}
	}

	if(geo_position_js.init())  
	{
		geo_position_js.getCurrentPosition(show_position,error,{enableHighAccuracy:true}); 
	}
	else 
	{
		gps_error("GPS feature is not available on your device.");
	}
}

function show_position(p)
{
	var lati	= p.coords.latitude.toFixed(5);
	var longi	= p.coords.longitude.toFixed(5);
	var acc		= p.coords.accuracy; // accuracy of GPS/APGS /WIFI

	if(acc > 100)
	{
		var lat1 = getCookie('lat1');  // previous latitide 
		var lon1 =  getCookie('lon1'); // previous lonigtude  

		var d = CalcDistance(lat1, lon1, lati, longi);

		if(d < 200)
		{
			lati	= lat1;
			longi	= lon1;
		}
	}

	if(lati > 0 && longi > 0)
	{
		if(getCookie('geoLocation') != 'Notfound' && detecting_pop == '1')
		{
			$.msg( 'unblock' );
		}
		setCookie('geoLocation','Found');
		setCookie('lat1',lati);setCookie('lon1',longi);
		
		var asflg			= '';
		var enflg			= '';
		var enid			= '';
		var skipLowestPrice	= (enid && enflg) ? '&skip=1' : '';
		
		window.location = 'search.php?stype=' + stype + '&what=' + what + '&catid=' + catid + '&lat=' + lati + '&long=' + longi + "&nearme=1&nearme_auto=1&city=" + city + "&docid=" + docid + "&rnd1=" + rnd1 + "&rnd2=" + rnd2 + "&rnd3=" + rnd3 + "&subcat=" + subcat + "&sortby=" + sortby + "&vertical=" + vertical + "&asflg=" + asflg + "&enflg=" + enflg+ "&enid=" + enid + skipLowestPrice ;
	}
	else
	{
		gps_error("Couldn't Detect Location");
	}
}

function gps_error(msg)
{
	if(getCookie('geoLocation') != 'Notfound' && detecting_pop == '1')
	{
		$.msg('unblock');
	}
	display_msg(msg);
	setCookie('geoLocation','Notfound');
	setCookie('lat1','');setCookie('lon1','');
}

function error()
{
	if(getCookie('geoLocation') != 'Notfound' && detecting_pop == '1')
	{
		$.msg('unblock');
	}
	setCookie('geoLocation','Notfound');
	setCookie('lat1','');setCookie('lon1','');
	display_msg("Couldn't Detect Location");
}

function msg_popup()
{
	$(function(){
		document.cookie = escape('popup') + "=" + escape(1) + "; expires=; path=/";
		$.msg({ 
			fadeIn : 10,
			fadeOut : 20,
			autoUnblock : false,
			bgPath :'tools/img/',
			content :'<div class="androidpopouter" id="loader">' +						
						'<div>' + 
							'<img src="tools/img/loader.gif" border="0" />' +
						'</div>' + 
						'<div>Detecting Location</div>' + 
					'</div>'
		});
	});
}
</script> 
 </head> 
 <body onload="smoothScroll('smtrsl');"> 
  <div class="header">
   <div class="tlog sub">
    <a href="index.php?city=&amp;area=&amp;lat=0&amp;long=0&amp;nr_stop=1&amp;suffix="><img src="http://akam.cdn.jdmagicbox.com/images/newwap/justdiallogo.png" alt="JustDial Mobile" border="0"></a>
   </div>
   <a id="bk1" class="topback" href="http://wap.justdial.com/search.php?back=1">Back</a>
   <a id="bk2" class="topback" href="javascript:void(0);" style="display:none;" onclick="backDiv();">Back</a>
   <a class="topback" id="back2" href="#" style="display: none">Back</a>
   <div class="ddwn">
    <a id="ddwn_link" href="javascript:;" onclick="showHideTopMenu();"></a>
   </div>
  </div>
  <div class="dropdown" id="topmenu" style="display:none;">
   <a class="tphnwrp" href="tel:+918888888888"><span class="tphic">08888888888</span></a>
   <a href="log_in.php?vndr=1"><span>Log In</span><span></span></a>
   <a href="sign_up.php"><span>Sign Up</span><span></span></a>
   <a href="log_in.php"><span>My Account</span></a>
   <a href="log_in.php?module=fav"><span>My Favorites</span></a>
   <a href="log_in.php "><span>Friends Rating</span></a>
  </div>
  <div class="wrapper"> 
   <div class="err" id="error_msg"></div> 
   <div class="lsrc"> 
    <form name="frmsrch" method="get" action="search.php"> 
     <p id="dvwhat" class="wht  rest"> <input type="text" value="Electricians" id="what" name="what" onclick="clearcatid();toggle_valf('what','search for anything, anywhere',' near ');" onblur="toggle_valb('what','search for anything, anywhere');" onkeyup="atComCat(this.id,'sersugg','both');" autocomplete="off"> <a class="close" href="javascript:;" onclick="clear_val('what','search for anything, anywhere');"></a> <span class="autosuggest_div sr" id="sersugg"></span> </p> 
     <span id="dvarea"> <p class="whr"> <input type="text" value="Where? e.g. Malleswaram" onchange="return remove_suffix();" id="area" name="area" onkeyup="atComCat(this.id,'sersuggArea','area1');" onclick="toggle_valf('area','Where? e.g. Malleswaram','');atComCat(this.id,'sersuggArea','history');cval('lat');cval('long');" onblur="javascript:toggle_valb('area','Where? e.g. Malleswaram');hidauto();set_time();" autocomplete="off" class="grey"> <a class="close" href="javascript:;" onclick="clear_val('area','Where? e.g. Malleswaram');"></a> <span id="sersuggArea" class="autosuggest_div"></span> </p> <input class="serch" type="submit" name="" value=" "> </span> 
     <input type="hidden" id="user_city" value="Bangalore"> 
     <input type="hidden" name="catid" id="catid" value=""> 
     <input type="hidden" name="city" id="city" value="Bangalore"> 
     <input type="hidden" name="page_name" id="page_name" value="listing"> 
     <!-- 				<input type="hidden" name="nearme" id="nearme" value="" >
				<input type="hidden" name="nearme_auto" id="nearme_auto" value="" >
 --> 
     <input type="hidden" name="stype" id="stype" value="what_where"> 
     <input type="hidden" name="subcat" id="subcat" value="N"> 
     <input type="hidden" name="lat" id="lat" value="0"> 
     <input type="hidden" name="long" id="long" value="0"> 
     <input type="hidden" name="suffix" id="suffix" value=" "> 
    </form> 
   </div> 
   <div class="toplinks" id="smtrsl"> 
    <table width="100%" cellspacing="0" cellpadding="0"> 
     <tbody>
      <tr>
       <td class="act"><a>Top</a></td>
       <td><a href="javascript:;" onclick="nearMe();">Near Me</a></td>
       <td><a href="search.php?what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;sp_area=&amp;lat=0&amp;long=0&amp;nearme=&amp;nearme_auto=2&amp;catid=10184166&amp;subcat=N&amp;suffix=&amp;asflg=&amp;enid=&amp;enflg=&amp;sortby=rating&amp;aflg=&amp;pincodebd=999999">Ratings</a></td>
       <td class="se"><a href="sms.php?page=&amp;lat=0&amp;long=0&amp;what=Electricians&amp;stype=category&amp;previous_stype=category&amp;area=&amp;sp_area=&amp;nearme=&amp;nearme_auto=&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;previous_page=search&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;city=Bangalore&amp;sms_docid=080PXX80.XX80.151029121331.V2D2,080PXX80.XX80.161121131539.B7K1,080PXX80.XX80.150611083224.J1P8,080PXX80.XX80.160805144845.G3I1,080PXX80.XX80.160805114950.F5R3,080PXX80.XX80.160906180004.K1E6,080PXX80.XX80.110125125639.T8G7&amp;timing=true&amp;pincodebd=999999&amp;suffix=">Sms/Email</a></td> 
      </tr> 
     </tbody>
    </table> 
   </div> 
   <!--
        Auhtor : Vibhas Bhingarde
        HTML for price filter UI
        Start 
        --> 
   <div class="wrp_sec pricing" id="pricefilterdiv" style="display: none;">
    <div class="pricesec"> 
     <div class="wrp_sec"> 
      <div class="headleft">
       Meal For Two (
       <abbr class="grpric"></abbr>)
      </div> 
      <div class="headright">
       <a href="search.php?what=&amp;previous_what=&quot;&amp;city=Bangalore&amp;lat=0&amp;long=0&amp;nearme=&amp;nearme_auto=&amp;stype=category&amp;previous_stype=filter&amp;area=&amp;sp_area=&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;catid=&amp;subcat=N">(All Options)</a>
      </div> 
     </div> 
     <div class="prices"> 
      <ul> 
      </ul> 
     </div> 
    </div>
   </div> 
   <!--
        END
        --> 
   <div class="rs_outer"> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.151029121331.V2D2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny0" value="Sri Manjunatha Electronics And Electricals"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.151029121331.V2D2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content4.jdmagicbox.com/comp/bangalore/d2/080pxx80.xx80.151029121331.v2d2/catalogue/sri-manjunatha-electronics-and-electricals-koramangala-8th-block-bangalore-4hvn6.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.151029121331.V2D2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Sri Manjunatha Electronics And Electricals">Sri Manjunatha Electronics And Electricals </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">67 Ratings</a> 
       <span class="address">3rd Main Road, Koramangala 8th Block</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161121131539.B7K1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny1" value="Imani Groups"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161121131539.B7K1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content2.jdmagicbox.com/comp/bangalore/k1/080pxx80.xx80.161121131539.b7k1/catalogue/imani-groups-bangalore-9wp0i.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161121131539.B7K1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Imani Groups">Imani Groups </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms5"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">2 Ratings</a> 
       <span class="address">Kausar Nagar, R T Nagar</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.150611083224.J1P8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny2" value="Channabasava Electricals"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.150611083224.J1P8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content4.jdmagicbox.com/def_content/electricians/default-electricians-2.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.150611083224.J1P8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Channabasava Electricals">Channabasava Electricals </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms8"></span><span class="ms0"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">2 Ratings</a> 
       <span class="address">Nanjundayya Layout, Begur Road</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805144845.G3I1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny3" value="Asset Constructions"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805144845.G3I1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content1.jdmagicbox.com/bangalore/i1/080pxx80.xx80.160805144845.g3i1/catalogue/asset-constructions-rajajinagar-3rd-block-bangalore-tl2ec.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805144845.G3I1&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Asset Constructions">Asset Constructions </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms7"></span><span class="ms0"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">5 Ratings</a> 
       <span class="address">Rajajinagarar 12th Cross, Rajajinagar 3rd Block</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805114950.F5R3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny4" value="Essar Electricals"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805114950.F5R3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content2.jdmagicbox.com/def_content/electricians/default-electricians-10.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160805114950.F5R3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Essar Electricals">Essar Electricals </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms5"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">2 Ratings</a> 
       <span class="address">6th Cross, Badrappa Layout</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160906180004.K1E6&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny5" value="Brixly"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160906180004.K1E6&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content2.jdmagicbox.com/comp/bangalore/e6/080pxx80.xx80.160906180004.k1e6/catalogue/uno-technologies-pvt-ltd-indiranagar-bangalore-akph3.png" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160906180004.K1E6&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Brixly">Brixly </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms8"></span></a>
       <span class="sep">|</span>
       <a class="stars">21 Ratings</a> 
       <span class="address">7th Main, Indiranagar</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110125125639.T8G7&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny6" value="SA Electricals"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110125125639.T8G7&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content4.jdmagicbox.com/comp/bangalore/g7/080pxx80.xx80.110125125639.t8g7/catalogue/sa-electricals-neelasandra-bangalore-3ed00.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110125125639.T8G7&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="SA Electricals">SA Electricals </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms5"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">41 Ratings</a> 
       <span class="address">Ummer Farooq Masjid Road, Neelasandra</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110202141111.D1X3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny7" value="Vijaya Veeresh Electricals"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110202141111.D1X3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content2.jdmagicbox.com/comp/bangalore/x3/080pxx80.xx80.110202141111.d1x3/catalogue/vijaya-veeresh-electricals-chamarajpet-bangalore-17ogi.jpeg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.110202141111.D1X3&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Vijaya Veeresh Electricals">Vijaya Veeresh Electricals </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms8"></span><span class="ms0"></span></a>
       <span class="sep">|</span>
       <a class="stars">3 Ratings</a> 
       <span class="address">5th cross, Chamarajpet</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160919182701.R3X8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny8" value="Sri Tirumala Electrical"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160919182701.R3X8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content3.jdmagicbox.com/comp/bangalore/x8/080pxx80.xx80.160919182701.r3x8/catalogue/sri-tirumala-electrical-bangalore-sp2sz.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.160919182701.R3X8&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Sri Tirumala Electrical">Sri Tirumala Electrical </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms5"></span></a>
       <span class="sep">|</span>
       <a class="stars">1 Rating</a> 
       <span class="address">Manipal Hospital Road, Rajarajeshwari Nagar</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
    <div class="reslt" onclick="detail('search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161129103858.H9L2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=',event);"> 
     <div class="sa nrsl cmpny9" value="Vani Civil Contractors"> 
      <div class="rslimg"> 
       <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161129103858.H9L2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=&amp;tab=photo#photo"> <img src="http://content4.jdmagicbox.com/comp/bangalore/l2/080pxx80.xx80.161129103858.h9l2/catalogue/vani-civil-contractors-thindlu-bangalore-uk38g.jpg" width="60px" height="60px"> </a> 
      </div> 
      <div class="result"> 
       <span class="title"> <span class="jdLike"></span> <a href="search.php?what=Electricians&amp;stype=detail&amp;city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;docid=080PXX80.XX80.161129103858.H9L2&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;nearme=&amp;nearme_auto=&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;page=&amp;previous_page=search&amp;previous_stype=category&amp;action=&amp;adv_company=&amp;adv_person=&amp;adv_phone=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;shpcatid=&amp;enid=" class="comp_name_text" value="Vani Civil Contractors">Vani Civil Contractors </a> </span> 
       <a class="stars"><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span><span class="ms10"></span></a>
       <span class="sep">|</span>
       <a class="stars">4 Ratings</a> 
       <span class="address">GKVK MAIN ROAD, Thindlu</span> 
       <span class="lstAlso"> Electricians </span> 
      </div> 
      <div class="result_right"> 
       <!--<span class="vertlnk"><a class="grnbtn" href="#">Order Online</a></span>--> 
       <span class="vertlnk"></span> 
       <span class="dstn"></span> 
      </div> 
      <div class="rsltsec"> 
       <div class="links"> 
       </div> 
      </div> 
     </div> 
    </div> 
   </div> 
   <div class="pager"> 
    <a class="dla" id="pprev"></a> 
    <a class="num" id="pcur">1</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="search.php?page=2&amp;what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;nearme=&amp;nearme_auto=&amp;sp_area=&amp;lat=0&amp;long=0&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;price_sort=">2</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="search.php?page=3&amp;what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;nearme=&amp;nearme_auto=&amp;sp_area=&amp;lat=0&amp;long=0&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;price_sort=">3</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="search.php?page=4&amp;what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;nearme=&amp;nearme_auto=&amp;sp_area=&amp;lat=0&amp;long=0&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;price_sort=">4</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="search.php?page=5&amp;what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;nearme=&amp;nearme_auto=&amp;sp_area=&amp;lat=0&amp;long=0&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;price_sort=">5</a> 
    <a class="ora" id="pnext" href="search.php?page=2&amp;what=Electricians&amp;stype=category&amp;city=Bangalore&amp;area=&amp;nearme=&amp;nearme_auto=&amp;sp_area=&amp;lat=0&amp;long=0&amp;catid=10184166&amp;rnd1=0.59364&amp;rnd2=0.78649&amp;rnd3=0.81281&amp;subcat=N&amp;sortby=topresult&amp;vertical=&amp;intercity=&amp;aflg=&amp;pincodebd=999999&amp;suffix=&amp;asflg=&amp;enflg=&amp;enid=&amp;price_sort="></a> 
   </div> 
   <script language="JavaScript">function touch(){document.cookie ="oldwap=; expires=1496055639; path=/;domain=.justdial.com";window.location ="http://t.justdial.com";}</script> 
   <div class="lfoot"> 
    <div> 
     <p class="ftfr"> <a class="first_child" href="log_in.php"><img src="https://akam.cdn.jdmagicbox.com/images/newwap/Friends-Rating.png" alt="Rating"> <br>Friends Rating</a> <a href="testimonial.php?city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;nr_stop=1"><img src="https://akam.cdn.jdmagicbox.com/images/newwap/Testimonial.png" alt="Rating"> <br>Testimonial</a> <a href="log_in.php?module=fav"><img src="https://akam.cdn.jdmagicbox.com/images/newwap/Favorites.png" alt="Rating"> <br>Favorites</a> 
      <!--<a class='last_child' href='http://www.justdial.com/contest/redirect.php?cref=waplite'><img src='https://akam.cdn.jdmagicbox.com/images/newwap/Rate-&-Win-iPad.png' alt='Rating' /> <br/>Rate & Win iPad</a>--> <a class="last_child" href="log_in.php?vndr=1"><img src="tools/img/Login.png" alt="Rating"> <br>Login &amp; More</a> </p> 
     <p> <a class="bgwhit" href="free_listing.php?city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;nr_stop=1">Free Listing</a> <a class="syv" href="feedback.php?city=Bangalore">Share your views about <img src="https://akam.cdn.jdmagicbox.com/images/newwap/jd_footer.png" alt="Justdial" title="Justdial"></a> </p> 
     <p> <a href="http://us.justdial.com/us_wap/">JustDial US</a> | <a href="javascript:;" onclick="touch();">JD Touch</a> </p> 
     <p><a href="terms.php?city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;nr_stop=1&amp;pincodebd=999999&amp;suffix=">Terms of Use</a> | <a href="privacy.php?city=Bangalore&amp;area=&amp;lat=0&amp;long=0&amp;nr_stop=1&amp;pincodebd=999999&amp;suffix=">Privacy Policy</a> </p> 
     <p class="font11">Copyrights 2008-17. Just Dial Ltd All Rights Reserved</p> 
    </div>
    <img src="include/ga.php?utmac=MO-1220997-11&amp;utmn=306124783&amp;utmr=-&amp;utmp=%2Fsearch.php%3Fwhat%3DElectricians%26amp%3Bcity%3DBangalore%26amp%3Barea%3D%26amp%3Bstype%3Dwhat_where%26amp%3Bcatid%3D10184166%26amp%3Bsubcat%3DN%26amp%3Bm%3D1&amp;guid=ON">
   </div>
  </div> 
  <script type="text/javascript">
if(window.blackberry)
{
	if(document.getElementById('what'))
	{
		document.getElementById('what').onfocus = function () { showarea();toggle_valf('what','search for anything, anywhere',''); };
	}

	if(document.getElementById('area'))
	{
		document.getElementById('area').onfocus = function () { cval('lat');cval('long');toggle_valf('area','Where? e.g. Malleswaram','');atComCat(this.id,'sersuggArea','history'); };
	}
}
</script> 
  <script src="tools/js/gears_init.js" type="text/javascript" charset="utf-8"></script> 
  <script src="tools/js/geo-min.js" type="text/javascript" charset="utf-8"></script> 
  <script src="tools/js/auto.js?v=12.69" type="text/javascript" charset="utf-8"></script> 
  <script src="tools/js/overlay.js" type="text/javascript" charset="utf-8"></script>   
 </body>
</html>
