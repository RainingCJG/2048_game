var len = 4; //4x4表格
var gridData = new Array(); //存储表格数据
var hasAdd = new Array(); //已经加过了，防止一次移动多次相加
var nospace = false; //是否有空间生成数字
var score = 0; //开始分数

$(function(){
	// 开始游戏
	newgame();
});

function newgame(){
	// 初始化2048表格
	init();
	// 渲染数据
	render();
};

function init(){
	// 初始化分数
	score = 0;
	updateScore(score);

	// 刚开始有空间
	nospace = false; //是否有空间生成数字

	// 获取表格外层容器
	var gird_container = document.getElementById('grid2048');

	// html模板
	var template = '';

	// 计算小格子margin
	var offset = (gird_container.clientWidth - 80*len) / 5;

	// 渲染16个小格子
	for(var i = 0; i < len ; i++){
		for(var j = 0; j < len; j++){
			template += '<li class="grid_'+i+'_'+j+'" style="left:'+getPosLeft(offset,j)+'px;top:'+getPosTop(offset,i)+'px;"></li>';
		}
	}

	gird_container.innerHTML = template;

	// 初始化表格数据
	for(i = 0; i < len ; i++){
		gridData[i] = new Array();
		hasAdd[i] = new Array();
		for(j = 0; j < len; j++){
			gridData[i][j] = 0;
			hasAdd[i][j] = false; //未相加过
		}
	}

	// 将数据显示
	updateData(offset);
};

function updateData(offset){
	// 将旧数据删除
	$('.number_cell').remove();

	// 生成新的数据
	for(var i = 0; i < len ; i++){
		for(var j = 0; j < len; j++){
			$('#grid2048').append('<li class="number_cell number_'+i+'_'+j+'"></li>');
			var $number_cell = $('.number_'+i+'_'+j);
			if(gridData[i][j] == 0){
				$number_cell
				.css({width: 0,height: 0})
				.css({left: getPosLeft(offset,j) + 40,top: getPosTop(offset,i) + 40});
			}else{
				$number_cell
				.css({left: getPosLeft(offset,j),top: getPosTop(offset,i)})
				.css({'background-color': getBgColor(gridData[i][j])})
				.css({color: getNumberColor(gridData[i][j])})
				.text(gridData[i][j]);
			}
			hasAdd[i][j] = false;
		}
	}
};

function render(){
	// 随机生成2个数字
	for(var i = 0; i < 2; i++){
		// 随机生成1个数字
		generateOneNumber();
	}
}

function generateOneNumber(){
	// num存放0-15个位置信息
	var map = new Array();
	var i = 0,j = 0;

	for(var k = 0; k < 16; k++){
		map[k] = {
			'row': i,
			'col': j++
		}

		if((k + 1) % 4 == 0){
			j = 0;
			i++;
		}
	}
	
	while(true){
		// 随机一个0-15数字,通过num映射到对应位置上
		var mapIndex = Math.floor(Math.random()*map.length);
		
		var row = map[mapIndex].row;
		var col = map[mapIndex].col;
		
		if(gridData[row][col] == 0){
			// 随机生成2或者4
			var num = Math.random() < 0.5 ? 2 : 4;
			gridData[row][col] = num;
			showNumberAnimation(row,col,num);
			break;
		}
		map.splice(mapIndex,1);
		if(map.length <= 0){
			break;
		}
	}
}

