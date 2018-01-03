// 获取距离顶点的top值
function getPosTop(offset,i){
	return offset + 100*i;
}

// 获取距离左边的left值
function getPosLeft(offset,j){
	return offset + 100*j;
}

// 通过gridData获取bgcolor
function getBgColor(num){
	switch(num){
		case 2: return "#eee4da";
			break;
		case 4: return "#ede0c8";
			break;
		case 8: return "#f2b179";
			break;
		case 16: return "#f59563";
			break;
		case 32: return "#f67c5f";
			break;
		case 64: return "#f65e3b";
			break;
		case 128: return "#edcf72";
			break;
		case 256: return "#edcc61";
			break;
		case 512: return "#9c0";
			break;
		case 1024: return "#33b5e5";
			break;
		case 2048: return "#09c";
			break;
		case 4096: return "#a6c";
			break;
        case 8192: return "#93c";
        	break;
	};
	return '#000';
}

// 通过gridData获取数字color
function getNumberColor(num){
	if(num <= 4){
		return '#776e65';
	}
	return '#fff';
}

// 判断是否可以左移
function canMoveLeft(gridData,len){
	for(var i = 0; i < len; i++){
		for(var j = 1; j < len; j++){
			if(gridData[i][j] != 0){
				if(gridData[i][j-1] == 0 || gridData[i][j-1] == gridData[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以右移
function canMoveRight(gridData,len){
	for(var i = 0; i < len; i++){
		for(var j = len - 2; j >= 0; j--){
			if(gridData[i][j] != 0){
				if(gridData[i][j+1] == 0 || gridData[i][j+1] == gridData[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以上移
function canMoveUp(gridData,len){
	for(var j = 0; j < len; j++){
		for(var i = 1; i < len; i++){
			if(gridData[i][j] != 0){
				if(gridData[i-1][j] == 0 || gridData[i-1][j] == gridData[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

// 判断是否可以下移
function canMoveDown(gridData,len){
	for(var j = 0; j < len; j++){
		for(var i = len - 2; i >= 0; i--){
			if(gridData[i][j] != 0){
				if(gridData[i+1][j] == 0 || gridData[i+1][j] == gridData[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

// 判断row是否有阻塞块
function noBlockHori(i,k,j,gridData){
	for(var col = k+1; col < j; col++){
		if(gridData[i][col] != 0){
			return false;
		}
	}
	return true;
}

// 判断col是否有阻塞块
function noBlockVer(j,k,i,gridData){
	for(var row = k+1; row < i; row++){
		if(gridData[row][j] != 0){
			return false;
		}
	}
	return true;
}

// 判断是否能移动
function nomove(gridData,len){
	if(canMoveLeft(gridData,len) || canMoveRight(gridData,len) ||
		canMoveUp(gridData,len) || canMoveDown(gridData,len)){
		return false;
	}
	return true;
}

// 更新分数
function updateScore(score){
	var $score = $('.score');
	$score.text(score);
}