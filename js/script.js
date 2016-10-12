window.onload = function(){
	waterfull('main','box');
	var dataInt={'data':[{"src":'023.jpg'},{"src":'024.jpg'},{"src":'025.jpg'},{"src":'026.jpg'}]}
	window.onscroll=function () {
		if (checkScrollSlide) {
          //将数据块渲染到页面的尾部
          var oParent=document.getElementById('main');
          for (var i = 0; i < dataInt.data.length; i++) {
          	var oBox=document.createElement('div');
          	oBox.className='box';
          	oParent.appendChild(oBox);
          	var oPic=document.createElement('div');
          	oPic.className='pic';
          	oBox.appendChild(oPic);
          	var oImg=document.createElement('img');
          	oImg.src="images/"+dataInt.data[i].src;
          	oPic.appendChild(oImg);
          	waterfull('main','box');
          }
		}
	}
}

function waterfull(parent,box) {
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	var oboxW=oBoxs[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/oboxW);
    oParent.style.cssText='width:'+num*oboxW+'px;margin:0 auto';
    var hArr=[];
    for (var i = 0; i < oBoxs.length; i++) {
    	if (i<num) {
    		hArr.push(oBoxs[i].offsetHeight);
    	}else{
    		var minH=Math.min.apply(null,hArr);
    		var index=getMinhIndex(hArr,minH);
    		oBoxs[i].style.position='absolute';
    		oBoxs[i].style.top=minH+'px';
    		oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
    		hArr[index]+=oBoxs[i].offsetHeight;
    	}
    }
}
//取类名
function getByClass(parent,cls) {
	var oElements = parent.getElementsByTagName('*');
	var boxArr=[];
	for (var i = 0; i<oElements.length;i++) {
		if (oElements[i].className==cls) {
			boxArr.push(oElements[i]);
		} 
	}
	return boxArr;
}
//取数组的索引
function getMinhIndex(hArr,minH) {
	for(i in hArr){
		if (hArr[i]==minH) {
			return i;
		}
	}
}
//检测是否具备了滚条加载数据块的条件
function checkScrollSlide() {
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	var height=document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}