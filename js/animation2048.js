// 渲染数字动画
function showNumberAnimation(i,j,num){
	var numberCell = $('.number_'+i+'_'+j);

	numberCell
	.css({'background-color': getBgColor(num)})
	.css({color: getNumberColor(num)})
	.text(num)
	.animate({
		width: '80px',
		height: '80px',
		top: (getPosTop(20,i)),
		left: (getPosLeft(20,j))
	},50);
}

// 数字移动动画
function moveAnimation(fromx,fromy,tox,toy){
	var numberCell = $('.number_'+fromx+'_'+fromy);
	numberCell.animate({
		top: getPosTop(20,tox)+'px',
		left: getPosLeft(20,toy)+'px'
	},200);
}