(function($){
 $.fn.galleryType1=function(o){ 
        
        var getObject = {
            nextBtn:$('.nextBtn'),
            prevBtn:$('.prevBtn')
            //getObject.currRate
           }
        $.extend(getObject, o);
        
		var _this = $(this),
			thumbHolder = $(" ._trumb",_this),
			thumbLength = $("._trumb > li",_this).length,
			thumbItems = $("._trumb > li",_this),
			thumbArr = [],
			thumbW = $("._trumb > li",_this).eq(0).width(),
			thumbH = $("._trumb > li",_this).eq(0).height(),
			animateState = false,
			isLoaded = true,
            mouseXPos,
            ParamsTweenX,
            _pageX;
            
        var MSIE = ($.browser.msie) && ($.browser.version <= 8)
            curIndex = 0,
            tmpIndex = 0;
/////////////////////////////INIT///////////////////////////////////
		init();
		function init(){
			$("> ._trumb > li", _this).each(function(_index){
			     thumbArr.push($(this));
			})
            
            $("._trumb > li", _this).eq(0).addClass('_active');
            
			addButonsEventHandler();
		}//end init
//////////////////////////addButonsEventHandler/////////////////////////////////////
		function addButonsEventHandler(){
///////////////////////////////////////
            $('._trumb > li', _this).click(
                function(){
                    if(isLoaded){
                            
                        if($(this).index() !== curIndex){
                            
                            $("._trumb > li", _this).eq(curIndex).removeClass('_active');
                            curIndex = $(this).index();
                            tmpIndex=curIndex;
                            $("._trumb > li", _this).eq(curIndex).addClass('_active');
                            
                            var prevUrl = $(this).find('a').attr('href');
                                $('._preview > img', _this).fadeTo(300, 0, function(){
                                    $('._preview > img', _this).attr('src', "").attr('src', prevUrl);
                                    isLoaded = false;
                                        $('._preview > img', _this).bind('load', function(){
                                            $(this).unbind('load');
                                            $(this).fadeTo(300, 1);
                                            isLoaded = true;
                                        });
                                })
                        }else{
                                $('._preview > img', _this).fadeTo(300, 1);
                        }
                    }
                    
                    return false;
                }
            )  
            ///////////////////////////////////
            $('.thumbHolder', _this).mousemove(
                function(event){
                    var _offSet = $(this).offset();
                    _pageX = event.pageX - _offSet.left;
                    mouseXPos = _pageX / $(this).width();
                    
                    if( mouseXPos <= 0 ){ mouseXPos_correction = 0;}
                    if( mouseXPos >= 1 ){ mouseXPos_correction = 1;}
                    if( mouseXPos > 0 && mouseXPos < 1 ){ mouseXPos_correction = mouseXPos;}
                    ParamsTweenX = -mouseXPos_correction *($('._trumb', _this).width() - $(this).width());
                     $('._trumb', _this).stop(true).animate({left:ParamsTweenX}, 800);  
                }
           )
            
            getObject.prevBtn.click(
                function(){
                    if(isLoaded){
                        if(tmpIndex>0){
                            tmpIndex--;
                            $("._trumb > li", _this).eq(tmpIndex).click();
                        }else{
                            tmpIndex=thumbLength-1;
                            $("._trumb > li", _this).eq(tmpIndex).click();
                        }
                    }
                }
            )
            getObject.nextBtn.click(
                function(){
                    if(isLoaded){
                        if(tmpIndex<thumbLength-1){
                            tmpIndex++;
                            $("._trumb > li", _this).eq(tmpIndex).click();
                        }else{
                            tmpIndex=0;
                            $("._trumb > li", _this).eq(tmpIndex).click();
                        }
                    }
                }
            )
		}//end addEvent

////////////////////////////////////////////////////////////////////////////////////////////              
	}
})(jQuery)