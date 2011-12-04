// JavaScript Document
var PathMenuObj = function(classname,options){
	
	if(!options.PathPosition)
	//位置,长宽
		var PathPosition = {position:'fixed',right:100,top:100,width:104,height:104};
	else PathPosition = options.PathPosition;
	
	if(!options.Path)
	//方向 右上，右下，左下，左上
		var Path = 3;
	else Path = options.Path;
	
	if(!options.Radius)
	//半径
		var Radius = 300;
	else Radius = options.Radius;
	
	if(!options.OutSpeed )
	//弹出初始速度
		var OutSpeed = 80;
	else OutSpeed = options.OutSpeed;
	
	if(!options.OutIncr)
	//弹出递增速度
		var OutIncr = 80;
	else OutIncr= options.OutIncr;
	
	if(!options.InSpeed )
	//收回初始速度
		var InSpeed = 480;
	else InSpeed = options.InSpeed;
	
	if(!options.InIncr )
	//收回递增速度
		var InIncr = -80;
	else InIncr = options.InIncr;
	
	if(!options.Offset)
	//回弹偏移像素
		var Offset = 20;
	else Offset = options.Offset;
	
	if(!options.OffsetSpeed)
	//回弹速度
		var OffsetSpeed = 100;
	else OffsetSpeed = options.OffsetSpeed;
	
	if(!options.ICount)
	//子按钮个数
		var ICount = 5;
	else ICount = options.ICount;
	
	if(!options.Button)
	//按钮默认格式，格式：{'bg':'(option)','css':'(option)','cover':'(option)'};
		var Button = {'bg':'./Path/bg-item-2x.png','css':{width:104,height:104},'cover':'./Path/star-2x.png'};	
	else Button = options.Button;
	
	if(!options.mainButton)
	//主按钮数据，格式参考上面
		var mainButton = [
			//正常时
			{'bg':'./Path/bg-2x.png','css':'','cover':'./Path/icon-2x.png'},
			//弹出时
			{'bg':'','css':'','cover':'','angle':-135,'speed':200},
		];
	else mainButton = options.mainButton;
	
	if(!options.itemButtons)
	//子按钮数据，格式参考上面
		var itemButtons = [
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_home.png','href':'http://www.google.com'},
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_thought.png','href':'http://www.google.com/reader'},
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_person.png','href':'http://www.google.com/mail'},
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_awake.png','href':'http://www.google.com/images'},
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_place.png','href':'http://www.google.com/news'},
			{'bg':'','css':'','cover':'./Path/Icon/moment_icn_music.png','href':'http://www.google.com/music'}
			//......
		];	
	else itemButtons = options.itemButtons;
	
	
	//生成按钮<a class="PathMain"><span></span></a>		<a class="PathItem"><span></span></a>
	var str='<a class="PathMain"><span></span></a>';
	for(i=0;i<ICount;i++){
		str	+= '<a class="PathItem"><span></span></a>';
	}
	var PathMenu = $(str);
	var PathStatus = 0;
		
	PathMenu.each(function(ID){
		//alert(i);
		//赋予默认数据
		if(Button['bg']!='') $(this).css('background-image',"url("+Button['bg']+")")
		if(Button['css']!='')  $(this).css(Button['css']);
		if(Button['cover']!='') $(this).children().css('background-image','url('+Button['cover']+')');
		
		//主按钮
		if($(this).hasClass('PathMain')){
			if(mainButton[0]['bg']!='') $(this).css('background-image','url('+mainButton[0]['bg']+')')
			if(mainButton[0]['css']!='') $(this).css(mainButton[0]['css']);
			if(mainButton[0]['cover']!='') $(this).children().css('background-image','url('+mainButton[0]['cover']+')');	
			$(this).click(function(){PathRun(PathMenu)});		
		}
		//子按钮
		else if ($(this).hasClass('PathItem')){
			var ItemID = $(PathMenu).filter('.PathItem').index($(this));
			if(itemButtons[ItemID]['bg']!='') $(this).css('background-image','url('+itemButtons[ItemID]['bg']+')');
			if(itemButtons[ItemID]['css']!='') $(this).css(itemButtons[ItemID]['css']);
			if(itemButtons[ItemID]['cover']!='') $(this).children().css('background-image','url('+itemButtons[ItemID]['cover']+')');	
			if(itemButtons[ItemID]['href']!='') $(this).attr({'href':itemButtons[ItemID]['href'],'target':'_blank'});
		}
	});
	
	
	
	//整理数据
	var angle = Math.PI/((ICount-1)*2);	
		
	function PathRun(PathMenu){
		var PathItems = PathMenu.filter('.PathItem').slice(0,ICount);
		if(PathStatus == 0){
			//var PathItems = PathMenu.filter('.PathItem');
			var Count = PathItems.size();
			PathItems.each(function(SP){
				var ID = $(this).index(); //由1开始
				if (ID == 1) {
					var X = Radius;
					var Y = 0; 
					var X1 = X + Offset;
					var Y1 = Y;
				
				}
				else if (ID == Count){
					var X = 0;
					var Y = Radius;
					var X1 = X;
					var Y1 = Y + Offset;				
					
				}
				else {
					var X = Math.cos(angle * (ID - 1)) * Radius;
					var Y = Math.sin(angle * (ID - 1)) * Radius;
					var X1 = X + Offset;
					var Y1 = Y + Offset;
				}
				
				if(Path==2){Y=-Y;Y1=-Y1}
				else if(Path==3){X=-X;Y=-Y;X1=-X1;Y1=-Y1}
				else if(Path==4){X=-X;X1=-X1}				
	
				$(this).animate({left:X1,bottom:Y1},OutSpeed+SP*OutIncr,function(){
						$(this).animate({left:X,bottom:Y},OffsetSpeed);
				});	
				
				if(mainButton[1]['angle']){
					PathMenu.filter('.PathMain').children().rotate({
						duration:mainButton[1]['speed'],
						//angle: mainButton[1]['angle'], 
						animateTo:mainButton[1]['angle']
					});
				}
			
			});
			PathStatus = 1;
		}
		else if(PathStatus == 1){
			PathItems.each(function(SP){
				if(parseInt($(this).css('left'))==0) {X1 = 0;}
				else {
					if(Path <=2)
						X1 = parseInt($(this).css('left')) + Offset;
					else if(Path >=3)
						X1 = parseInt($(this).css('left')) - Offset;
				}
				
				if(parseInt($(this).css('bottom'))==0) {Y1 = 0}
				else {
					if(Path==3 || Path==2)
						Y1 = parseInt($(this).css('bottom')) - Offset;
					else if(Path ==1 || Path == 4)
						Y1 = parseInt($(this).css('bottom')) + Offset;					
				}

				$(this).animate({left:X1,bottom:Y1},OffsetSpeed,function(){
					$(this).animate({left:0,bottom:0},InSpeed+SP*InIncr);
					
				});
				
				if(mainButton[1]['angle']){
					PathMenu.filter('.PathMain').children().rotate({
						duration:mainButton[1]['speed'],
						//angle: mainButton[1]['angle'], 
						animateTo:0
					});
				}
			});
			
			PathStatus = 0;
		}
		
	}
	
	var PathMenuA = $('<div class="PathMenu '+classname+'"><div class="PathInner"></div></div>');
	PathMenuA.filter('.PathMenu').css(PathPosition);
	PathMenuA.children().css({'width':PathPosition['width'],'height':PathPosition['height']});
	PathMenu.appendTo(PathMenuA.children());	
	PathMenuA.appendTo($('body'));
	
}