// 键盘事件
$(document).keydown(function(e){
	switch(e.keyCode){
		case 37: //left
			if(moveLeft()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		    break;
		case 38: //up
			if(moveUp()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		    break;
		case 39: //right
			if(moveRight()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		    break;
		case 40: //down
			if(moveDown()){
				setTimeout(generateOneNumber,210);
				setTimeout(isgameover,300);
			};
		    break;
		default: break;
	};
});

// 游戏结束
function isgameover(){
	for(var i = 0; i < len; i++){
		for(var j = 0; j < len; j++){
			if(gridData[i][j] == 0){
				nospace = false;
				return;
			}
		}
	}
	nospace = true;
	if(nospace && nomove(gridData,len)){
		alert('gameover!');
	} 
}

// 左移
function moveLeft(){
	// 是否可以左移
	if(!canMoveLeft(gridData,len)){
		return false;
	}

	//左移 
	for(var i = 0; i < len; i++){
		for(var j = 1; j < len; j++){
			if(gridData[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(gridData[i][k] == 0 && noBlockHori(i,k,j,gridData)){
						moveAnimation(i,j,i,k);
						gridData[i][k] = gridData[i][j];
						gridData[i][j] = 0;
					}else if(gridData[i][k] == gridData[i][j] && noBlockHori(i,k,j,gridData) && !hasAdd[i][k]){
						moveAnimation(i,j,i,k);
						gridData[i][k] += gridData[i][j];
						gridData[i][j] = 0;
						hasAdd[i][k] = true;

						// 分数计算
						score += gridData[i][k];
						updateScore(score);
 					}
				}
			}
		}
	}
	// 更新视图
	setTimeout('updateData(20)',200);
	return true;
}
// 右移
function moveRight(){
	// 是否可以右移
	if(!canMoveRight(gridData,len)){
		return false;
	}

	//右移 
	for(var i = 0; i < len; i++){
		for(var j = len - 2; j >= 0; j--){
			if(gridData[i][j] != 0){
				for(var k = len - 1; k > j; k--){
					if(gridData[i][k] == 0 && noBlockHori(i,j,k,gridData)){
						moveAnimation(i,j,i,k);
						gridData[i][k] = gridData[i][j];
						gridData[i][j] = 0;
					}else if(gridData[i][k] == gridData[i][j] && noBlockHori(i,j,k,gridData) && !hasAdd[i][k]){
						moveAnimation(i,j,i,k);
						gridData[i][k] += gridData[i][j];
						gridData[i][j] = 0;
						hasAdd[i][k] = true;

						// 分数计算
						score += gridData[i][k];
						updateScore(score);
 					}
				}
			}
		}
	}
	// 更新视图
	setTimeout('updateData(20)',200);
	return true;
}
// 上移
function moveUp(){
	// 是否可以上移
	if(!canMoveUp(gridData,len)){
		return false;
	}

	//上移 
	for(var j = 0; j < len; j++){
		for(var i = 1; i < len; i++){
			if(gridData[i][j] != 0){
				for(var k = 0; k < i; k++){
					if(gridData[k][j] == 0 && noBlockVer(j,k,i,gridData)){
						moveAnimation(i,j,k,j);
						gridData[k][j] = gridData[i][j];
						gridData[i][j] = 0;
					}else if(gridData[k][j] == gridData[i][j] && noBlockVer(j,k,i,gridData) && !hasAdd[k][j]){
						moveAnimation(i,j,k,j);
						gridData[k][j] += gridData[i][j];
						gridData[i][j] = 0;
						hasAdd[k][j] = true;

						// 分数计算
						score += gridData[k][j];
						updateScore(score);
 					}
				}
			}
		}
	}
	// 更新视图
	setTimeout('updateData(20)',200);
	return true;
}
// 下移
function moveDown(){
	// 是否可以下移
	if(!canMoveDown(gridData,len)){
		return false;
	}

	//下移 
	for(var j = 0; j < len; j++){
		for(var i = len - 2; i >= 0; i--){
			if(gridData[i][j] != 0){
				for(var k = len - 1; k > i; k--){
					if(gridData[k][j] == 0 && noBlockVer(j,i,k,gridData)){
						moveAnimation(i,j,k,j);
						gridData[k][j] = gridData[i][j];
						gridData[i][j] = 0;
					}else if(gridData[k][j] == gridData[i][j] && noBlockVer(j,i,k,gridData) && !hasAdd[k][j]){
						moveAnimation(i,j,k,j);
						gridData[k][j] += gridData[i][j];
						gridData[i][j] = 0;
						hasAdd[k][j] = true;

						// 分数计算
						score += gridData[k][j];
						updateScore(score);
 					}
				}
			}
		}
	}
	// 更新视图
	setTimeout('updateData(20)',200);
	return true;
}